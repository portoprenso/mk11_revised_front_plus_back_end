import React, {useState, Cards } from 'react';
import './Buy.css'
import Card from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import {Link} from 'react-router-dom'
import { useProducts } from '../../../../contexts/ProductsContext';
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';


const Buy = (props) => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    const { removeAllProductsFromCart } = useProducts()

    function clearCart(history){
        removeAllProductsFromCart()
        history.push('/')
    }
    
    return (
        <>
        <Header />
        <div className="card__container">
        <div className="plastic-card">
            <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
            />
            <form className="card__inputs">
                <input
                    className="card__input"
                    type='tel'
                    name='number'
                    placeholder='Card Number'
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <input
                    className="card__input"
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <input
                    className="card__input"
                    type='tel   '
                    name='expiry'
                    placeholder='MM/YY'
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <input
                    className="card__input"
                    type='tel'
                    name='cvc'
                    placeholder='CVC'
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
               
                <Link to="/Thank">
                <button onClick={() => clearCart(props.history)} className="card__btn">Buy</button>
                
                    </Link> 
            </form>
        </div>
        </div>
        <Footer />
        </>
    );
};


export default Buy;