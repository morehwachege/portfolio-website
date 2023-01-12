import React from "react";
import Me from "../../assets/hero-images/profile_image.png";

function LeftHero() {
  return (
    <div class="col-12 col-md-6 hero-left col-lg-6 d-flex justify-content-start align-items-start flex-column">
      {/* <h1 className='text-black'>Amazing</h1> */}
      <div className="mb-auto d-flex justify-content-center align-items-center w-100" style={{ color: "black", height: "100vh" }}>
        <div className="d-flex flex-column px-3">
          <h2> Hi there👋, <br />
            I'm{" "}
            <span style={{ color: "#6c12a7", fontWeight: 800 }}>
              Antony Gakuru
            </span>
          </h2>
          <h3 className="pt-3">Full-Stack Certified Nerd</h3>
          <div>
            <p>
              I love creating 🕸 and webbing people-facing products & services a Software Engineer and
              this &#128073; <br />{" "}
            </p>
            <p>is my portfolio</p>
          </div>
        </div>
      </div>
      {/* <img src={Me} alt="My Picture" width="400" height="500" /> */}
    </div>
  );
}

export default LeftHero;
