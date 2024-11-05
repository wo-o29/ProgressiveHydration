import React, { useRef, useEffect } from "react";

export default function Profile({ profile }) {
  const base = useRef();
  useEffect(() => {
    flash(base.current);
  }, []);

  return (
    <div
      className="list-group-item"
      ref={base}
      onClick={() => {
        console.log(`name: ${profile.name}`);
      }}
    >
      <div className="avatar">
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

function flash(element) {
  element.style.backgroundColor = "#bd7aff";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.transition = "background-color 2s ease";
      element.style.backgroundColor = "transparent";
    });
  });
}
