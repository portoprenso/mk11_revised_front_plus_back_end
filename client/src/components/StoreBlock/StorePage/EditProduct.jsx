import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditProduct.scss";
import { Card, Alert } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Grid,
  TextareaAutosize,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useAuth } from "../../../contexts/AuthContext";
// import { useProducts } from "../../../contexts/ProductsContext";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { connect } from "react-redux";
import axios from "axios";
import { JSON_API } from "../../../helpers/static";
import { $host, fetchBrands, fetchTypes } from "../../../helpers/functions";




const mapStateToProps = (state) => {
  return {
    productDetails: state.productReducer.productDetails,
    productsData: state.productReducer.productsData,
    showCaseDataDetails: state.productReducer.showCaseDataDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // getProductsData: async (history, dataLimit) => {
  //   const search = new URLSearchParams(history.location.search);
  //   search.set("_limit", dataLimit);
  //   history.push(`${history.location.pathname}?${search.toString()}`);
  //   let res = await axios(
  //     `${JSON_API}/products/?_limit=${dataLimit}&${window.location.search}`
  //   );
  //   dispatch({
  //     type: "GET_PRODUCTS_DATA",
  //     payload: res,
  //   });
  // },
  getShowCaseData: async () => {
    let { data } = await $host.get(`api/game/`);
    dispatch({
      type: "GET_SHOWCASE_DATA",
      payload: data.rows,
    });
  },
  // getProductDetails: async (id) => {
  //   let { data } = await axios(`${JSON_API}/products/${id}`)
  //   dispatch({
  //       type: 'GET_PRODUCTS_DETAILS',
  //       payload: data
  //   });
  // },
  // editProduct: async (id, newObj, story, getShowCaseData) => {
  //   await axios.patch(`${JSON_API}/products/${id}`, newObj);
  //   getShowCaseData(story);
  // },

  editShowCaseDetails: async (id, newObj) => {
    await $host.patch(`/api/game/${id}`, newObj);
    // getShowCaseData(story);
  },
  // editShowCaseDetails: async (id, newObj, story, getShowCaseData) => {
  //   await $host.patch(`/game/${id}`, newObj);
  //   getShowCaseData(story);
  // },
  getShowCaseDetails: async (id) => {
    let { data } = await $host(
      `${process.env.REACT_APP_API_URL}api/game/${id}`
    );
    dispatch({
      type: "GET_SHOWCASE_DATA_DETAILS",
      payload: data,
    });
  },
});

const EditProduct = (store, { name, body }) => {
  const {
    showCaseDataDetails,
    editProduct,
    getShowCaseDetails,
    getShowCaseData,
    editShowCaseDetails
  } = store;
  const { id } = useParams();
  // const { getProductDetails, productDetails, editProduct, getProductsData } = useProducts()

  const [error, setError] = useState("");
  const [perc, setPerc] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [types, setTypes] = useState(null)
  const [brands, setBrands] = useState(null)
  const { currentUser } = useAuth();
  const history = useHistory();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const oldPriceRef = useRef(null);
  const discountPercentPriceRef = useRef(null);
  const brandIdRef = useRef(null);
  const typeIdRef = useRef(null);
  const imageRef = useRef(null);
  const imageLargeRef = useRef(null);
  const countInStockRef = useRef(null);

  useEffect(() => {
    asd();
    fetchBrands().then(data => setBrands(data));
    fetchTypes().then(data => setTypes(data));
  }, [nameRef.current]);

  console.log(showCaseDataDetails)

  function putData() {
    if (showCaseDataDetails.info && nameRef.current && currentUser && currentUser.uid === "Ti6pFHiMAkdij9f1OlefDNhkwFT2") {
      nameRef.current.value = showCaseDataDetails.name;
      console.log(`this is showcase in putdata ${showCaseDataDetails}`)
      descriptionRef.current.value = showCaseDataDetails.info[0].description;
      priceRef.current.value = showCaseDataDetails.price;
      oldPriceRef.current.value = showCaseDataDetails.oldPrice;
      discountPercentPriceRef.current.value =
      showCaseDataDetails.discountPercent;
      setSelectedBrands(showCaseDataDetails.brandId);
      setSelectedTypes(showCaseDataDetails.typeId);
      // imageRef.current.value = showCaseDataDetails.image;
      // imageLargeRef.current.value = showCaseDataDetails.imageLarge;
      countInStockRef.current.value = showCaseDataDetails.countInStock;
    }
  }

  async function asd() {
    await getShowCaseDetails(id);
    await putData();
  }

  function calcDiscountpercent(first, second) {
    let discount = Math.ceil(100 - (first / second) * 100);
    setPerc(discount);
  }

  async function handleChangeShowCaseDetails() {
    // let newObjInfo = new FormData();
    // newObjInfo.append("name", nameRef.current.value);
    // newObjInfo.append("description", descriptionRef.current.value);

    let newObj = new FormData();
    newObj.append("name", nameRef.current.value);
    newObj.append("price", parseInt(priceRef.current.value));
    newObj.append("oldPrice", parseInt(oldPriceRef.current.value));
    newObj.append(
      "discountPercent",
      parseInt(discountPercentPriceRef.current.value)
    );
    newObj.append("brandId", selectedBrands);
    newObj.append("typeId", selectedTypes);
    newObj.append("image", imageRef.current.files[0]);
    newObj.append("imageLarge", imageLargeRef.current.files[0]);
    newObj.append("countInStock", parseInt(countInStockRef.current.value));
    newObj.append(
      "info",
      JSON.stringify({
        title: nameRef.current.value,
        description: descriptionRef.current.value,
      })
    );
    await editShowCaseDetails(id, newObj);
    console.log("handleChangeShowCaseDetails worked")
  }

  return (
    <>
      <Header />
      {currentUser && currentUser.uid === "Ti6pFHiMAkdij9f1OlefDNhkwFT2" ? (
        <div
          style={{
            dispaly: "flex",
            paddingTop: 50,
            color: "white",
            maxWidth: 1280,
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="fff">
            <div>
              <form className="inp-type">
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Название</Typography>
                  <TextareaAutosize
                    className="inp-type__input"
                    ref={nameRef}
                    placeholder="Название"
                  />
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Описание</Typography>
                  <TextareaAutosize
                    className="inp-type__input"
                    ref={descriptionRef}
                    placeholder="Описание"
                  />
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Цена со скидкой</Typography>
                  <TextareaAutosize
                    className="inp-type__input"
                    ref={priceRef}
                    placeholder="Цена со скидкой"
                  />
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Цена без скидки</Typography>
                  <TextareaAutosize
                    onChange={() =>
                      calcDiscountpercent(
                        priceRef.current.value,
                        oldPriceRef.current.value
                      )
                    }
                    className="inp-type__input"
                    ref={oldPriceRef}
                    placeholder="Цена без скидки"
                  />
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Процент скидки</Typography>
                  <TextareaAutosize
                    className="inp-type__input"
                    ref={discountPercentPriceRef}
                    value={perc}
                    placeholder="Процент скидки"
                  />
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Издатель</Typography>
                  {/* <TextareaAutosize
                                        className="inp-type__input"
                                        ref={authorRef}
                                        placeholder="Издатель"
                                    /> */}
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          {...bindTrigger(popupState)}
                        >
                          {selectedBrands && brands
                            ? brands.map((brand, index) => {
                                if (brand.id === selectedBrands)
                                  return brands[index].name;
                              })
                            : "Издатель (brandId)"}
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          {brands &&
                            brands.map((item) => {
                              return (
                                <MenuItem
                                  onClick={() => {
                                    popupState.close();
                                    setSelectedBrands(item.id);
                                  }}
                                  key={item.id}
                                >
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Жанр</Typography>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          {...bindTrigger(popupState)}
                        >
                          {selectedTypes && types
                            ? types.map((type, index) => {
                                if (type.id === selectedTypes)
                                  return types[index].name;
                              })
                            : "Жанр (type)"}
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          {types &&
                            types.map((item) => {
                              return (
                                <MenuItem
                                  onClick={() => {
                                    popupState.close();
                                    setSelectedTypes(item.id);
                                  }}
                                  id={item.id}
                                >
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </Grid>{" "}
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Маленькое изображение</Typography>
                  <input
                  type="file"
                    ref={imageRef}
                  />
                  {
                    showCaseDataDetails && <img src={`${process.env.REACT_APP_API_URL}${showCaseDataDetails.image}`} alt={`${showCaseDataDetails.image}`} />
                  }
                  {/* <TextareaAutosize
                    className="inp-type__input"
                    ref={imageRef}
                    placeholder="Маленькое изображение"
                  /> */}
                  {/* {
                    imageRef.current ?
                    <img src={`${process.env.REACT_APP_API_URL}${imageRef.current.value}`} alt="" />
                    :
                    <></>
                  } */}
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Большое изображение</Typography>
                  <input
                  type="file"
                    ref={imageLargeRef}
                  />
                  {
                    showCaseDataDetails && <img src={`${process.env.REACT_APP_API_URL}${showCaseDataDetails.imageLarge}`} alt={`${showCaseDataDetails.imageLarge}`} />
                  }

                  {/* <TextareaAutosize
                    className="inp-type__input"
                    ref={imageLargeRef}
                    placeholder="Большое изображение"
                  /> */}
                  {/* {imageLargeRef.current ? 
                  <img src={`${process.env.REACT_APP_API_URL}${imageLargeRef.current.value}`} alt="" />
                  :
                  <></>
                  } */}
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Количество в наличии</Typography>
                  <TextareaAutosize
                    className="inp-type__input"
                    ref={countInStockRef}
                    placeholder="Количество в наличии"
                  />
                </Grid>
                <Button
                  onClick={() => handleChangeShowCaseDetails()}
                  color="primary"
                  variant="contained"
                >
                  Сохранить изменения
                </Button>
                <Link exact to="/homepage">
                  <Button color="primary" variant="contained">
                    Отмена
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
