import React, { useContext } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
const SignUp = () => {

    const { createUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
        createUser(email, password)
        .then((userCredential) => {
            console.log(userCredential);
            const users = {
                name: name,
                email: email,
                password: password,
                uid: userCredential.user.uid
            }
            axios.post('http://localhost:5000/users', users)
            .then((res) => {
                console.log( res.data.result );
                if( res.data.result.acknowledged ) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Account is created successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });

    }

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content lg:flex-row-reverse w-[40%]">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h2 className='text-3xl font-bold text-center py-4'>Sign In</h2>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="name" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
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
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default SignUp