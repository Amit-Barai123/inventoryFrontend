// LoadingSpinner.js
import React from "react";
import Lottie from "react-lottie";
import MultiTakinganimation from "../../assets/multitasking.json";

const MultiTasking = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: MultiTakinganimation,
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

export default MultiTasking  ;
