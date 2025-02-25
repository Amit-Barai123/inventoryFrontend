// LoadingSpinner.js
import React from "react";
import Lottie from "react-lottie";
import banneranimation from "../../assets/homeBanner.json";

const HeroAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: banneranimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
  <Lottie options={defaultOptions} width={500} height={500} />
</div>
  );
};

export default HeroAnimation;
