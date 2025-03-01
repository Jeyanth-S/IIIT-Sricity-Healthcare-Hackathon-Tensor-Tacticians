import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
