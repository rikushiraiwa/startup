import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/api/session", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isLoggedIn) {
                    setUserName(data.userName);
                    setIsLoggedIn(true);
                }
            })
            .catch((err) => console.error("Session check failed:", err));
    }, []);

    const handleLogin = async () => {
        const res = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password }),
        });
    
        if (res.ok) {
            const data = await res.json();
            setUserName(data.userName);
            setIsLoggedIn(true);
            window.location.href = "/home";  // ← リロードで確実に状態反映
        } else {
            alert("Login failed");
        }
    };
    

    // ✅ ログアウト処理（セッション破棄）
    const handleLogout = () => {
        fetch("http://localhost:4000/api/logout", {
            method: "POST",
            credentials: "include",
        })
            .then(() => {
                setUserName("");
                setIsLoggedIn(false);
            })
            .catch((err) => console.error("Logout failed:", err));
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

                        {!isLoggedIn && (
                            <p className="mt-3">
                                Don't have an account?{" "}
                                <a href="/register" className="text-decoration-none text-primary">
                                    Register here
                                </a>
                            </p>
                        )}

                    </>
                )}
            </Container>
        </div>
    );
}
