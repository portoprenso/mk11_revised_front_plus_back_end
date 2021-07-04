import React, { useContext, useEffect, useState } from 'react';
import './Cart.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Header from '../../Header/Header';
import { calcTotalPrice, removeProductFromCart, calcSubPrice, $host } from '../../../helpers/functions';
import { connect } from 'react-redux';
import { GET_CART, GET_SHOWCASE_DATA } from '../../../types/gameTypes';


const mapStateToProps = (state: any) => {
  return {
    showCaseData: state.gameReducer.showCaseData,
    cart: state.gameReducer.cart
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getShowCaseData: async () => {
      let { data } = await $host.get(`api/game/`);
      dispatch({
        type: GET_SHOWCASE_DATA,
        payload: data.rows,
      });
    },
    getCart: async () => {
      let cart = await JSON.parse(`${localStorage.getItem('cart')}`)
      if (!cart) {
        cart = {
          products: [],
          totalPrice: 0
        }
      }
      dispatch({
        type: GET_CART,
        payload: cart
      })
      return cart
    },
    changeProductCount: async (count: number | string, id: number | string, getCart: any, calcTotalPrice: any, calcSubPrice: any) => {
      let cart = JSON.parse(`${localStorage.getItem('cart')}`)
      cart.games = cart.games.map((elem: any) => {
        if (elem.gameId === id) {
          elem.count = parseInt(`${count}`)
          elem.subPrice = calcSubPrice(elem)
        }
        return elem
      })
      cart.totalPrice = calcTotalPrice(cart.games)
      localStorage.setItem('cart', JSON.stringify(cart))
      getCart()
    }
  };
};


const Cart = (store: any) => {
  const { getShowCaseData, showCaseData, getCart, changeProductCount, cart } = store
  useEffect(() => {
    getCart()
    getShowCaseData()
  }, [])

  return (
    <>
      <Header />
      <div className="cart">
        {showCaseData && cart && cart.games ? (
          <div className="cart-container">
            <table className="cart__table">
              <tbody>
                {cart && cart.games.map((elem: any) => {
                  if (cart)
                    return <tr className="cart__tr-item" key={elem.gameId}>
                      <div className="img">
                        <img src={showCaseData.map((game: any) => { if (game.id === elem.gameId) return `${process.env.REACT_APP_API_URL}${game.image}` }).join('')} />
                      </div>
                      <li>Название: <strong><span>{showCaseData.map((game: any) => { if (game.id === elem.gameId) return game.name })}</span></strong></li>
                      <li>Цена: <strong><span>{elem.price}</span></strong></li>
                      <li>Старая цена: <strong><span>{showCaseData.map((game: any) => { if (game.id === elem.gameId) return game.oldPrice })}</span></strong></li>
                      <li>Количество: <input min={0} onChange={(e) => changeProductCount(e.target.value, elem.gameId, getCart, calcTotalPrice, calcSubPrice)} type="number" value={elem.count} /></li>
                      <li>Предварительный итог: <span><strong>{elem.subPrice}</strong></span></li>
                      <li><Button variant="contained" color="secondary" onClick={() => removeProductFromCart(elem.gameId)}>Удалить</Button></li>
                      <hr />
                    </tr>
                })}

              </tbody>
              {cart.games.length > 0 ? (
                <div className="btn_sum">
                  <h4>Общий итог: {calcTotalPrice(cart.games)}</h4>

                  <Link to="/checkout"><button className="btn_click">Купить</button></Link>
                </div>

              )
                :
                (
                  <div className="btn_sum">
                    <div>В Вашей корзине пусто</div>
                    <Link to="/store"><Button>перейти к покупкам</Button></Link>
                  </div>

                )}
            </table>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);