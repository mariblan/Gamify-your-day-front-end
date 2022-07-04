import "./userAuth.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../fetchDB/fetchDB";
import { useTask } from "../../taskContext";

export default function Login() {
  const { isAuthenticated, setToken, toastErrorSettings } = useTask();

  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password)
        return toast.error("Please fill in all fields", toastErrorSettings);
      const res = await loginUser({ email, password });
      const { token, error } = res;
      if (token) {
        localStorage.setItem("token", token);
        return setToken(token);
      }
      if (error) return toast.error(error, toastErrorSettings);
      if (email && password) setTimeout(() => navigate("/alltasks"), 150);
    } catch (error) {
      toast.error(
        `I failed to fetch from the DB! ${error.message}`,
        toastErrorSettings
      );
    }
  };

  if (isAuthenticated) return <Navigate to={"../auth/alltasks"} />;
  else
    return (
      <div className="loginWrapper">
        {/* {console.log(email)} */}
        {/* {console.log(password)} */}
        <h1 className="loginTitle">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="infoWrapper">
            <div className="loginLabelWrapper">
              <label htmlFor="email">E-mail </label>
              <label htmlFor="password">Password </label>
            </div>
            <div className="loginInputWrapper">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="mainButton largeButton">Log in</button>
        </form>
        <span className="changeAuth">
          Not registered yet?
          <button
            className="fadedButton smallButton"
            onClick={() => setTimeout(() => navigate("/register"), 150)}
          >
            Register
          </button>
        </span>
      </div>
    );
}
