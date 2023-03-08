import * as React from 'react';
import { motion } from "framer-motion";

export default function Form() {
    return (
        <div className="bg-white px-10 py-20 rounded-3xl">
            <h1 className='text-5xl font-semibold'>Skimify</h1>
            <div className='mt-3'>
                <p className='font-medium text-lg text-gray-500'>Welcome To Skimify!</p>
                <p className='font-medium text-lg text-gray-500'>Please Login Or Create An Account Today.</p>
            </div>
            <div className="mt-5">
                <div>
                    <label className='text-lg font-medium'>Email</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your email'

                    />
                </div>
                <div>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your password'
                        type='password'
                    />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input
                            type="checkbox"
                            id='remember'
                        />
                        <label className='ml-1 font-med text-base' htmlFor="remember">Remember me</label>
                    </div>
                    <button   className='text-blue-500'>Forgot password</button>
                </div>

                <div className='mt-8 flex flex-col gap-y-4'>
                    <motion.button whileHover={{scale: 1.02}} whileTap={{scale: 0.99}} className='py-4 bg-blue-500 rounded-xl text-white text-lg font-bold'>Sign In</motion.button>
                </div>




            </div>
        </div>

    )
}