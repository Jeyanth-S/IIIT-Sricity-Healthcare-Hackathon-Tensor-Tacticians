import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SpeechToText from "./SpeechToText";
import DocumentUpload from "./DocumentUpload";
import Header from "./Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speech-to-text" element={<SpeechToText />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
