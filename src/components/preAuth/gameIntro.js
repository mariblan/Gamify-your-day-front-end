import "./userAuth.css";
import { useNavigate } from "react-router-dom";

export default function GameIntro() {
  const navigate = useNavigate();

  return (
    <div className="introPage" onClick={() => navigate("/login")}>
      <h1>Gamify Your day</h1>
    </div>
  );
}
