import React, { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");

  const speak = () => {
    if (text.trim() === "") return;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-2xl shadow-md">
      <textarea
        className="w-full p-2 border rounded-xl"
        rows="4"
        placeholder="Type something to speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={speak}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
      >
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
