import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            // Save JWT Token
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            // Save user information (optional)
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful!");

            // Redirect to Dashboard
            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.error || "Login Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "450px" }}
            >

                <h2 className="text-center mb-4">
                    Login
                </h2>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={login}
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;