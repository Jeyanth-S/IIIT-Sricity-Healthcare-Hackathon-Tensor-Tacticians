import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SpeechToText from "./components/SpeechToText";
import DocumentUpload from "./components/DocumentUpload";
import Header from "./components/Header";

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
