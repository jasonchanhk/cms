import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userDataService from "../services/user-data-service";
import { useForm } from "react-hook-form"

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    
    const onSubmit = data => {
        data.preventDefault();
        userDataService.userLogin(data)
        .then( response => {
            console.log(response)
            if (response.data.error){
                console.log(response.data.error)
            }
            else{
                console.log("Login successful...")
                navigate("/dashboard")
            }
        })
    }
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6"></div>
                <div className="col-6">
                    <h2>Blokbot <br/>content management system</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label for="username" class="form-label">Username</label>
                        <input {...register("username", { required: true })} class="form-control"/>
                        {errors.username && <span>Username required</span>}

                        <label for="password" class="form-label">Password</label>                    
                        <input {...register("password", { required: true })} class="form-control"/>
                        {errors.password && <span>Password required</span>}

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}

export default Login;