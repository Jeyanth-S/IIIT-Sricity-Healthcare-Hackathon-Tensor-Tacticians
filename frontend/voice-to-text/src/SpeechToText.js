import React, { useState, useEffect } from "react";
import "./SpeechToText.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      if (mic.state !== "running") {
        mic.start();
        console.log("Mic started");
      }
    } else {
      mic.stop();
      console.log("Mic stopped");
    }
  
    mic.onstart = () => console.log("Mic is active");
  
    mic.onend = () => {
      console.log("Mic stopped");
      if (isListening) {
        mic.start(); // Restart only if still listening
      }
    };
  
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setNote(transcript);
    };
  
    mic.onerror = (event) => console.log("Mic Error: ", event.error);
  };
  

  const handleSaveNote = () => {
    if (note.trim() !== "") {
      setSavedNotes([...savedNotes, note]);
      setNote("");
    }
  };

  const handleConvertToEHR = () => {
    alert("EHR conversion feature coming soon!");
  };

  return (
    <div className="speech-container">
      <h1>Speech-to-Text Converter</h1>

      <div className="speech-box">
        <h2>Live Transcription</h2>
        <div className="mic-status">
          {isListening ? <span className="mic-on">🎙 Recording...</span> : <span className="mic-off">🛑 Mic Off</span>}
        </div>

        {/* Editable Textarea for Transcription */}
        <textarea
          className="transcription-box"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Start speaking..."
        />

        <div className="button-group">
          <button onClick={handleSaveNote} disabled={!note} className="save-btn">
            Save Note
          </button>
          <button onClick={handleConvertToEHR} disabled={!note} className="ehr-btn">
            Convert to EHR
          </button>
          <button onClick={() => setIsListening(!isListening)} className="toggle-btn">
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>
      </div>

      <div className="notes-box">
        <h2>Saved Notes</h2>
        <div className="notes-list">
          {savedNotes.length > 0 ? (
            savedNotes.map((n, index) => <p key={index} className="note-item">📝 {n}</p>)
          ) : (
            <p className="empty-notes">No saved notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
