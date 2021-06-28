import React, { useEffect, useState } from "react";
import CompareBlock from "../CompareBlock/CompareBlock";
import Header from "../Header/Header";
import LearnMoreBlock from "../LearnMoreBlock/LearnMoreBlock";
import "./RosterPage.css";
import Footer from "../Footer/Footer";
import { JSON_API } from "../../helpers/static";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    console.log(state);
    return {
        state: state,
        rosterData: state.rosterReducer.rosterData,
        fighterInfo: state.rosterReducer.fighterInfo,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getRosterData: async () => {
        let { data } = await axios(`${JSON_API}/roster`);
        dispatch({
            type: "GET_ROSTER_DATA",
            payload: data,
        });
    },
    getFighterInfo: async (id) => {
        let { data } = await axios(`${JSON_API}/roster/${id}/`);
        dispatch({
            type: "GET_FIGHTER_DATA",
            payload: data,
        });
    },
});

const RosterPage = (store) => {
    const { getRosterData, rosterData, getFighterInfo, fighterInfo } = store;
    const [clickedId, setClickedId] = useState(null);
    useEffect(() => {
        getRosterData();
    }, []);

    useEffect(() => {
        getFighterInfo(clickedId);
        console.log(fighterInfo);
    }, [clickedId]);

    async function handleChangeId(id) {
        setClickedId(id);
        await getFighterInfo(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function returnVideo(url) {
        return url ? (
            <video
                key={url}
                autoPlay="autoPlay"
                muted="muted"
                loop="loop"
                class="roster__container__video"
            >
                <source src={url} />
            </video>
        ) : (
            <></>
        );
    }

    function returnRoster() {
        return clickedId ? (
            <>
                {returnVideo(fighterInfo.video)}
                <div className="roster__container__bio">
                    <div className="bio__photo">
                        <img src={fighterInfo.bigPic}></img>
                    </div>
                    <div className="bio__meta">
                        <div className="bio__meta__name">
                            <h2 className="bio__meta__name__top">
                                {fighterInfo.name}
                            </h2>
                            {/* <img className="bio__meta__name__strap" src={YellowStrap} /> */}
                        </div>
                        <h3 className="bio__meta__name__top">
                            {fighterInfo.phrase}
                        </h3>
                        <div className="bio__meta__description bio__meta__name__top">
                            <p>{fighterInfo.description}</p>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <></>
        );
    }

    return (
        <>
            <Header />
            <div className="roster__hero">
                <div className="roster__container">
                    {returnRoster()}
                    <div className="roster__container__charactersList">
                        <div className="roster__container__charactersList__title">
                            <div>
                                {/* <img src="https://cdn-prod.mortalkombat.com/static/tiny-gray-edge.svg" alt="edge"/> */}
                            </div>
                            <span style={{ minWidth: "max-content" }}>
                                CHOOSE YOUR FIGHTER
                            </span>
                            <div>
                                {/* <img src="https://cdn-prod.mortalkombat.com/static/tiny-gray-edge.svg" alt="edge"/> */}
                            </div>
                        </div>
                        <div className="roster__container__charactersList__list">
                            {rosterData.map((person) => {
                                return (
                                    <div
                                        onClick={() =>
                                            handleChangeId(person.id)
                                        }
                                        className="roster__container__charactersList__list__card"
                                    >
                                        <img src={`${person.littlePic}`} />
                                        <div>{person.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <CompareBlock />
            <LearnMoreBlock />
            <Footer />
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RosterPage);
