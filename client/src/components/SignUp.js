import React, { useRef, useState} from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import './Authorisation.css'

const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Пароли не совпадают')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(error){
            console.log(error);
            setError('Не получилось создать аккаунт')
        }
        setLoading(false)
    }
    return (
        <div className="authorisation-hero">
            <Card className="authorisation-card">
                <Card.Body>
                    <h2 className="text-center mb-3">Зарегистрироваться</h2>
                    {currentUser ? (<div>
                        <p>{currentUser.email}, Вы уже авторизованы</p>
                        <Button onClick={logout} disabled={loading} className="w-100 btn-danger">Выйти из аккаунта</Button>
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
                Уже зарегистрированы? <Link exact to="/login">Авторизоваться</Link>
            </div>
        </div>
    );
};

export default SignUp;