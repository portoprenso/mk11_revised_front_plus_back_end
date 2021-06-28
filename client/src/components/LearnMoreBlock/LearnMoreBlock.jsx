import React from "react";
import "../CompareBlock/CompareBlock.css";
import "./LearnMoreBlock.css";
import AOS from "aos";
import "aos/dist/aos.css";
import './LearnMoreBlock.css'

// import { Link } from "react-router-dom";

const LearnMoreBlock = () => {
  AOS.init();
  return (
    <div className="LearnMoreBlock-body__hero">
      <div className="LearnMoreBlock-body__wrapper">
        <div data-aos="zoom-in" className="LearnMoreBlock__card">
            <div className="LearnMoreBlock__card__inner" style={{backgroundImage: 'url(https://cdn-prod.mortalkombat.com/ultimate/discover/latest-trailers-bg-adv.jpg)'}}>
                <img className='LearnMoreBlock__cardImg' src="https://cdn-prod.mortalkombat.com/ultimate/discover/latest-trailers.png" alt="firstCardImg"/>
            </div>
                <div className="LearnMoreBlock__meta">
                  <h3>MORTAL KOMBAT 11 ULTIMATE</h3>
                </div>
        </div>
        <div data-aos="zoom-in" className="LearnMoreBlock__card">
            <div className="LearnMoreBlock__card__inner" style={{backgroundImage: 'url(https://cdn-prod.mortalkombat.com/aftermath/discover/esports-bg-adv.jpg)'}}>
                <img className='LearnMoreBlock__cardImg' src="https://cdn-prod.mortalkombat.com/aftermath/discover/esports.png" alt="firstCardImg"/>
            </div>
                <div className="LearnMoreBlock__meta">
                  <h3>БОЕВОЙ НАБОР 2</h3>
                </div>
        </div>
        <div data-aos="zoom-in" className="LearnMoreBlock__card">
        <div className="LearnMoreBlock__card__inner" style={{backgroundImage: 'url(https://cdn-prod.mortalkombat.com/aftermath/discover/mkkollective-bg-adv.jpg)'}}>
                <img className='LearnMoreBlock__cardImg' src="https://cdn-prod.mortalkombat.com/aftermath/discover/mkkollective.png" alt="firstCardImg"/>
            </div>
                <div className="LearnMoreBlock__meta">
                  <h3>MORTAL KOMBAT 11 ULTIMATE</h3>
                </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreBlock;
