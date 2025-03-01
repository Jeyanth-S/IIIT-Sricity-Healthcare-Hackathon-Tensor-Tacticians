// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Insights.css";
// import { pdfjs } from "react-pdf";
// import mammoth from "mammoth";

// const ASSEMBLYAI_API_KEY = process.env.REACT_APP_ASSEMBLYAI_API_KEY; // Move API key to .env

// function Insights() {
//   const [file, setFile] = useState(null);
//   const [insights, setInsights] = useState("");
//   const [transcription, setTranscription] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);

//   const handleFileUpload = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const transcribeAudio = async () => {
//     if (!file && !recording) return;
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("audio", file || recording);

//     try {
//       // Upload the audio file
//       const uploadResponse = await axios.post(
//         "https://api.assemblyai.com/v2/upload",
//         formData,
//         { headers: { Authorization: ASSEMBLYAI_API_KEY } }
//       );
//       const audioUrl = uploadResponse.data.upload_url;

//       // Request transcription
//       const transcriptResponse = await axios.post(
//         "https://api.assemblyai.com/v2/transcript",
//         { audio_url: audioUrl },
//         { headers: { Authorization: ASSEMBLYAI_API_KEY } }
//       );

//       let transcriptId = transcriptResponse.data.id;
//       let transcriptData;

//       // Polling for the transcript result
//       while (true) {
//         await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before checking
//         const checkResponse = await axios.get(
//           `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//           { headers: { Authorization: ASSEMBLYAI_API_KEY } }
//         );

//         transcriptData = checkResponse.data;
//         if (transcriptData.status === "completed") {
//           setTranscription(transcriptData.text);
//           break;
//         } else if (transcriptData.status === "failed") {
//           console.error("Transcription failed");
//           setIsLoading(false);
//           return;
//         }
//       }

//       setIsLoading(false);
//       analyzeText(transcriptData.text);
//     } catch (error) {
//       console.error("Error transcribing audio:", error);
//       setIsLoading(false);
//     }
//   };

//   const analyzeText = async (text) => {
//     try {
//       const response = await axios.post("YOUR_GENAI_NLP_API_ENDPOINT", { text });
//       setInsights(response.data.insights);
//     } catch (error) {
//       console.error("Error fetching insights", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       let audioChunks = [];

//       recorder.ondataavailable = (event) => {
//         audioChunks.push(event.data);
//       };

//       recorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//         setRecording(audioBlob);
//       };

//       recorder.start();
//       setTimeout(() => recorder.stop(), 5000);
//     } catch (error) {
//       console.error("Error recording audio:", error);
//     }
//   };

//   const processDocument = async () => {
//     if (!file) return;
//     setIsLoading(true);

//     try {
//       if (file.type === "text/plain") {
//         const text = await file.text();
//         setTranscription(text);
//         analyzeText(text);
//       } else if (file.type === "application/pdf") {
//         const reader = new FileReader();
//         reader.onload = async () => {
//           const typedArray = new Uint8Array(reader.result);
//           const pdf = await pdfjs.getDocument(typedArray).promise;
//           let text = "";
//           for (let i = 1; i <= pdf.numPages; i++) {
//             const page = await pdf.getPage(i);
//             const content = await page.getTextContent();
//             text += content.items.map((item) => item.str).join(" ") + " ";
//           }
//           setTranscription(text);
//           analyzeText(text);
//         };
//         reader.readAsArrayBuffer(file);
//       } else if (
//         file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//       ) {
//         const reader = new FileReader();
//         reader.onload = async (event) => {
//           const text = await mammoth.extractRawText({
//             arrayBuffer: event.target.result,
//           });
//           setTranscription(text.value);
//           analyzeText(text.value);
//         };
//         reader.readAsArrayBuffer(file);
//       }
//     } catch (error) {
//       console.error("Error processing document:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="insights-container">
//       <h2>Upload or Record Patient Record</h2>
//       <input type="file" accept="audio/*, .txt, .pdf, .docx" onChange={handleFileUpload} />
//       <button onClick={startRecording}>Record Voice</button>
//       <button onClick={transcribeAudio} disabled={(!file && !recording) || isLoading}>
//         {isLoading ? "Processing..." : "Transcribe & Analyze"}
//       </button>
//       <button onClick={processDocument} disabled={!file || isLoading}>
//         {isLoading ? "Processing..." : "Process Document"}
//       </button>

//       <h3>Transcription:</h3>
//       <p>{transcription || "No transcription yet"}</p>

//       <h3>Insights:</h3>
//       <p>{insights || "No insights yet"}</p>
//     </div>
//   );
// }

// export default Insights;



// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Insights.css";
// import { pdfjs } from "react-pdf";
// import mammoth from "mammoth";

// const ASSEMBLYAI_API_KEY = process.env.REACT_APP_ASSEMBLYAI_API_KEY; // Ensure this is set in .env

// function Insights() {
//   const [file, setFile] = useState(null);
//   const [transcription, setTranscription] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);

//   // Handles file upload (audio, txt, pdf, docx)
//   const handleFileUpload = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // Function to transcribe speech using AssemblyAI
//   const transcribeAudio = async () => {
//     if (!file && !recording) return;
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("audio", file || recording);

//     try {
//       // Step 1: Upload the audio file
//       const uploadResponse = await axios.post(
//         "https://api.assemblyai.com/v2/upload",
//         formData,
//         { headers: { Authorization: ASSEMBLYAI_API_KEY } }
//       );
//       const audioUrl = uploadResponse.data.upload_url;

//       // Step 2: Request transcription
//       const transcriptResponse = await axios.post(
//         "https://api.assemblyai.com/v2/transcript",
//         { audio_url: audioUrl },
//         { headers: { Authorization: ASSEMBLYAI_API_KEY } }
//       );

//       let transcriptId = transcriptResponse.data.id;

//       // Step 3: Poll for transcription result
//       let transcriptData;
//       while (true) {
//         await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5s before checking
//         const checkResponse = await axios.get(
//           `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//           { headers: { Authorization: ASSEMBLYAI_API_KEY } }
//         );

//         transcriptData = checkResponse.data;
//         if (transcriptData.status === "completed") {
//           setTranscription(transcriptData.text);
//           break;
//         } else if (transcriptData.status === "failed") {
//           console.error("Transcription failed");
//           setIsLoading(false);
//           return;
//         }
//       }

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error transcribing audio:", error);
//       setIsLoading(false);
//     }
//   };

//   // Function to start recording audio
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       setAudioChunks([]);

//       recorder.ondataavailable = (event) => {
//         setAudioChunks((prev) => [...prev, event.data]);
//       };

//       recorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//         setRecording(audioBlob);
//       };

//       recorder.start();
//       setTimeout(() => recorder.stop(), 5000); // Record for 5 seconds
//     } catch (error) {
//       console.error("Error recording audio:", error);
//     }
//   };

//   return (
//     <div className="insights-container">
//       <h2>Upload or Record Patient Speech</h2>
//       <input type="file" accept="audio/*" onChange={handleFileUpload} />
//       <button onClick={startRecording}>Record Voice</button>
//       <button onClick={transcribeAudio} disabled={(!file && !recording) || isLoading}>
//         {isLoading ? "Processing..." : "Transcribe"}
//       </button>

//       <h3>Transcription:</h3>
//       <p>{transcription || "No transcription yet"}</p>
//     </div>
//   );
// }

// export default Insights;








// import React, { useState, useEffect, useRef } from "react";

// function Insights() {
//   const [transcription, setTranscription] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const recognitionRef = useRef(null); // Store recognition instance

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.");
//       return;
//     }

//     recognitionRef.current = new window.webkitSpeechRecognition();
//     recognitionRef.current.continuous = false; // Stop after one speech input
//     recognitionRef.current.interimResults = false;
//     recognitionRef.current.lang = "en-US";

//     recognitionRef.current.onresult = (event) => {
//       setTranscription(event.results[0][0].transcript); // Get final transcript
//     };

//     recognitionRef.current.onend = () => {
//       setIsRecording(false); // Allow re-recording
//     };

//     recognitionRef.current.onerror = (event) => {
//       console.error("Speech recognition error:", event);
//       setIsRecording(false);
//     };
//   }, []);

//   const startRecording = () => {
//     if (recognitionRef.current) {
//       setIsRecording(true);
//       recognitionRef.current.start();
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   return (
//     <div className="insights-container">
//       <h2>Speech-to-Text (Without API)</h2>
//       <button onClick={startRecording} disabled={isRecording}>
//         {isRecording ? "Recording..." : "Start Recording"}
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>

//       <h3>Transcription:</h3>
//       <p>{transcription || "No transcription yet"}</p>
//     </div>
//   );
// }

// export default Insights;





import React, { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import mammoth from "mammoth";

function Insights() {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser. Please use Chrome.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      setTranscription(event.results[0][0].transcript);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setIsRecording(false);
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const text = await file.text();
      setTranscription(text);
    } else if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + " ";
        }
        setTranscription(text);
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = await mammoth.extractRawText({ arrayBuffer: event.target.result });
        setTranscription(text.value);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file format. Please upload a .txt, .pdf, or .docx file.");
    }
  };

  return (
    <div className="insights-container">
      <h2>Speech & Document Processing</h2>

      <input type="file" accept=".txt, .pdf, .docx" onChange={handleFileUpload} />

      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>

      <h3>Transcription Output:</h3>
      <p>{transcription || "No transcription yet"}</p>
    </div>
  );
}

export default Insights;
