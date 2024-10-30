import React, { useContext } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const LogIn = () => {

    const {signIn} = useContext(AuthContext);

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email  + ' ' + password);
        signIn(email, password)
        .then((userCredential) => {
            const newUser = { email };
            //post request to server with axios 
            axios.post('http://localhost:5000/jwt', newUser, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content lg:flex-row-reverse w-[40%]">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h2 className='text-3xl font-bold text-center py-4'>Log In</h2>
                    <form className="card-body" onSubmit={handleLogIn}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Log In" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn