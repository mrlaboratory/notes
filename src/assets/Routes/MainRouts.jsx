import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import Add from "../../Pages/Add";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path:'/',
        element : <MainLayout></MainLayout>,
        errorElement : <div>Page not found</div>,
        children : [
            {
                path : "/",
                element : <PrivateRoute><Home></Home></PrivateRoute>,
            }, 
            {
                path : '/login', 
                element : <Login></Login>
            }, 
            {
                path : '/register', 
                element : <Register></Register>
            },
            {
                path : '/add', 
                element : <PrivateRoute><Add></Add></PrivateRoute>
            }
        ]
    }
])


export default router