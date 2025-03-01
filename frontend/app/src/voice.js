import { useState, useEffect } from "react";
import axios from "axios";
import "./voice.css";

export default function VoiceToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const newRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      newRecognition.lang = "en-US";
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      
      newRecognition.onresult = async (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + " ";
          }
        }
        
        if (transcript) {
          const processedText = await processTextWithAPI(transcript);
          setText((prevText) => prevText + " " + processedText);
        }
      };

      newRecognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    } else {
      alert("Your browser does not support speech recognition.");
    }
  }, []);

  const processTextWithAPI = async (inputText) => {
    try {
      const response = await axios.post("https://api.openai.com/v1/completions", {
        model: "gpt-3.5-turbo",
        prompt: `Correct and enhance this text: ${inputText}`,
        max_tokens: 50,
      }, {
        headers: { "Authorization": `Bearer YOUR_OPENAI_API_KEY` }
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error processing text with API:", error);
      return inputText;
    }
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="container">
      <h1>🎤 AI-Powered Voice to Text Converter</h1>
      <p>Click the button and start speaking. Your speech will be accurately converted to text in real-time!</p>
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
