import React, { useState } from "react";
import "./Header.css";
import { fade, makeStyles } from "@material-ui/core/styles";
import MKLogo from "../../assets/mortal-kombat-11-vector-logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { JSON_API } from "../../helpers/static";
import axios from "axios";

const mapStateToProps = (state) => {
    return {
        productsData: state.productReducer.productsData,
    };
};

const mapDispatchToProps = (dispatch) => ({
    nulifyDataLimit: async (history) => {
        let some = 8;
        dispatch({
            type: "NULIFY_DATA_LIMIT",
            payload: some,
        });
        await history.push("/store/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    },
    getProductsData: async (history, datalimit) => {
        const search = new URLSearchParams(history.location.search);
        search.set("_limit", datalimit);
        history.push(`${history.location.pathname}?${search.toString()}`);
        let res = await axios(
            `${JSON_API}/products/?_limit=${datalimit}&${window.location.search}`
        );
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: res,
        });
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        color: "black",
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
        display: "flex",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        color: "#ff3c20",
        height: "100%",
        position: "relative",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

function Header(store) {
    const classes = useStyles();
    let history = useHistory();
    const { currentUser } = useAuth();
    const [searchValue, setSearchValue] = useState(getSearchValue());
    const { nulifyDataLimit, getProductsData } = store;

    function getSearchValue(e) {
        const search = new URLSearchParams(history.location.search);
        // console.log(history.location.pathname);
        return search.get("q");
    }

    const handleValue = (e) => {
        const search = new URLSearchParams(history.location.search);
        search.set("q", e.target.value);
        history.push(`${history.location.pathname}?${search.toString()}`);
        setSearchValue(e.target.value);
        getProductsData(history, store.datalimit);
    };

    return (
        <div className="nav-bar">
            <div className="nav-bar__wrapper">
                <Link exact to="/">
                    <img src={MKLogo} alt="asd" className="top-logo-mk" />
                </Link>
                <nav role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id="menu">
                            <Link exact to="/roster">
                                <li className="ul__item">Roster</li>
                            </Link>
                            <Link exact to="/chat">
                                <li className="ul__item">Чат</li>
                            </Link>
                            <li className="ul__item">Сообщество</li>
                            <Link exact to="/gallery">
                                <li className="ul__item">Галлерея</li>
                            </Link>
                            <li
                                onClick={() => nulifyDataLimit(history)}
                                className="ul__item"
                            >
                                Продукция
                            </li>
                            {currentUser ? (
                                <Link exact to="/profile">
                                    <li className="ul__item">
                                        <button className="btn-buy">
                                            Мой профиль
                                        </button>
                                    </li>
                                </Link>
                            ) : (
                                <Link exact to="/login">
                                    <li className="ul__item">
                                        <button className="btn-buy">
                                            Войти
                                        </button>
                                    </li>
                                </Link>
                            )}

                            {history.location.pathname === "/store/" ? (
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        value={searchValue}
                                        onChange={handleValue}
                                        placeholder="Поиск игр..."
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ "aria-label": "search" }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                </nav>
                <ul className="header__ul">
                    <Link exact to="/roster">
                        <li className="ul__item">Roster</li>
                    </Link>
                    <Link exact to="/chat">
                        <li className="ul__item">Чат</li>
                    </Link>
                    <Link exact to="/test_prod">
                        <li className="ul__item">Тестовая витрина</li>
                    </Link>
                    <Link exact to="/gallery">
                        <li className="ul__item">Галлерея</li>
                    </Link>
                    <li onClick={() => nulifyDataLimit(history)} className="ul__item">
                        Продукция
                    </li>
                    {currentUser ? (
                        <Link exact to="/profile">
                            <li className="ul__item">
                                <button className="btn-buy">Мой профиль</button>
                            </li>
                        </Link>
                    ) : (
                        <Link exact to="/login">
                            <li className="ul__item">
                                <button className="btn-buy">Войти</button>
                            </li>
                        </Link>
                    )}

                    {history.location.pathname === "/store/" ? (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                value={searchValue}
                                onChange={handleValue}
                                placeholder="Поиск игр..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);