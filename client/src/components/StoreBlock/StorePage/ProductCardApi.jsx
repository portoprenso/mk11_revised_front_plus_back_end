import React, { useEffect, useState } from "react";
import { Card, CardHeader, makeStyles } from "@material-ui/core";
import { Typography, IconButton, CardActions } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import DetailsIcon from "@material-ui/icons/Details";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAuth } from "../../../contexts/AuthContext";
import { connect } from "react-redux";
import { $host, fetchTypes } from "../../../helpers/functions";



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        padding: 20,
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.1)",
        WebkitTextStroke: "0.5px black",
        color: "white",
    },
    productCard__price: {
        display: "flex",
        alignItems: "center",
        width: "25%",
    },
    productCard__header: {
        width: "40%",
    },
}));

const mapStateToProps = (state) => {
    return {
        showCaseData: state.productReducer.showCaseData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: async (id, getShowCaseData) => {
            let { data } = await $host.delete(`api/game/`);
            getShowCaseData()
        },
        getShowCaseData: async () => {
            let { data } = await $host.get(`api/game/`);
            dispatch({
                type: "GET_SHOWCASE_DATA",
                payload: data.rows,
            });
        },
    };
};

const ProductCardApi = (store) => {
    const history = useHistory();
    const classes = useStyles();
    const { currentUser } = useAuth();
    const {deleteProduct, game, getShowCaseData} = store
    console.log(game);
    console.log(currentUser)
    console.log(store);
    const [types, setTypes] = useState()
    useEffect(() => {
        fetchTypes().then(data => setTypes(data))
    }, [])

    console.log(types)

    return (
        <Card className={classes.root}>
            <div className="bigCardImage">
                <img src={process.env.REACT_APP_API_URL + game.image} />
            </div>
            <CardHeader
                className={`${classes.productCard__header}`}
                title={<Typography variant="h6">{game.name}</Typography>}
                subheader={
                    <Typography color="textSecondary">
                        {types && types[game.typeId].name}
                    </Typography>
                }
            />
            <Typography className={classes.productCard__header__link}>
                <Link
                    game={game}
                    id={game.id}
                    exact
                    to={`/store/gamedetails/${game.id}`}
                >
                    <DetailsIcon />
                </Link>
            </Typography>
            <Grid xs={1}>
                {currentUser &&
                currentUser.uid === "Ti6pFHiMAkdij9f1OlefDNhkwFT2" ? (
                    <div>
                        <Button
                        onClick={() => deleteProduct(game.id, getShowCaseData)}
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Link
                            id={game.id}
                            exact to={`/store/editproduct/${game.id}`}
                        >
                            <Button>
                                <EditIcon />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div></div>
                )}
            </Grid>
            <Typography
                className={`${classes.productCard__price} testClassPrice`}
                align="center"
                variant="h5"
                color="textPrimary"
                component="div"
            >
                {`${game.price}с`}
                <CardActions disableSpacing>
                    <IconButton
                        // onClick={() => {
                        //     addProductToCart(game);
                        // }}
                        aria-label="share"
                        // color={
                        //     checkProductInCart(game.id)
                        //         ? "secondary"
                        //         : "primary"
                        // }
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Typography>
        </Card>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardApi);
