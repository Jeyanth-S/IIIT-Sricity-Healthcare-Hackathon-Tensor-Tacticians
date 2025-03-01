import { useNavigate } from "react-router-dom";
import "./home.css";
import videoBg from "./medii.mp4"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
    <video autoPlay muted loop className="background-video">
      <source src={videoBg} type="video/mp4" />
    </video>

      <div className="main-content">
        <div className="left-box" onClick={() => navigate("/speech-to-text")}>
          <h2>Speech to Text</h2>
          <button>Start</button>
        </div>

        <div className="right-box" onClick={() => navigate("/document-upload")}>
          <h2>Upload Document</h2>
          <button>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
