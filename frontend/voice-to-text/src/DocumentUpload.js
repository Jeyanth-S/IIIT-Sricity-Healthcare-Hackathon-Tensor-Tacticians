import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./DocumentUpload.css";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    extractText(uploadedFile);
  };

  const extractText = (file) => {
    setLoading(true);
    const fileType = file.type;

    if (fileType === "text/plain") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setExtractedText(reader.result);
        setLoading(false);
      };
    } else if (fileType.startsWith("image/")) {
      Tesseract.recognize(file, "eng")
        .then(({ data: { text } }) => {
          setExtractedText(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error extracting text:", error);
          setLoading(false);
        });
    } else {
      alert("Unsupported file type! Upload TXT or Image.");
      setLoading(false);
    }
  };

  const handleEHRConversion = () => {
    alert("EHR Conversion in Progress... (Feature coming soon)");
  };

  return (
    <div className="document-upload-container">
      <video autoPlay muted loop className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="upload-box">
        <h2>Upload a Document</h2>
        <input type="file" accept=".txt, image/*" onChange={handleFileUpload} />

        {loading ? <p className="loading-text">Extracting text...</p> : null}

        {extractedText && (
          <div className="extracted-text-box">
            <h3>Extracted Text:</h3>
            <textarea 
              value={extractedText} 
              onChange={(e) => setExtractedText(e.target.value)} 
              rows="6"
            />
            <button className="ehr-btn" onClick={handleEHRConversion}>
              Convert to EHR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
