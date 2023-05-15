import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {

    const {signInWithgoogle, loginUser, user, JWTToken}  = useContext(AuthContext)
    const signinWithGoogleHandle = () => {
        signInWithgoogle()
        .then(res => {
            toast.success('Login successfull')
            console.log(res.user)
            const loggedUser = {
                email: res.user.email

            }
            JWTToken(loggedUser)
        })
        .catch(e => console.log(e))
    }

    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from.pathname || '/'
    console.log(location)

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target 
        const email = form.email.value 
        const password = form.password.value 
        console.log(email,password)
        loginUser(email,password)
        .then(res => {
            toast.success('Login successfull')
            console.log(res.user)
            const loggedUser = {
                email: res.user.email

            }
            JWTToken(loggedUser)
        })
        .catch(e => console.log(e))

    }
    if(user){
        navigate(from, {replace:true })
    }

    return (
        <div>
            <h2 className='text-center font-bold text-3xl'>Please login !!</h2>


            <div className='flex justify-center'>
            <form onSubmit={handleLogin}  className='w-full md:w-[500px] p-10'>
            <input type="email" name='email' placeholder="Your email " className="input input-bordered w-full mt-3" />
            <input name='password' type="pasword" placeholder="Your Password " className="input input-bordered w-full mt-3" />
            <div className='my-2 text-center font-bold '>
                <Link to='/register'>Create Account</Link>
            </div>
            <button className='btn w-full mt-3'>Login</button>

           

            <button onClick={signinWithGoogleHandle} type='button' className='btn w-full mt-3'>Login with Google</button>
            </form>
            </div>
        </div>
    );
};

export default Login;