import React from "react";
import Me from "../../assets/hero-images/profile_image.png";

function About() {
  return (
    <div className="container d-flex justify-content-around align-items-center container-about flex-nowrap">
      <div className="about-img d-flex justify-content-center align-items-start d-sm-none d-md-block ">
        <div className="frame" style={{backgroundImage: `url(${Me})`}}>
        </div>
      </div>
      <div className="terminal">
        <div className="top-bar px-2 py-2 d-flex justify-content-center align-items-center">
          <p className="top-bar-inner m-0">antony@gakuru:~Documents/code/Pitch/</p>
        </div>
        <div className="actual-terminal">
          Boom
        </div>
      </div>
    </div>
  );
}

export default About;
