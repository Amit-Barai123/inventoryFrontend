// LoadingSpinner.js
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animation.json";

const LoadingSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
  <Lottie options={defaultOptions} width={300} height={300} />
</div>
  );
};

export default LoadingSpinner;
