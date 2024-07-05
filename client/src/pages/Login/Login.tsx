import {  useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../store/reducer/authReducer";

function Login() {


  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const {updateUser} = useContext(AuthContext)


  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
    
      const res = await apiRequest.post("/auth/signin", {
        email,
        password,
      });

      const user = await apiRequest.post("/auth/getSingleUser", { email });

      console.log(user.data)
      
     if(res.data){
      dispatch(userSignIn(user.data))
        navigate("/");
     }
    
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="email"
            required
            minLength={3}
            maxLength={20}
            type="email"
            placeholder="email"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            autoComplete="current-password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;