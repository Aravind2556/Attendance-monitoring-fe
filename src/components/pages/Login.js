import React, { useState, useContext } from "react";
import { DContext } from "../../context/Datacontext";
import LoginImg from "../../assets/face-recognition-personal-identification-collage.jpg";

const Login = () => {
    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("All fields are required!");
            return;
        }

        try {
            const res = await fetch(`${BeURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                setIsAuth(true);
                setCurrentUser(data.user);
                window.location.href = "/";
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Server error. Try again later!");
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2">

                {/* LEFT PANEL */}
                <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <h1 className="text-4xl font-bold mb-4">WELCOME</h1>
                    <p className="text-sm opacity-90 leading-relaxed">
                        Login to access your dashboard and manage your application smoothly.
                    </p>

                    <img
                        src={LoginImg}
                        alt="login visual"
                        className="mt-10 rounded-xl shadow-lg"
                    />
                </div>

                {/* RIGHT PANEL */}
                <div className="p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Enter your credentials to continue
                    </p>

                    <form className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={HandleLogin}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:opacity-90 transition"
                        >
                            Sign In
                        </button>

                        {/* Register */}
                        {/* <p className="text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <a
                                href="/register"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Sign up
                            </a>
                        </p> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
