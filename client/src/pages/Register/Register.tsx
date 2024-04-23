import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { userSignup } from "../../store/reducer/authReducer";
import { useDispatch } from "react-redux";



function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/signup", {
        username,
        email,
        password,
      });

      if(res.data){
        dispatch(userSignup(res.data))
        localStorage.setItem('userData', JSON.stringify(res.data));
            navigate("/");
      }

    } catch (err) {
      setError(err?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input required name="username" type="text" placeholder="Username" />
          <input required name="email" type="text" placeholder="Email" />
          <input  required name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;