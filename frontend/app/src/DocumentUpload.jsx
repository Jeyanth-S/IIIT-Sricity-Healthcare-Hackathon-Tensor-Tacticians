import { useState } from "react";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="page">
      <h1>Upload a Document</h1>
      <input type="file" onChange={handleFileChange} />
      {file && <p>File uploaded: {file.name}</p>}
    </div>
  );
};

export default DocumentUpload;
