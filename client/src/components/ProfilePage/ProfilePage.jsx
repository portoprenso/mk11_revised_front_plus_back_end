import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Card, Alert } from "react-bootstrap";
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
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfilePage.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { connect } from "react-redux";
import { JSON_API, NODE_API } from "../../helpers/static";
import { $authHost, $host, check, destroyToken, fetchBrands, fetchTypes, getDecodedToken } from "../../helpers/functions";

const mapStateToProps = (state) => {
    return {
        productsData: state.productReducer.productsData,
        productDetails: state.productReducer.productsDetails,
        rosterData: state.rosterReducer.rosterData,
        paginationPages: state.productReducer.paginationPages,
        cart: state.productReducer.cart,
        dataLimit: state.productReducer.dataLimit,
        user: state.authReducer.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    editProduct: async (id, newObj, story, getProductsData, store) => {
        await axios.patch(`${JSON_API}/products/${id}`, newObj);
        getProductsData(story, store.dataLimit);
    },
    addNewGame: async (newGame, story, getProductsData, store) => {
        // console.log(newGame)
        const {data} = await $authHost.post("api/game", newGame);
        getProductsData(story, store.dataLimit);
        alert("Новый продукт создан!");
        return data
    },
    getInfoFromApi: async (game) => {
        // console.log(game)
        const {data} = await $host.get("api/game/", game);
        // console.log(data)
        return data
    },

    getRosterData: async () => {
        let { data } = await axios(`${JSON_API}/roster`);
        dispatch({
            type: "GET_ROSTER_DATA",
            payload: data,
        });
    },
    addNewFighter: async (newPerson, getRosterData) => {
        await axios.post(`${JSON_API}/roster`, newPerson);
        getRosterData();
    },
    checkGetDecodedToken: async() => {
        const data = await getDecodedToken()
        if(!data){
            dispatch({
                type: "GET_CURRENT_USER",
                payload: null
            })
        }
        if(data){
            dispatch({
                type: "GET_CURRENT_USER",
                payload: data
            })
        }
    },
});

const ProfilePage = (store) => {
    // console.log(store);
    const [error, setError] = useState("");
    const [types, setTypes] = useState(null)
    const [brands, setBrands] = useState(null)
    const [selectedTypes, setSelectedTypes] = useState(null)
    const [selectedBrands, setSelectedBrands] = useState(null)
    // const [user, setUser] = useState(null)
    const [imgState, setImgState] = useState(null)
    const [imgLargeState, setImgLargeState] = useState(null)
    const { logout } = useAuth();
    // console.log(user)
    const {
        getProductsData,
        productsData,
        editProduct,
        getProductDetails,
        addNewGame,
        productDetails,
        addNewFighter,
        getRosterData,
        getInfoFromApi,
        checkGetDecodedToken,
        user
    } = store;
    const [perc, setPerc] = useState(0);
    const history = useHistory();
    const heroNameRef = useRef();
    const phraseRef = useRef();
    const heroDescriptionRef = useRef();
    const bigPicRef = useRef();
    const littlePicRef = useRef();
    const videoRef = useRef();
    
    // addNewGame refs ↓
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const oldPriceRef = useRef();
    const discountPercentPriceRef = useRef();
    const imageRef = useRef(null);
    const imageLargeRef = useRef(null);
    const countInStockRef = useRef();

    console.log(user);
    // console.log(selectedBrands)
    // console.log(selectedTypes)

    useEffect(() => {
        fetchBrands().then(data => setBrands(data))
        fetchTypes().then(data => setTypes(data))
        checkGetDecodedToken()
    }, [history]);
    // console.log(brands)
    // console.log(types)

    async function handleAddToFav(id) {
        let { data } = await axios(`http://localhost:8000/products/${id}`);
        console.log(data);

        if (data.favorites.length > 0) {
            if (data.favorites.includes(user.email)) {
                data.favorites = data.favorites.filter(
                    (elem) => elem !== user.email
                );
            } else {
                data.favorites.push(user.email);
            }
        } else {
            data.favorites.push(user.email);
        }

        await editProduct(id, data, history, getProductsData, store);
        await getProductDetails(id);
        // console.log(productDetails.favorites);
    }

    async function handleLogout() {
        setError("");
        try {
            await destroyToken();
            history.push("/");
        } catch (error) {
            console.log(error);
            setError("Ошибка при авторизации");
        }
    }

    async function handleChange() {
        let newObj = {
            name: nameRef.current.value,
            phrase: phraseRef.current.value,
            description: descriptionRef.current.value,
            bigPic: bigPicRef.current.value,
            littlePic: littlePicRef.current.value,
            video: videoRef.current.value,
        };
        // console.log(newObj);
        await addNewFighter(newObj, getRosterData);
        nameRef.current.value = null;
        phraseRef.current.value = null;
        descriptionRef.current.value = null;
        bigPicRef.current.value = null;
        littlePicRef.current.value = null;
        videoRef.current.value = null;
    }

    async function handleChangeProduct() {
        let newObjInfo = new FormData();
        newObjInfo.append("name", nameRef.current.value)
        newObjInfo.append("description", descriptionRef.current.value)
        
        let newObj = new FormData();
        newObj.append("name", nameRef.current.value)
        newObj.append("price", parseInt(priceRef.current.value))
        newObj.append("oldPrice", parseInt(oldPriceRef.current.value))
        newObj.append("discountPercent", parseInt(discountPercentPriceRef.current.value))
        newObj.append("brandId", selectedBrands)
        newObj.append("typeId", selectedTypes)
        newObj.append("image", imageRef.current.files[0])
        newObj.append("imageLarge", imageLargeRef.current.files[0])
        newObj.append("countInStock", parseInt(countInStockRef.current.value))
        newObj.append("info", JSON.stringify({
            title: nameRef.current.value,
            description: descriptionRef.current.value,
        }))
        // console.log(newObj)
        // let newObj = {
        //     name: nameRef.current.value,
        //     price: parseInt(priceRef.current.value),
        //     oldPrice: parseInt(oldPriceRef.current.value),
        //     discountPercent: parseInt(discountPercentPriceRef.current.value),
        //     brandId: authorRef.current.value,
        //     typeId: categoryRef.current.value,
        //     image: imageRef.current.files[0],
        //     countInStock: parseInt(countInStockRef.current.value),
            // info: {
            //     name: nameRef.current.value,
            //     description: descriptionRef.current.value,
            //     imageLarge: imageLargeRef.current.value,
            // }
        // };
        await addNewGame(newObj, history, getProductsData, store);
        // nameRef.current.value = null;
        // descriptionRef.current.value = null;
        // priceRef.current.value = null;
        // oldPriceRef.current.value = null;
        // discountPercentPriceRef.current.value = null;
        // authorRef.current.value = null;
        // categoryRef.current.value = null;
        // imageRef.current.files = null;
        // imageLargeRef.current.files = null;
        // countInStockRef.current.value = null;
    }

    function calcDiscountpercent(first, second) {
        let discount = Math.ceil(100 - (first / second) * 100);
        setPerc(discount);
    }

      const showImage = (event) => {
        setImgState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }
      const showImageLarge = (event) => {
        setImgLargeState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }

    return (
        <>
            <Header />
            <div style={{ dispaly: "flex", paddingTop: 50 }}>
                <div className="profile-page__main-container">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Мой профиль</h2>
                            <div className="card-container">
                                <div className="card-content">
                                    <div className="image-container">
                                        {/* <h3 className="profile"></h3> */}
                                        {/* <img className="img-pro" src={Pro} alt=""/> */}
                                    </div>
                                    <div className="card-title">
                                        {/* <h3></h3> */}
                                    </div>
                                    <div className="card-body">
                                        {/* <p>{body}</p> */}
                                    </div>
                                </div>
                                <div className="btn">
                                    {/* <img
                                        className="profilePage__user-image"
                                        src={currentUser.photoURL}
                                        alt="some text here"
                                    />
                                    <Button className="profilePage__user-name">
                                        {currentUser.displayName}
                                    </Button> */}
                                    <Button
                                        className="profile-page__emailInfo-button"
                                        // onClick={() => {
                                        //     console.log(productsData);
                                        // }}
                                    >
                                        {error && (
                                            <Alert variant="danger">
                                                {error}
                                            </Alert>
                                        )}
                                        <strong>Email:</strong>{" "}
                                        {user && user.email}
                                    </Button>
                                    <ButtonGroup className="dashBoard__buttongroup">
                                        {/* <Button
                                            color="primary"
                                            variant="contained"
                                        >
                                            <Link to="/update-profile">
                                                Ред. профиль
                                            </Link>
                                        </Button> */}
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            className="dashboard__logoutButton"
                                            onClick={handleLogout}
                                        >
                                            <Link>Выйти</Link>
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                        >
                                            <Link exact to="/cart">
                                                <ShoppingCartIcon />
                                            </Link>
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="profile-page__fav-block">
                        <h2
                            style={{
                                alignSelf: "center",
                                color: "#fda90f",
                                textAlign: "center",
                            }}
                        >
                            Избранное
                        </h2>
                        {/* <div>
                            {productsData.map((item) => {
                                if (
                                    item.favorites.includes(user.email)
                                ) {
                                    return (
                                        <div className="fav-block__item">
                                            <ProductCard
                                                xs={12}
                                                sm={12}
                                                item={item}
                                                key={item.id}
                                            />
                                            <Button
                                                style={{ color: "white" }}
                                                className="fav-block__item__removeButton"
                                                onClick={() =>
                                                    handleAddToFav(item.id)
                                                }
                                            >
                                                Удалить из избранного
                                            </Button>
                                        </div>
                                    );
                                }
                            })}
                        </div> */}
                    </div>
                    <div className="profilePage__addHero__inputs">
                        <div className="profilePage__addHero__inputs__container">
                            <h2
                                style={{
                                    alignSelf: "center",
                                    color: "#fda90f",
                                    textAlign: "center",
                                }}
                            >
                                Добавить нового персонажа
                            </h2>
                            <form className="inp-type">
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">Name</Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={heroNameRef}
                                        placeholder="Имя персонажа"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">Phrase</Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={phraseRef}
                                        placeholder="Коронное слово"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Description
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={descriptionRef}
                                        placeholder="Описание персоанаж"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">BigPic</Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={bigPicRef}
                                        placeholder="Большое изображение для именной страницы"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        LittlePic
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={littlePicRef}
                                        placeholder="Маленькое изображение для ростера"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Video URL
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={videoRef}
                                        placeholder="URL видео-ролика"
                                    />
                                </Grid>
                                <Button
                                    className="profilePage__button"
                                    onClick={() => handleChange()}
                                    color="primary"
                                    variant="contained"
                                >
                                    Добавить нового персонажа
                                </Button>
                            </form>
                        </div>

                        <div className="profile-page__addNewProduct-inputs">
                            <h2
                                style={{
                                    alignSelf: "center",
                                    color: "#fda90f",
                                    textAlign: "center",
                                }}
                            >
                                Добавить новый продукт
                            </h2>
                            <form className="inp-type">
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Название
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={nameRef}
                                        placeholder="Название"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Описание
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={descriptionRef}
                                        placeholder="Описание"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Цена со скидкой
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={priceRef}
                                        placeholder="Цена со скидкой"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Цена без скидки
                                    </Typography>
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
                                    <Typography variant="h6">
                                        Процент скидки
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={discountPercentPriceRef}
                                        value={perc}
                                        placeholder="Процент скидки"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Издатель
                                    </Typography>
                                    {/* <TextareaAutosize
                                        className="inp-type__input"
                                        ref={authorRef}
                                        placeholder="Издатель"
                                    /> */}
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                            {(popupState) => (
                                                <React.Fragment>
                                                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                                    {selectedBrands ? brands.map((brand, index) => {if(brand.id === selectedBrands) return brands[index].name}) : "Издатель (brandId)"}
                                                </Button>
                                                <Menu {...bindMenu(popupState)}>
                                                    {brands && brands.map(item => {
                                                        return <MenuItem onClick={() => {popupState.close(); setSelectedBrands(item.id)}} key={item.id}>{item.name}</MenuItem>
                                                    })
                                                    }
                                                </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>

                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">Жанр</Typography>
                                    {/* <TextareaAutosize
                                        className="inp-type__input"
                                        ref={categoryRef}
                                        placeholder="Жанр"
                                    /> */}
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                            {(popupState) => (
                                                <React.Fragment>
                                                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                                {selectedTypes ? types.map((type, index) => {if(type.id === selectedTypes) return types[index].name}) : "Жанр (type)"}
                                                </Button>
                                                <Menu {...bindMenu(popupState)}>
                                                    {types && types.map(item => {
                                                        return <MenuItem onClick={() => {popupState.close(); setSelectedTypes(item.id)}} id={item.id}>{item.name}</MenuItem>
                                                    })
                                                    }
                                                </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>

                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Маленькое изображение
                                    </Typography>
                                    <input
                                        className="inp-type__input"
                                        onChange={showImage}
                                        ref={imageRef}
                                        placeholder="Маленькое изображение"
                                        // onChange={() => console.log(imageRef.current.files)}
                                        type="file"
                                    />
                                    {imageRef.current && imageRef.current.files[0]
                                    ?
                                    <img src={imgState.file}/>
                                    :
                                    <></>
                                    }
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Большое изображение
                                    </Typography>
                                    <input
                                        className="inp-type__input"
                                        onChange={showImageLarge}
                                        ref={imageLargeRef}
                                        placeholder="Большое изображение"
                                        type="file"
                                    />
                                    {imageLargeRef.current && imageLargeRef.current.files[0]
                                    ?
                                    <img src={imgLargeState.file}/>
                                    :
                                    <></>
                                    }

                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Количество в наличии
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={countInStockRef}
                                        placeholder="Количество в наличии"
                                    />
                                </Grid>
                                <Button
                                    onClick={() => handleChangeProduct()}
                                    color="primary"
                                    variant="contained"
                                >
                                    Добавить новый товар
                                </Button>
                            </form>
                            {/* <Button
                                    onClick={(() => getInfoFromApi())}
                                    color="primary"
                                    variant="contained"
                                >
                                    ТЕСТОВАЯ КНОПКА
                                </Button> */}

                            {/* <form className="inp-type">
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Название
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={nameRef}
                                        placeholder="Название"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Описание
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={descriptionForProductRef}
                                        placeholder="Описание"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Цена со скидкой
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={priceRef}
                                        placeholder="Цена со скидкой"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Цена без скидки
                                    </Typography>
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
                                    <Typography variant="h6">
                                        Процент скидки
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={discountPercentPriceRef}
                                        value={perc}
                                        placeholder="Процент скидки"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Издатель
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={authorRef}
                                        placeholder="Издатель"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">Жанр</Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={categoryRef}
                                        placeholder="Жанр"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Маленькое изображение
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={imageRef}
                                        placeholder="Маленькое изображение"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Большое изображение
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={imageLargeRef}
                                        placeholder="Большое изображение"
                                    />
                                </Grid>
                                <Grid className="inp-type__inputContainers">
                                    <Typography variant="h6">
                                        Количество в наличии
                                    </Typography>
                                    <TextareaAutosize
                                        className="inp-type__input"
                                        ref={countInStockRef}
                                        placeholder="Количество в наличии"
                                    />
                                </Grid>
                                <Button
                                    onClick={() => handleChangeProduct()}
                                    color="primary"
                                    variant="contained"
                                >
                                    Добавить новый товар
                                </Button>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
