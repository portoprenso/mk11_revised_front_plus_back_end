import React, { SyntheticEvent, useRef, useState} from 'react';
import { useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'
import { destroyToken, getDecodedToken, registration } from '../helpers/functions';
import { GET_CURRENT_USER } from '../types/authTypes';
import './Authorisation.css'

const mapStateToProps = (state: any) => {
    return {
        user: state.authReducer.user
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    checkGetDecodedToken: async() => {
        const data = await getDecodedToken()
        if(!data){
            dispatch({
                type: GET_CURRENT_USER,
                payload: null
            })
        }
        if(data){
            dispatch({
                type: GET_CURRENT_USER,
                payload: data
            })
        }
    },
});

const SignUp = (store: any) => {
    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const passwordConfirmRef = useRef<any>(null)
    // const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { user, checkGetDecodedToken } = store

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Пароли не совпадают')
        }
        try {
            setError('')
            setLoading(true)
            let data = await registration(emailRef.current.value, passwordRef.current.value)
            console.log(data)
            history.push('/')
        } catch(error){
            console.log(error);
            setError('Не получилось создать аккаунт')
        }
        setLoading(false)
    }

    useEffect(() => {
        checkGetDecodedToken()
    }, [])

    return (
        <div className="authorisation-hero">
            <Card className="authorisation-card">
                <Card.Body>
                    <h2 className="text-center mb-3">Зарегистрироваться</h2>
                    {user ? (<div>
                        <p>{user.email}, Вы уже авторизованы</p>
                        <Button onClick={destroyToken} disabled={loading} className="w-100 btn-danger">Выйти из аккаунта</Button>
                        </div>) : (<></>)}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Введите ещё раз</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn-warning" type="submit">Зарегистрироваться</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Уже зарегистрированы? <Link to="/login">Авторизоваться</Link>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);