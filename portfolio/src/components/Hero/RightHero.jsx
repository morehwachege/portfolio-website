import React from 'react'
import img1 from "../../assets/hero-images/img1.jpg";
import img2 from "../../assets/hero-images/img2.jpg";
import img3 from "../../assets/hero-images/img3.jpg";

function RightHero() {
    return (
        <div class="col-12 col-md-6 hero-right col-lg-6 d-flex justify-content-center
         align-items-center flex-wrap gap-5 overflow-auto p-0 MagicScroll bg-light p-3" data-options="mode: cover-flow; orientation: vertical; draggable: true;">
            {/* <div className="inner"></div> */}
            <img src={img1} alt="awesome" width="400px" height="400px"/>
            <img src={img2} alt="awesome" width="300px" height="300px" />
            <img src={img3} alt="awesome" width="400px" height="400px" />
        </div>
    )
}

export default RightHero