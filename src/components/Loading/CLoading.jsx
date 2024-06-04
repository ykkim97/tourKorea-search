import React from "react";
import Lottie from 'react-lottie';
import LoadingAnimation from "../../assets/LoadingAnimation.json";

const CLoading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Lottie animationData={LoadingAnimation} loop autoPlay />
        </div>
    );
}

export default CLoading;