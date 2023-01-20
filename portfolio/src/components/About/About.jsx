import React from "react";
import Me from "../../assets/hero-images/profile_image.png";

function About() {
  let words =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sequi, quasi distinctio voluptas eius quibusdam nostrum atcorporis sed. Vitae!".split();
  let i = 0;
  let speed = 5000; /* The speed/duration of the effect in milliseconds */
  let show = ""
  function typeWriter() {
    if (i < words.length) {
      show += words[i];
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter()
  return (
    <div className="container d-flex justify-content-around align-items-center container-about flex-nowrap">
      <div className="about-img d-flex justify-content-center align-items-start d-none d-md-none d-lg-block ">
        <img className="frame " alt="boom" src={Me} width={300} height={370} />
      </div>
      <div className="terminal">
        <div className="top-bar px-2 py-2 d-flex justify-content-between align-items-center">
          <div className="other-icons d-flex justify-content-center align-items-center">
            <i className="bx bx-folder-plus ubuntu-terminal mx-1"></i>
            <i className="bx bx-chevron-down ubuntu-terminal mx-1"></i>
          </div>
          <p className="top-bar-inner m-0 d-none d-md-block">
            antony@gakuru:~/Documents/code/Pitch/
          </p>
          <div className="other-icons d-flex justify-content-center align-items-center">
            <i className="bx bx-search ubuntu-terminal mx-1"></i>
            <i className="bx bx-menu ubuntu-terminal mx-1"></i>
            <div className="d-flex justify-content-center align-items-center px-2">
              <h5 className="pt-2 mx-1">-</h5>
              <i className="bx bx-x cancel-circle mx-1"></i>
            </div>
          </div>
        </div>
        <div className="actual-terminal p-2">
          <p className="terminal-words">
            <span className="sudo-name">antony@gakuru</span>:
            <span style={{ color: "blue" }}>~</span>
            <span style={{ color: "#0047ab" }}>
              <b>/Documents/code/Pitch</b>
            </span>
            ${/* terminal content */}
            <span className="typewriter">&nbsp; {show}</span>
            {/* end terminal content */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
