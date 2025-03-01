import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import custom styles

const App = () => {
  const [text, setText] = useState("");
  const [ehrData, setEhrData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognition = new window.webkitSpeechRecognition(); // Web Speech API

  // Set options for the speech recognition
  recognition.continuous = false; // Stops recording after a pause
  recognition.interimResults = false; // Only final results
  recognition.lang = "en-US"; // Set language to English

  // Event listeners for the speech recognition
  recognition.onstart = () => {
    console.log("Speech recognition started");
    setIsRecording(true);
  };

  recognition.onend = () => {
    console.log("Speech recognition ended");
    setIsRecording(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    setIsRecording(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);
    setIsRecording(false);
  };

  // Start recording
  const startRecording = () => {
    setText(""); // Clear previous text
    recognition.start();
  };

  // Stop recording
  const stopRecording = () => {
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
    <div className="app-container">
      <h1 className="title">Doctor's Speech to EHR</h1>
      
      <textarea
        rows="4"
        className="input-textarea"
        placeholder="Transcribed text will appear here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="button-container">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`button start-button ${isRecording ? 'recording' : ''}`}
        >
          🎤 {isRecording ? "Recording..." : "Start Recording"}
        </button>
        
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="button stop-button"
        >
          ⏹ Stop
        </button>

        <button
          onClick={handleSubmit}
          disabled={!text}
          className="button submit-button"
        >
          ➡ Convert to EHR
        </button>
      </div>

      {ehrData && (
        <div className="ehr-data">
          <h2 className="ehr-title">Extracted EHR Data:</h2>
          <pre>{JSON.stringify(ehrData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
