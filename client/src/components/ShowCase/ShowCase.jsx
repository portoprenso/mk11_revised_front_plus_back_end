import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./ShowCase.scss";
import { connect } from "react-redux";
import { Row, Card } from "react-bootstrap";
import { $host } from "../../helpers/functions";
import { useEffect } from "react";
import ProductCardApi from "../StoreBlock/StorePage/ProductCardApi";


const mapStateToProps = (state) => {
    return {
        showCaseData: state.productReducer.showCaseData,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getShowCaseData: async () => {
        let {data} = await $host.get(
            `api/game/`
        );
        // console.log(data.rows)
        dispatch({
            type: "GET_SHOWCASE_DATA",
            payload: data.rows
        });
    },
    changeDataLimit: async (story, dataLimit) => {
        let some = dataLimit;
        some += 8;
        dispatch({
            type: "CHANGE_DATA_LIMIT",
            payload: some,
        });
        // console.log(dataLimit);
    },
});


const ShowCase = (store) => {
    const { showCaseData, getShowCaseData } = store
    // console.log(showCaseData)
    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        getShowCaseData()
        // showCaseData ? setLoaded(true) : console.log('asd')
    }, [])
        
    return (
        <div>
            <Header />
            <div className="showcase__container">
                <div className="products__container">
                    <Row className="d-flex">
                        {showCaseData.map((game) => (
                            <ProductCardApi game={game}/>
                        ))}
                    </Row>
                </div>
                <div className="products__categories">asd</div>
            </div>
            <Footer />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCase);
