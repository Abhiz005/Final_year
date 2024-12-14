import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ toggleForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };
    try {
      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );
      toast.success("Logged in Successfully");
      localStorage.setItem("Users", JSON.stringify(res.data.user));
      window.location.reload();
    } catch (err) {
      toast.error("Login Failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={toggleForm}>
          ✕
        </button>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button className="auth-button">Login</button>
          <p className="switch-link" onClick={toggleForm}>
            Don't have an account? Signup
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
