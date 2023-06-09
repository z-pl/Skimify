import * as React from 'react';
import { motion } from "framer-motion";
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser, loginUser } from '../apis/UserAPI';
import tokenStore from '../mobx/stores/TokenStore';

export default function CreateForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", username: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let isValid = true;
        const newErrors = { email: "", username: "", password: "", confirmPassword: "" };

        if (email.trim() === "" || !validateEmail(email)) {
            newErrors.email = "Please enter a valid email.";
            isValid = false;
        }
        if (username.trim() === "") {
            newErrors.username = "Please enter a username.";
            isValid = false;
        }
        if (password.trim() === "") {
            newErrors.password = "Please enter a password.";
            isValid = false;
        }
        if (confirmPassword.trim() === "" || confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await registerUser({ email: email, username: username, password: password });
            const res2 = await loginUser({ email: email, password: password });

            tokenStore.saveToken(res2.access_token);
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white px-10 py-20 rounded-3xl">
                <h1 className='text-5xl font-semibold text-center '> Skimify</h1>
                <div className='mt-3 font-medium text-lg text-gray-500'>
                    <p>Create an account to get started with Skimify today!</p>
                </div>
                <div className='mt-10'>
                    <div>
                        <label className='text-lg font-medium'>Username</label>
                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Enter your username'
                            onChange={(e) => setUsername(e.target.value)}
                            name="username" />
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </div>
                    <div>
                        <label className='text-lg font-medium'>Email</label>
                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            name="email" />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className='mt-3'>
                        <label className='text-lg font-medium'>Password</label>
                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Create your password'
                            type="password" onChange={(e) => setPassword(e.target.value)}
                            name="password" />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <div className='mt-3'>
                        <label className='text-lg font-medium'>Confirm Password</label>
                        <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Confirm your password'
                            type="password" onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword" />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                    </div>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <motion.button whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        className='py-3 bg-blue-500 rounded-xl text-white text-lg font-bold'
                        type='submit'>
                        {/* <Link to={"/login"}>Create Account</Link> */}
                        Create Account
                    </motion.button>
                </div>
            </div>
        </form>
    )
    };
