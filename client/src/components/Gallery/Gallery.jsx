import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Gallery.css'
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import LearnMoreBlock from '../LearnMoreBlock/LearnMoreBlock';
import CompareBlock from '../CompareBlock/CompareBlock';


const Gallery = () => {
    return (
        <>
        <Header />
        <div className="gallery__container">
            <div className="gallery__subContainer">
                <h2 className="gallery__subContainer__header">ГАЛЕРЕЯ</h2>
                <div className="gallery__trailers-container">
                    <YoutubeEmbed embedId="_axnJ24JgrM" />
                    <YoutubeEmbed embedId="bRjbIuJWtlg" />
                </div>
            </div>
        </div>
        <CompareBlock/>
        <LearnMoreBlock />
        <Footer/>
        </>
    );
};

export default Gallery;