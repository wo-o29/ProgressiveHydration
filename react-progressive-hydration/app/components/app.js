import React from "react";
import { useState } from "react";
import { Hydrator as ClientHydrator, ServerHydrator } from "./hydrator";
import Intro from "./intro";
import Header from "./header";
import DATA from "../../data.json";

const items = DATA.map((user) => ({
  id: user.login.uuid,
  username: user.login.username,
  name: user.name.first + " " + user.name.last,
  avatar: user.picture.medium,
}));

export default function App() {
  const [allow, setAllow] = useState(false);

  let load = () => import("./stream");
  let Hydrator = ClientHydrator;
  if (typeof window === "undefined") {
    Hydrator = ServerHydrator;
    load = () => require("./stream");
  }

  console.log(`hydration 가능 상태: ${allow}`);
  return (
    <div id="app">
      <Header
        onClick={() => {
          setAllow(true);
        }}
      />
      <Intro />
      {items.map((profile) => (
        <Hydrator allowHydration={allow} load={load} profile={profile} />
      ))}
    </div>
  );
}
