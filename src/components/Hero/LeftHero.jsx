import React from "react";
import Me from "../../assets/hero-images/profile_image.png";
import Laptop from "../../assets/hero-images/left-laptop.png";

function LeftHero() {
  return (
    <div
      class="col-12 col-md-6 hero-left col-lg-6 d-flex justify-content-around align-items-start flex-column"
      style={{ color: "black", height: "100%" }}
    >
      <div className="laptop-div mx-auto">
        <img src={Laptop} alt="laptop" width="400" height="280" />
      </div>
      <div className="d-flex flex-column px-3 flex-wrap">
        <h2>
          {" "}
          Hi there👋, <br />
          I'm{" "}
          <span style={{ color: "#6c12a7", fontWeight: 800 }}>
            Antony Gakuru
          </span>
        </h2>
        <h3 className="pt-3">Full-Stack Certified Nerd</h3>
        <div>
          <p>
            I love creating 🕸 and webbing people-facing products & services a
            Software Engineer and this &#128073; <br />{" "}
          </p>
          <p>is my portfolio</p>
        </div>
        <div className="container">
          <hr
            style={{
              border: "3px solid #6c12a7",
              backgroundColor: "#6c12a7",
              fontWeight: "400",
            }}
          />
        </div>
        <div className="container d-flex justify-content-center align-items-center gap-3 flex-wrap socials">
          <button className="btn btn-lg outline btn-secondary">LinkedIn</button>
          <button className="btn btn-lg outline btn-secondary">Twitter</button>
          <button className="btn btn-lg outline btn-secondary">GitHub</button>
          <button className="btn btn-lg outline btn-secondary">WhatsApp</button>
        </div>
      </div>
      {/* </div> */}
      {/* <img src={Me} alt="My Picture" width="400" height="500" /> */}
    </div>
  );
}

export default LeftHero;
