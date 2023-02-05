import React from "react";
import RightHero from "./RightHero";
import LeftHero from "./LeftHero";

function Hero() {
  function handleThis() {
    alert("clicked");
  }
  return (
    <div class="container-fluid text-white hero-container">
      <div class="row d-flex justify-content-center align-items-start">
        <LeftHero />
        <RightHero />
      </div>
    </div>
  );
}

export default Hero;
