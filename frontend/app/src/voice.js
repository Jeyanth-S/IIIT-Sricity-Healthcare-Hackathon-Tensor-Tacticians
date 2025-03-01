import { useState, useEffect } from "react";
import "./voice.css";

export default function VoiceToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioChunks([]);
        await processAudioWithAssemblyAI(audioBlob);
      };

      setIsListening(true);
      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopListening = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsListening(false);
    }
  };

  const processAudioWithAssemblyAI = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const response = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
          "Authorization": "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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio_url: "URL_TO_YOUR_AUDIO_FILE"
        }),
      });

      const data = await response.json();
      setText((prevText) => prevText + " " + data.text);
    } catch (error) {
      console.error("Error processing audio with AssemblyAI:", error);
    }
  };

  return (
    <div className="container">
      <h1>🎤 AI-Powered Voice to Text Converter</h1>
      <p>Click the button and start speaking. Your speech will be accurately converted to text using AssemblyAI!</p>
      <div className="button-group">
        <button onClick={startListening} className="record-button" disabled={isListening}>
          {isListening ? "Listening..." : "Start Speaking"}
        </button>
        <button onClick={stopListening} className="stop-button" disabled={!isListening}>
          Stop
        </button>
      </div>
      <div className="text-box">
        <h2>Converted Text:</h2>
        <p>{text || "Your recognized text will appear here..."}</p>
      </div>
    </div>
  );
}
