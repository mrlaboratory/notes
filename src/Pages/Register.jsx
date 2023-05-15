import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Register = () => {

    const { createUser, user, signInWithgoogle, JWTToken} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()


    const from = location?.state?.from.pathname || '/'
    const signinWithGoogleHandle = () => {
        signInWithgoogle()
            .then(res => {
                console.log(res.user)
                const loggedUser = {
                    email: res.user.email
                }
                JWTToken(loggedUser)
            }
            )
            .catch(e => console.log(e))
    }

    const handleRegister = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        console.log(name, email, password)
        createUser(email, password)
            .then(res => console.log(res.user))
            .catch(e => console.log(e))
    }
    if (user) {
        navigate(from, { replace: true })
    }
    return (
        <div>
            <h2 className='text-center font-bold text-3xl'>Please create a new account !!</h2>


            <div className='flex justify-center'>
                <form onSubmit={handleRegister} className='w-full md:w-[500px] p-10'>
                    <input required type="text" name='name' placeholder="Your name " className="input input-bordered w-full mt-3" />
                    <input required type="email" name='email' placeholder="Your email " className="input input-bordered w-full mt-3" />
                    <input required type="pasword" name='password' placeholder="Your Password " className="input input-bordered w-full mt-3" />
                    <div className='my-2 text-center font-bold '>
                        <Link to='/login'>You have account ? </Link>
                    </div>
                    <button type='submit' className='btn w-full mt-3'>Create acccount</button>
                    <button onClick={signinWithGoogleHandle} type='button' className='btn w-full mt-3'>Login with Google</button>

                </form>
            </div>
        </div>
    );
};

export default Register;