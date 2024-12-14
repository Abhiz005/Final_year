import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";


function Signup({ toggleForm }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo
      );
      toast.success("Signup Successful");
      navigate(from, { replace: true });
      localStorage.setItem("Users", JSON.stringify(res.data.user));
    } catch (err) {
      toast.error("Signup Failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={toggleForm}>
          ✕
        </button>
        <h3>Signup</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" {...register("fullname", { required: true })} />
            {errors.fullname && (
              <span className="error-message">Name is required</span>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <span className="error-message">Email is required</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="error-message">Password is required</span>
            )}
          </div>
          <button className="auth-button">Signup</button>
          <p className="switch-link" onClick={toggleForm}>
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
