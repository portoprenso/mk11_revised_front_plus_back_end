import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./ShowCase.scss";
import { connect } from "react-redux";
import { Row, Card } from "react-bootstrap";
import { $host, check, fetchTypes } from "../../helpers/functions";
import { useEffect } from "react";
import ProductCardApi from "../StoreBlock/StorePage/ProductCardApi";
import { useHistory } from "react-router-dom";
import ShowCaseSideBar from './../ShowCaseSideBar/ShowCaseSideBar';


const mapStateToProps = (state) => {
    return {
        showCaseData: state.productReducer.showCaseData,
        user: state.authReducer.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    getShowCaseData: async (history, datalimit) => {
        const search = new URLSearchParams(history.location.search);
        search.set("_limit", datalimit);
        history.push(`${history.location.pathname}?${search.toString()}`);
        // console.log(datalimit)
        // console.log(window.location.search)
        let {data} = await $host.get(
            `api/game/?_limit=${datalimit}&${window.location.search}`
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
    const [types, setTypes] = useState()
    const { showCaseData, getShowCaseData, user } = store
    const history = useHistory()
    // console.log(user)
    // const [ loaded, setLoaded ] = useState(false)


    useEffect(() => {
        getShowCaseData(history, 8)
        fetchTypes().then(data => setTypes(data))
        // getDecodedToken().then(data => console.log(data))
        // showCaseData ? setLoaded(true) : console.log('asd')
    }, [])

    // console.log(types)
    return (
        <div>
            <Header />
            <div className="showcase__container">
                <div className="products__container">
                    <Row className="d-flex">
                        {types && showCaseData.map((game) => (
                            <ProductCardApi game={game} types={types} user={user}/>
                        ))}
                    </Row>
                    <ShowCaseSideBar />
                </div>
                <div className="products__categories">asd</div>
            </div>
            <Footer />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCase);
