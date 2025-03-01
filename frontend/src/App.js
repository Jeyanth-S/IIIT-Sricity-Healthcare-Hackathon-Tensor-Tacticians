import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Hospitality from "./pages/Hospitality";
import Contact from "./pages/Contact";
import Insights from "./pages/Insights";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
//import Logout from "./pages/Logout";
import "./styles/Home.css";
import "./styles/About.css";
import "./styles/Hospitality.css";
import "./styles/Contact.css";
import "./styles/Auth.css";
import "./styles/Insights.css";

const firebaseConfig = {
  apiKey: "AIzaSyBiV4luCZuDc0gChqrq9j7RmKQ69rYn-hg",
  authDomain: "hospital-ehr-ai.firebaseapp.com",
  projectId: "hospital-ehr-ai",
  storageBucket: "hospital-ehr-ai.firebasestorage.app",
  messagingSenderId: "228279733959",
  appId: "1:228279733959:web:e566fafd4eaf5ba76b78e2",
  measurementId: "G-GEG2F3C4XL"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/hospitality" element={<Hospitality />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/Logout"element={<Navigate to="/Logout"/>}/>
        </Routes>
      )}
    </Router>
  );
}

export default App;