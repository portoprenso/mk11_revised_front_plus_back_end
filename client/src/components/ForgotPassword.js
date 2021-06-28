import React, { useRef, useState} from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import './Authorisation.css'


const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword, currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Проверьте свою почту и перейдите по ссылке внутри')
        } catch(error){
            console.log(error);
            setError('Не удалось сбросить пароль')
        }
        setLoading(false)
    }
    return (
        <div className="authorisation-hero">
            <Card className="authorisation-card">
                <Card.Body>
                    <h2 className="text-center mb-3">Опа, шо, забыл пороле?</h2>

                    {currentUser ? (<div>
                        <p>{currentUser.email}, ты так то уже авторизован</p>
                        <Button onClick={logout} disabled={loading} className="w-100 btn-danger">Выйти из аккаунта</Button>
                        </div>) : (<></>)}
                    
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Пиши сюда своё мыло</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn-warning" type="submit">Отправить мне 100$ (сбросить пороле)</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/login'>Авторизоваться</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            Desperate for an account? <Link to="/signup">Зарегать свою морду у меня на сайте</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;