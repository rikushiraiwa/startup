import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center py-5" style={{ backgroundColor: "#E8F5E9" }}>
            
            {/* ヘッダー */}
            <header className="text-center mb-4">
                <h1 className="text-success fw-bold">Life Hack Journal</h1>
            </header>

            {/* ログインフォームの白いコンテナ */}
            <Container className="bg-white shadow-sm rounded p-4 text-center" style={{ maxWidth: "400px", width: "90%" }}>
                <h2 className="text-success fw-bold">Login</h2>

                {/* フォーム */}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="User Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" className="w-100">Login</Button>
                </Form>

                {/* プレースホルダー */}
                <h2 className="text-success fw-bold mt-4">Placeholder for login page</h2>
            </Container>
        </div>
    );
}
