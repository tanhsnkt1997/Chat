import React, { useRef } from "react";
import "./Login.css";
import logoAuth from "../../../public/image/logo_auth.png";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import authActions from "../../../redux/action/index";

export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("vao login");

  const onSubmit = (data) => dispatch(authActions.loginFetch({ username: data.username, password: data.password }));
  return (
    <div className="authentication__login_container">
      <img src={logoAuth} alt="logo_auth" className="authentication__login_container_logo" />
      <span className="authentication__login_container_head_title">Sign in</span>
      <span className="authentication__login_container_title">Sign in to continue to Chatvia.</span>
      <div className="authentication__login_form_container">
        <form className="authentication__login_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="authentication__login_form_wraper">
            <span className="authentication__login_form_userName_title">Username</span>

            <div className="authentication__login_form_input_wraper">
              <div className="authentication__login_form_input_icon">
                <PersonOutlinedIcon className="authentication__login_form_input_icon_style" />
              </div>
              <input {...register("username")} className="authentication__login_form_input" placeholder="Enter the username" />
            </div>
          </div>
          <div className="authentication__login_form_password_container">
            <div className="authentication__login_form_wraper">
              <div className="authentication__login_form_password_block">
                <span className="authentication__login_form_userName_title">Password</span>
                <span className="authentication__login_form_password_block_ttforgot">Forgot Password?</span>
              </div>

              <div className="authentication__login_form_input_wraper">
                <div className="authentication__login_form_input_icon">
                  <LockOutlinedIcon className="authentication__login_form_input_icon_style" />
                </div>
                <input {...register("password")} type="password" className="authentication__login_form_input" placeholder="Enter the password" />
              </div>
            </div>
          </div>

          <div className="authentication__login_form_remember_container">
            <input type="checkbox" defaultChecked={false} onChange={() => {}} className="authentication__login_form_remember_input" />
            <span className="authentication__login_form_remember_title">Remember me</span>
          </div>

          <button type="submit" className="authentication__login_form_btn_signin">
            Sign in
          </button>
        </form>
      </div>
      <div className="authentication__login_footer_box">
        <span className="authentication__login_footer_first">Don't have an account ?</span>
        <Link to={"register"}>
          <span className="authentication__login_footer_second">Signup now</span>
        </Link>
      </div>
      <span className="authentication__login_footer_three">
        © 2021 Chatvia. Crafted with
        <span>
          <FavoriteOutlinedIcon className="authentication__login_footer_three_icon" />
        </span>
        by Themesbrand
      </span>
    </div>
  );
}
