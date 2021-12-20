import React, { useEffect, useContext } from "react";
import logoAuth from "../../../public/image/logo_auth.png";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authActions from "../../../redux/action/index";

import "./Register.css";

export default function Register() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => registerCall({ username: data.username, password: data.password, email: data.email }, dispatch);
  const onSubmit = (data) => dispatch(authActions.asyncFetch({ username: data.username, password: data.password, email: data.email }));

  useEffect(() => {
    // axios.post(`${serverUrl}/api/auth/register`, { username: "tanhsnkt1997", password: "22181176" });
  }, []);
  return (
    <div className="authentication__login_container">
      <img src={logoAuth} alt="logo_auth" className="authentication__login_container_logo" />
      <span className="authentication__login_container_head_title">Sign up</span>
      <span className="authentication__login_container_title">Get your Chatvia account now.</span>
      <div className="authentication__login_form_container">
        <form className="authentication__login_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="authentication__login_form_wraper">
            <span className="authentication__login_form_userName_title">Email</span>
            <div className="authentication__login_form_input_wraper">
              <div className="authentication__login_form_input_icon">
                <MailOutlineOutlinedIcon className="authentication__login_form_input_icon_style" />
              </div>
              <input type="text" className="authentication__login_form_input" placeholder="Enter the email" {...register("email")} />
            </div>
          </div>

          {/*  */}
          <div className="authentication__login_form_wraper">
            <span className="authentication__login_form_userName_title">Username</span>

            <div className="authentication__login_form_input_wraper">
              <div className="authentication__login_form_input_icon">
                <PersonOutlinedIcon className="authentication__login_form_input_icon_style" />
              </div>
              <input type="text" className="authentication__login_form_input" placeholder="Enter the username" {...register("username")} />
            </div>
          </div>
          {/*  */}
          <div className="authentication__login_form_wraper">
            <span className="authentication__login_form_userName_title">Password</span>

            <div className="authentication__login_form_input_wraper">
              <div className="authentication__login_form_input_icon">
                <LockOutlinedIcon className="authentication__login_form_input_icon_style" />
              </div>
              <input type="password" className="authentication__login_form_input" placeholder="Enter the password" {...register("password")} />
            </div>
          </div>
          <button type="submit" className="authentication__login_form_btn_signin">
            Sign in
          </button>
        </form>
      </div>
      <div className="authentication__login_footer_box">
        <span className="authentication__login_footer_first">Already have an account ?</span>
        <Link to={"login"}>
          <span className="authentication__login_footer_second"> Signin</span>
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
