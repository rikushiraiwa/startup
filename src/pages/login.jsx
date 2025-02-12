import React from "react";
import "../styles/login.css";

export default function Login() {
    return (
        <div>
            <header>
                <h1>Life Hack Journal</h1>
            </header>

            <main>
                <h2>Login</h2>
                <input type="text" placeholder="User Name" />
                <input type="password" placeholder="Password" />
                <button>Login</button>

                <h2>Placeholder for login page</h2>
            </main>

            <footer>
                <p>&copy; 2025 Life Hack Journal</p>
            </footer>
        </div>
    );
}
