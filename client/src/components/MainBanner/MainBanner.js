import React from 'react';
import './MainBanner.css'


const MainBanner = () => {
    return (
        <div className="main-banner-container">
            <video autoPlay="autoPlay" muted="muted" loop="loop" playsInline="" className="bgVideo">
                <source src="https://cdn-prod.mortalkombat.com/ultimate/home/featured/ultimate.mp4"
                        type="video/mp4" />
            </video>
        </div>
    );
};

export default MainBanner;