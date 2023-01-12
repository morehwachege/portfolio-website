import React from 'react'
import Me from '../../assets/hero-images/profile_image.png';

function LeftHero() {
  return (
    <div class="col-12 col-md-6 hero-left col-lg-6 d-flex justify-content-start align-items-end">
        <img src={Me} alt="My Picture" width="400" height="500" />
    </div>
  )
}

export default LeftHero