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
import ShowCaseSideBar from "./../ShowCaseSideBar/ShowCaseSideBar";
import CircularProgress from '@material-ui/core/CircularProgress';


const mapStateToProps = (state) => {
  return {
    showCaseData: state.gameReducer.showCaseData,
    user: state.authReducer.user,
    dataLimit: state.gameReducer.dataLimit,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getShowCaseData: async (history, datalimit) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", datalimit);
    history.push(`${history.location.pathname}?${search.toString()}`);
    // console.log(datalimit)
    // console.log(window.location.search)
    let { data } = await $host.get(
      `api/game/?_limit=${datalimit}&${window.location.search}`
    );
    // console.log(data.rows)
    dispatch({
      type: "GET_SHOWCASE_DATA",
      payload: data.rows,
    });
  },
  changeDataLimit: async (history, dataLimit, getShowCaseData) => {
    console.log(dataLimit);
    let some = Number(dataLimit);
    some += 4;
    dispatch({
      type: "CHANGE_DATA_LIMIT",
      payload: some,
    });
    console.log(dataLimit);
    // await getShowCaseData(history, dataLimit)
  },
});

const ShowCase = (store) => {
  const [types, setTypes] = useState();
  const [fetching, setFetching] = useState(true);
  const { showCaseData, getShowCaseData, user, dataLimit, changeDataLimit } =
    store;
  const history = useHistory();
  // console.log(user)
  // const [ loaded, setLoaded ] = useState(false)

  const scrollHandler = (e) => {
    if (
      e.target &&
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        50
    ) {
      setTimeout(() => {
        setFetching(true);
      }, 500);
    }
  };

  useEffect(() => {
    console.log(fetching);
    if (fetching) {
      getShowCaseData(history, dataLimit, getShowCaseData)
        .then(() => changeDataLimit(history, dataLimit))
        .finally(setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    getShowCaseData(history, dataLimit, getShowCaseData);
    fetchTypes().then((data) => setTypes(data));
    // getDecodedToken().then(data => console.log(data))
    // showCaseData ? setLoaded(true) : console.log('asd')
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  // console.log(types)
  return (
    <div>
      <Header />
      <div className="showcase__container">
        <div className="products__container">
          <Row className="d-flex">
            {types
            ?
              showCaseData.map((game) => (
                <ProductCardApi game={game} types={types} user={user} />
              ))
              : <CircularProgress />}
          </Row>
        </div>
        <ShowCaseSideBar />
        {/* <Button className="storePage__showMoreButton" onClick={() => {changeDataLimit(history, dataLimit)}}><DoubleArrowIcon/></Button> */}
      </div>
      <div
        onScroll={() => changeDataLimit(history, dataLimit, getShowCaseData)}
      ></div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCase);
