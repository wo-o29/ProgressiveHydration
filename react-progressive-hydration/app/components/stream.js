import React, { useRef, useEffect } from 'react';
import DATA from '../../data.json';


export default function Stream() {
	const items = DATA.map(user => ({
		id: user.login.uuid,
		username: user.login.username,
		name: user.name.first + ' ' + user.name.last,
		avatar: user.picture.medium
	}));

	return (
		<div className="stream">
			{items.map(profile =>
				<Profile profile={profile} />
			)}
		</div>
	);
}


function Profile({ profile }) {
	const base = useRef();
	useEffect(() => {
		flash(base.current);
	}, []);

	return (
		<div className="list-group-item" ref={base}>
			<div className="avatar" onClick={()=>{console.log("Clicked !!")}}>
      	<img alt="avatar" src={profile.avatar} loading="lazy" />
    	</div>
			<div className="details">
				<div className="info">
					<p className="name">{profile.name}</p>
					<p className="location">{profile.username}</p>
				</div>
			</div>
		</div>
	);
}

/** Turn an element purple and then fade out. */
function flash(element) {
	element.style.backgroundColor = '#bd7aff';
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			element.style.transition = 'background-color 2s ease';
			element.style.backgroundColor = 'transparent';
		});
	});
}
