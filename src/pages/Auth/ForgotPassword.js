import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name,email,password,phone,address);
        // toast.success('Register Successfully')
        try {
        const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
            { email, newPassword,answer }
        );
        if (res && res.data.success) {
            toast.success(res.data && res.data.message); // backend m jo b ham ne msg set krwaya wo aye ga.
            navigate("/login");
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
    <Layout title={'Forgot Password - Ecommerce App'}>
        <div className="form-container">
        
            <form onSubmit={handleSubmit}>
                <h4>Reset Password</h4>
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
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Favroite Sports Name"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter New Password"
                    required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Reset
                </button>
            </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword
