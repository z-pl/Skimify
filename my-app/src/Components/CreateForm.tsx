import * as React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export default function CreateForm() {
    return (
        <div className="bg-white px-10 py-20 rounded-3xl">
            <h1 className='text-5xl font-semibold text-center '> Skimify</h1>
            <div className='mt-3 font-medium text-lg text-gray-500'>
                <p >Create an account to get started with Skimify today!</p>
            </div>

        <div className='mt-10'>

            <div>
            <label className='text-lg font-medium'>Email</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your email'

                    />


            </div>

            <div className='mt-3'>


            <label className='text-lg font-medium'>Password</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Create your password'
                        type="password"

                    />
            </div>


            <div className='mt-3'>


            <label className='text-lg font-medium'>Confirm Password</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Confirm your password'
                        type="password"

                    />
            </div>


        </div>


        <div className='mt-8 flex flex-col gap-y-4'>
                    <motion.button whileHover={{scale: 1.02}} whileTap={{scale: 0.99}} className='py-3 bg-blue-500 rounded-xl text-white text-lg font-bold' >
                    <Link to={"/login"}>Create Account</Link>
                    </motion.button>
                </div>




        </div>

    )
}