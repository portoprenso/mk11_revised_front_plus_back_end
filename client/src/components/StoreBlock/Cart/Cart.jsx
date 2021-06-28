import React, { useContext, useEffect } from 'react';
import './Cart.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useProducts } from '../../../contexts/ProductsContext';
import Header from '../../Header/Header';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

function calcTotalPrice(products) {
    let totalPrice = 0;
    products.forEach(item => {
        totalPrice += item.subPrice
    })
    return totalPrice
}


const Cart = () => {
    // const classes = useStyles();
    const { getCart, cart, changeProductCount, removeProductFromCart } = useProducts()

    useEffect(() => {
        getCart()
    }, [])
    console.log(cart)

    return (
        <>
        <Header/>
        <div className="cart">
            {cart.products ? (
                <div className="cart-container">
                    <table className="cart__table">
                        <tbody>
                            {cart.products.map(elem => (
                                <tr className="cart__tr-item" key={elem.item.id}>
                                        <div className="img">
                                            <img src={elem.item.image}/>
                                        </div>
                                        <li>Название: <strong><span>{elem.item.title}</span></strong></li>
                                        <li>Цена: <strong><span>{elem.item.price}</span></strong></li>
                                        <li>Старая цена: <strong><span>{elem.item.oldPrice}</span></strong></li>
                                        <li>Скидка: <strong><span>{elem.item.discountPercent}</span></strong></li>
                                        <li>Количество: <input min={0} onChange={(e) => changeProductCount(e.target.value, elem.item.id)} type="number" value={elem.count} /></li>
                                        <li>Предварительный итог: <span><strong>{elem.subPrice}</strong></span></li>
                                        <li><Button variant="contained" color="secondary" onClick={() => removeProductFromCart(elem.item)}>Удалить</Button></li>
                                        <hr />
                                    </tr>
                            ))}
                        </tbody>
                        {cart.products.length > 0 ? (
                            <div className="btn_sum">
                                <h4>Общий итог: {calcTotalPrice(cart.products)}</h4>

                                
                                <Link exact to="/checkout"><button className="btn_click">Купить</button></Link>
                            </div>

                        )
                    :
                    (
                            <div className="btn_sum">
                                <div>В Вашей корзине пусто</div>
                                <Link exact to="/store"><Button>перейти к покупкам</Button></Link>
                            </div>

                    )}
                    </table>
                </div>
            ) : (
                <CircularProgress />
            ) }
        </div>
        </>
    );
};

export default Cart;