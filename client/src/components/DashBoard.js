import React, {useState} from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


const DashBoard = () => {
    const { receiveCookie, createCookie, setCookie } = useAuth()
    console.log(createCookie)
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch(error) {
            console.log(error);
            setError('Failed to log out')
        }
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Мой профиль</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
            <button onClick={receiveCookie}>Receive Cookie</button>
            <button onClick={() => setCookie()}>Create Cookie</button>
        </>
    );
};

export default DashBoard;