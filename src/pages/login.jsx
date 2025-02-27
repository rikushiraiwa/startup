import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        if (!userName.trim() || !password.trim()) return;

        localStorage.setItem("userName", userName);
        setIsLoggedIn(true);
        setPassword("");
    };

    const handleLogout = () => {
        localStorage.removeItem("userName");
        setUserName("");
        setIsLoggedIn(false);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center py-5" style={{ backgroundColor: "#E8F5E9" }}>
            
            <header className="text-center mb-4">
                <h1 className="text-success fw-bold">Life Hack Journal</h1>
            </header>

            <Container className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "400px", width: "90%" }}>
                {isLoggedIn ? (
                    <>
                        <h2 className="text-success fw-bold">Welcome, {userName}!</h2>
                        <Button variant="danger" className="w-100 mt-3" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <h2 className="text-success fw-bold">Login</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="User Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="success" className="w-100" onClick={handleLogin}>
                                Login
                            </Button>
                        </Form>
                    </>
                )}
            </Container>
        </div>
    );
}
