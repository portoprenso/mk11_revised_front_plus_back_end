import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useHistory } from 'react-router-dom'
import './ProductCard.css'
import { useAuth } from '../../../contexts/AuthContext';
import { useProducts } from '../../../contexts/ProductsContext';
import DetailsIcon from '@material-ui/icons/Details';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        padding: 20,
        justifyContent: "space-between",
        background: 'rgba(255, 255, 255, 0.1)',
        WebkitTextStroke: '0.5px black',
        color: 'white'
    },
    productCard__price: {
        display: 'flex',
        alignItems: 'center',
        width: '25%'
    },
    productCard__header: {
        width: '40%'
    },

}));

export default function ProductCard({ item }) {
    const history = useHistory()
    const classes = useStyles();
    const { addProductToCart, checkProductInCart, deleteProduct } = useProducts()
    const { currentUser } = useAuth()

    return (
        <Card className={classes.root}>
            <div className="bigCardImage"><img src={`${item.image}`}/></div>
            <CardHeader className={`${classes.productCard__header}`}
                title={<Typography variant="h6">{item.title}</Typography>}
                subheader={<Typography color="textSecondary">{item.category}</Typography>}
                subheader={<Typography color="textSecondary">{item.category}</Typography>}
            />
            <Typography className={classes.productCard__header__link}>
                <Link item={item} id={item.id} exact to={`/store/gamedetails/${item.id}`}><DetailsIcon/></Link>
            </Typography>
            <Grid xs={1}>
                { currentUser && currentUser.uid === 'Ti6pFHiMAkdij9f1OlefDNhkwFT2' ? (<div>
                    <Button onClick={() => deleteProduct(item.id, history)}>
                        <DeleteForeverIcon />
                    </Button>
                    <Link id={item.id} exact to={`/store/editproduct/${item.id}`}>
                        <Button><EditIcon /></Button>
                    </Link>
                    </div>
                ) 
                : (
                    <div></div>
                )}
            </Grid>
                <Typography className={`${classes.productCard__price} testClassPrice`} align="center" variant="h5" color="textPrimary" component="div">
                    {`${item.price}с`}
                    <CardActions disableSpacing>
                        <IconButton onClick={() =>
                        {addProductToCart(item)}}
                        aria-label="share"
                        color={checkProductInCart(item.id) ? "secondary" : "primary"}>
                            <ShoppingCartIcon />
                        </IconButton>
                    </CardActions>
                </Typography>
        </Card>
    );
}
