import React from 'react';
import errorImg from "../../assets/error-image.png"
import { Link, useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <section className='min-h-screen flex flex-col justify-center items-center'>
            <div className='max-w-[1300px] mx-auto py-20 text-center'>
                <img src={errorImg} />
                <h2 className='text-3xl font-semibold'>Oops! The page you are looking for is not found</h2>
                <div className='flex items-center justify-center mt-10 gap-10'>
                    <Link onClick={() => navigate(-1)} className="btn border-0 text-base-100 bg-base-content text-base p-[13px_24px]! h-auto! rounded-[60px] shadow-none flex gap-3 items-center hover:text-white hover:bg-primary"> Go back </Link>
                    <Link to="/" className="btn border-0 text-base-200-content bg-base-300 p-[13px_24px]! text-md h-auto! rounded-[60px] shadow-none flex gap-3 items-center hover:text-white hover:bg-primary"> Homepage </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;