import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ✅ 環境に応じた API ベースURL
    const apiBase = import.meta.env.PROD
        ? "https://startup.lifehackjournal.click"
        : "";

    const handleRegister = async () => {
        if (!userName.trim() || !password.trim()) return;

        try {
            const res = await fetch(`${apiBase}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.error || "Registration failed");
                return;
            }

            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center py-5">
            <header className="text-center mb-4">
                <h1 className="text-primary fw-bold">Register</h1>
            </header>

            <Container className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "400px", width: "90%" }}>
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
                    <Button variant="primary" className="w-100" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>
                <p className="mt-3">
                    Already have an account?{" "}
                    <a href="/login" className="text-decoration-none text-success">
                        Back to Login
                    </a>
                </p>
            </Container>
        </div>
    );

}
