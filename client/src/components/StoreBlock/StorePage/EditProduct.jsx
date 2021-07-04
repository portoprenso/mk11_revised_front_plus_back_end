import React, { useEffect, useRef, useState } from "react";
import "../../Main.scss";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { connect } from "react-redux";
import {
  $authHost,
  $host,
  fetchBrands,
  fetchTypes,
} from "../../../helpers/functions";
import { GET_SHOWCASE_DATA_DETAILS } from "../../../types/gameTypes";

const mapStateToProps = (state) => {
  return {
    gameDetails: state.gameReducer.gameDetails,
    gamesData: state.gameReducer.gamesData,
    showCaseDataDetails: state.gameReducer.showCaseDataDetails,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editShowCaseDetails: async (id, newObj) => {
    await $authHost.patch(`/api/game/${id}`, newObj);
  },
  getShowCaseDetails: async (id) => {
    let { data } = await $host(
      `${process.env.REACT_APP_API_URL}api/game/${id}`
    );
    dispatch({
      type: GET_SHOWCASE_DATA_DETAILS,
      payload: data,
    });
  },
});

const EditProduct = (store, { name, body }) => {
  const {
    showCaseDataDetails,
    editProduct,
    getShowCaseDetails,
    editShowCaseDetails,
    user,
  } = store;
  const { id } = useParams();

  const [perc, setPerc] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [types, setTypes] = useState(null);
  const [brands, setBrands] = useState(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const oldPriceRef = useRef(null);
  const discountPercentPriceRef = useRef(null);
  const imageRef = useRef(null);
  const imageLargeRef = useRef(null);
  const countInStockRef = useRef(null);

  useEffect(() => {
    getShowCaseDetails(id);
    fetchBrands().then((data) => setBrands(data));
    fetchTypes().then((data) => setTypes(data));
  }, [nameRef.current]);

  useEffect(() => {
    putData();
  }, [showCaseDataDetails]);

  function putData() {
    if (
      showCaseDataDetails.info &&
      nameRef.current &&
      user &&
      user.role === "ADMIN"
    ) {
      nameRef.current.value = showCaseDataDetails.name;
      console.log(`this is showcase in putdata ${showCaseDataDetails}`);
      descriptionRef.current.value = showCaseDataDetails.info[0].description;
      priceRef.current.value = showCaseDataDetails.price;
      oldPriceRef.current.value = showCaseDataDetails.oldPrice;
      discountPercentPriceRef.current.value =
        showCaseDataDetails.discountPercent;
      setSelectedBrands(showCaseDataDetails.brandId);
      setSelectedTypes(showCaseDataDetails.typeId);
      countInStockRef.current.value = showCaseDataDetails.countInStock;
    }
  }

  function calcDiscountpercent(first, second) {
    let discount = Math.ceil(100 - (first / second) * 100);
    setPerc(discount);
  }

  async function handleChangeShowCaseDetails() {
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
  }

  return (
    <>
      <Header />
      {user && user.role === "ADMIN" ? (
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
                  <input type="file" ref={imageRef} />
                  {showCaseDataDetails && (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${showCaseDataDetails.image}`}
                      alt={`${showCaseDataDetails.image}`}
                    />
                  )}
                </Grid>
                <Grid className="inp-type__inputContainers">
                  <Typography variant="h6">Большое изображение</Typography>
                  <input type="file" ref={imageLargeRef} />
                  {showCaseDataDetails && (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${showCaseDataDetails.imageLarge}`}
                      alt={`${showCaseDataDetails.imageLarge}`}
                    />
                  )}
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
                  component={Link}
                  to="/test_prod"
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
