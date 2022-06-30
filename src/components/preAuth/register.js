import "./userAuth.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../fetchDB/fetchDB";
import { useTask } from "../../taskContext";

export default function Register() {
  const { isAuthenticated, setToken } = useTask();

  const [{ newUsername, newEmail, newPassword }, setFormState] = useState({
    newUsername: "",
    newEmail: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!newUsername || !newEmail || !newPassword)
        return toast.error("Fill all the fields", {
          position: "top-center",
          closeOnClick: true,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 2000,
        });
      const res = await registerUser({ newUsername, newEmail, newPassword });
      const { token, error } = res;
      if (token) {
        localStorage.setItem("token", token);
        return setToken(token);
      }
      if (error)
        return toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "colored",
        });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  if (isAuthenticated) return <Navigate to={"../auth/alltasks"} />;
  else
    return (
      <div className="registerWrapper">
        <h1 className="registerTitle">Register</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="infoWrapper">
            <div className="registerLabelWrapper">
              <label htmlFor="username">Your username </label>
              <label htmlFor="email">Your e-mail </label>
              <label htmlFor="password">Your password </label>
            </div>
            <div className="registerInputWrapper">
              <input
                type="text"
                name="newUsername"
                id="newUsername"
                placeholder="Username"
                value={newUsername}
                onChange={handleChange}
              />
              <input
                type="text"
                name="newEmail"
                id="newEmail"
                placeholder="E-mail"
                value={newEmail}
                onChange={handleChange}
              />
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Password"
                value={newPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="mainButton largeButton">
            Register
          </button>
        </form>
        <span className="changeAuth">
          Already have an account?
          <button
            className="fadedButton smallButton"
            onClick={() => setTimeout(() => navigate("/login"), 150)}
          >
            Log in
          </button>
        </span>
        <ToastContainer />
      </div>
    );
}
