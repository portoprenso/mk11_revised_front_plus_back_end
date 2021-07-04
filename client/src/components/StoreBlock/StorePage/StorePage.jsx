import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./StorePage.css";
import Header from "../../Header/Header";
import SwipeableViews from "react-swipeable-views";
import { createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import SideBar from "../../SideBar/SideBar.jsx";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { connect } from "react-redux";
import axios from "axios";
import { JSON_API } from "../../../helpers/static";
import { fetchTypes } from "../../../helpers/functions";
import ProductCardApi from "./ProductCardApi";

const theme = createMuiTheme({
  status: {
    primary: orange[500],
  },
});

// useStyles start here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const mapStateToProps = (state) => {
  return {
    gamesData: state.gameReducer.gamesData,
    gameDetails: state.gameReducer.gameDetails,
    rosterData: state.rosterReducer.rosterData,
    paginationPages: state.gameReducer.paginationPages,
    cart: state.gameReducer.cart,
    dataLimit: state.gameReducer.dataLimit,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductsData: async (history, dataLimit) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", dataLimit);
    history.push(`${history.location.pathname}?${search.toString()}`);
    let res = await axios(
      `${JSON_API}/products/?_limit=${dataLimit}&${window.location.search}`
    );
    dispatch({
      type: "GET_PRODUCTS_DATA",
      payload: res,
    });
  },
  changeDataLimit: async (story, dataLimit) => {
    let some = dataLimit;
    some += 4;
    dispatch({
      type: "CHANGE_DATA_LIMIT",
      payload: some,
    });
    console.log(dataLimit);
    // await getProductsData(story)
  },
});

const useStyles = makeStyles((theme) => ({
  productList__hero__main: {
    backgroundImage:
      "url(https://cdn-prod.mortalkombat.com/ultimate/media/media-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  productList__root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    margin: "0 auto",
    // display: "flex",
  },
  productList__container: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
  // paginationClass:{
  //   marginTop: 50,
  //   background: 'rgba(255, 255, 255, 0.1)',
  //   color: 'white!important'
  // },import ProductCardApi from './ProductCardApi';

  // root: {
  //   backgroundImage: 'url(https://cdn-prod.mortalkombat.com/ultimate/media/media-bg.jpg)',
  //   width: "60%",
  // },
  discountText: {
    height: 10,
  },
  paperSmall: {
    height: 10,
  },
}));

// useStyles end here ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const StorePage = (props) => {
  console.log(props);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [types, setTypes] = useState();
  // const {getProductsData,
  //     productsData,
  //     // paginationPages,
  //     // getProductsDataIdSorted,
  //     // getProductsDataStockSorted,
  //     // getProductsDataExpectedSorted,
  //     // getProductsDataDiscountSorted,
  //     // productsWithDiscount,
  //     changeDataLimit,
  //     dataLimit
  // } = useProducts()

  const { getProductsData, productsData, dataLimit, changeDataLimit } = props;

  // function getPage() {
  //     const search = new URLSearchParams(history.location.search)
  //     // console.log(history);
  //     return search.get('_page')
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // const [page, setPage] = useState(getPage())
  // const handlePage = (event, page) => {
  //     const search = new URLSearchParams(history.location.search)
  //     search.set('_page', page)
  //     history.push(`${history.location.pathname}?${search.toString()}`)
  //     setPage(page)
  //     getProductsData(history)
  // }

  // console.log(dataLimit)

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data));
    getProductsData(history, dataLimit);
    // getProductsDataDiscountSorted(history);
    // console.log(productsWithDiscount);
  }, [dataLimit]);

  return (
    <>
      <Header />
      <div className={classes.productList__hero__main}>
        <Grid className={classes.productList__root} xs={11}>
          <Grid className={classes.productList__container}>
            <div className={`${classes.root} tabsContainer`}>
              <AppBar position="static" color="transparent">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab className="asd" label="Новинки" {...a11yProps(0)} />
                  {/* <Tab className="asd" onClick={() => getProductsDataStockSorted(history)} label="В наличии" {...a11yProps(1)} />
                            <Tab className="asd" onClick={() => getProductsDataExpectedSorted(history)} label="Ожидаемые" {...a11yProps(2)} /> */}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid
                    className={classes.productList__container__mainbar}
                    container
                    item
                    spacing={4}
                  >
                    {productsData.map((item) => (
                      <ProductCardApi
                        xs={12}
                        sm={12}
                        className={classes.paper}
                        item={item}
                        key={item.id}
                        types={types}
                      />
                    ))}
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid
                    className={classes.productList__container__mainbar}
                    container
                    item
                    spacing={4}
                  >
                    {productsData.map((item) => (
                      <ProductCardApi
                        xs={12}
                        sm={12}
                        className={classes.paper}
                        item={item}
                        key={item.id}
                      />
                    ))}
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Grid
                    className={classes.productList__container__mainbar}
                    container
                    item
                    spacing={4}
                  >
                    {productsData.map((item) => (
                      <ProductCardApi
                        xs={12}
                        sm={12}
                        className={classes.paper}
                        item={item}
                        key={item.id}
                      />
                    ))}
                  </Grid>
                </TabPanel>
              </SwipeableViews>
            </div>

            <SideBar {...props} />
          </Grid>
          <Button
            className="storePage__showMoreButton"
            onClick={() => {
              changeDataLimit(history, dataLimit);
            }}
          >
            <DoubleArrowIcon />
          </Button>
          {/* <Pagination className={classes.paginationClass} page={+page} onChange={(event, page) => {handlePage(event, page)}} count={paginationPages} color="primary" /> */}
        </Grid>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
