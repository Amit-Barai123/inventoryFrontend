import React from 'react'
import Lottie from "react-lottie";
import notFound from "../../src/assets/notFound.json"

const NotfoundPage = () => {
    const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: notFound,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          };
        
          return (
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          <Lottie options={defaultOptions} width={500} height={300} />
        </div>
          );
}

export default NotfoundPage
