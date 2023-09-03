import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,phone,address);
    // toast.success('Register Successfully')
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message); // backend m jo b ham ne msg set krwaya wo aye ga.
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        // agr location.state m old location h to old location pe redirect kr do.
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>

          <div className="">
            <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
              Forgot Password
            </button>
          </div>
          
        </form>
      </div>
    </Layout>
  );
};

export default Login;
