import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [ehrData, setEhrData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognition = new window.webkitSpeechRecognition(); // Web Speech API

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  // Start speech recognition
  const startRecording = () => {
    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  // Send text to Flask API
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/process_text", { text });
      setEhrData(response.data);
    } catch (error) {
      console.error("Error fetching EHR data:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Doctor's Speech to EHR</h1>
      
      <textarea
        rows="4"
        style={{ width: "80%", padding: "10px", marginTop: "10px" }}
        placeholder="Transcribed text will appear here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <br />
      <button onClick={startRecording} disabled={isRecording} style={{ margin: "5px", padding: "10px" }}>
        🎤 {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <button onClick={stopRecording} disabled={!isRecording} style={{ margin: "5px", padding: "10px" }}>
        ⏹ Stop
      </button>
      <button onClick={handleSubmit} disabled={!text} style={{ margin: "5px", padding: "10px" }}>
        ➡ Convert to EHR
      </button>

      {ehrData && (
        <div style={{ marginTop: "20px", textAlign: "left", padding: "10px", border: "1px solid #ddd" }}>
          <h2>Extracted EHR Data:</h2>
          <pre>{JSON.stringify(ehrData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
