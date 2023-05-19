import React, { useState } from 'react';
import { Hydrator as ClientHydrator, ServerHydrator } from './hydrator';
import Intro from './intro';
import Header from './header';

let load = () => import('./stream');
let Hydrator = ClientHydrator;

if (typeof window === 'undefined') {
	Hydrator = ServerHydrator;
	load = () => require('./stream');
}

export default function App() {
	const [allow,setAllow] = useState(false)
	return (
		<div id="app">
			<Header onClick={()=>{setAllow(true)}} />

			<Intro />

			{/* <Stream flush={flushing} /> */}
			<Hydrator allowHydration={allow} load={load} />
		</div>
	);
}
