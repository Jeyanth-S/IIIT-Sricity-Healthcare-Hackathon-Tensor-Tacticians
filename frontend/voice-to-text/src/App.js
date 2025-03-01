// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Banner />
//       <Services />
//       <Doctors />
//       <Partners />
//       <Facilities />
//       <Testimonials />
//       <Footer />
//     </>
//   );
// }


// export default App;






// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';
// import { useState } from 'react';

// function App() {
//   const [text, setText] = useState('');

//   const speak = () => {
//     if (text.trim() === '') return;
//     const speech = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(speech);
//   };

//   return (
//     <>
//       <Navbar />
//       <Banner />
//       <Services />
//       <Doctors />
//       <Partners />
//       <Facilities />
//       <Testimonials />
//       <div className="text-to-speech p-4 bg-gray-100 rounded-2xl shadow-md m-4">
//         <textarea
//           className="w-full p-2 border rounded-xl"
//           rows="4"
//           placeholder="Type something to speak..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button
//           onClick={speak}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
//         >
//           Speak
//         </button>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;




// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';
// import { useState } from 'react';

// function App() {
//   const [text, setText] = useState('');

//   const speak = () => {
//     if (text.trim() === '') return;
//     const speech = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(speech);
//   };

//   const startListening = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setText(transcript);
//     };
//     recognition.start();
//   };

//   return (
//     <>
//       <Navbar />
//       <Banner />
//       <Services />
//       <Doctors />
//       <Partners />
//       <Facilities />
//       <Testimonials />
//       <div className="text-to-speech p-4 bg-gray-100 rounded-2xl shadow-md m-4">
//         <textarea
//           className="w-full p-2 border rounded-xl"
//           rows="4"
//           placeholder="Type something to speak..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button
//           onClick={speak}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
//         >
//           Speak
//         </button>
//       </div>
//       <button
//         onClick={startListening}
//         className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
//       >
//         🎙️ Speak
//       </button>
//       <Footer />
//     </>
//   );
// }

// export default App;




// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();

// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = 'en-US';

// function App() {
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState('');
//   const [savedNotes, setSavedNotes] = useState([]);

//   useEffect(() => {
//     handleListen();
//   }, [isListening]);

//   const handleListen = () => {
//     if (isListening) {
//       mic.start();
//       mic.onend = () => {
//         console.log('continue..');
//         mic.start();
//       };
//     } else {
//       mic.stop();
//       mic.onend = () => {
//         console.log('Stopped Mic on Click');
//       };
//     }
//     mic.onstart = () => {
//       console.log('Mics on');
//     };

//     mic.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join('');
//       console.log(transcript);
//       setNote(transcript);
//       mic.onerror = (event) => {
//         console.log(event.error);
//       };
//     };
//   };

//   const handleSaveNote = () => {
//     if (note) {
//       setSavedNotes([...savedNotes, note]);
//       setNote('');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Banner />
//       <Services />
//       <Doctors />
//       <Partners />
//       <Facilities />
//       <Testimonials />
//       <div className='voice-notes-container p-4 bg-gray-100 rounded-2xl shadow-md m-4'>
//         <h2>Current Note</h2>
//         {isListening ? <span>🎙</span> : <span>🛑🎙</span>}
//         <button onClick={handleSaveNote} disabled={!note} className='m-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600'>
//           Save Note
//         </button>
//         <button onClick={() => setIsListening((prevState) => !prevState)} className='m-2 px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600'>
//           Start/Stop
//         </button>
//         <p>{note}</p>
//       </div>
//       <div className='saved-notes p-4 bg-gray-100 rounded-2xl shadow-md m-4'>
//         <h2>Notes</h2>
//         {savedNotes.map((n, index) => (
//           <p key={index}>{n}</p>
//         ))}
//       </div>
//       <button
//         onClick={() => setIsListening((prevState) => !prevState)}
//         className='fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600'
//       >
//         🎙️ Speak
//       </button>
//       <Footer />
//     </>
//   );
// }

// export default App;




// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path='/'
//           element={
//             <>
//               <Navbar />
//               <Banner />
//               <Services />
//               <Doctors />
//               <Partners />
//               <Facilities />
//               <Testimonials />
//               <Footer />
//               <Link to='/speech-to-text'>
//                 <button className='fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600'>
//                   🎙️
//                 </button>
//               </Link>
//             </>
//           }
//         />
//         <Route path='/speech-to-text' element={<SpeechToText />} />
//       </Routes>
//     </Router>
//   );
// }

// function SpeechToText() {
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState('');

//   const mic = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//   mic.continuous = true;
//   mic.interimResults = true;
//   mic.lang = 'en-US';

//   useEffect(() => {
//     if (isListening) {
//       mic.start();
//       mic.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join('');
//         setNote(transcript);
//       };
//       mic.onend = () => mic.start();
//     } else {
//       mic.stop();
//     }
//   }, [isListening]);

//   return (
//     <div className='p-4'>
//       <h2>Speech to Text</h2>
//       <button onClick={() => setIsListening(!isListening)} className='m-2 px-4 py-2 bg-blue-500 text-white rounded-2xl'>
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//       <p>{note}</p>
//       <Link to='/'>
//         <button className='mt-4 px-4 py-2 bg-gray-500 text-white rounded-2xl'>Go Back</button>
//       </Link>
//     </div>
//   );
// }

// export default App;





// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path='/'
//           element={
//             <>
//               <Navbar />
//               <Banner />
//               <Services />
//               <Doctors />
//               <Partners />
//               <Facilities />
//               <Testimonials />
//               <Footer />
//               <Link to='/speech-to-text'>
//                 <button className='fixed bottom-4 right-4 p-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600' style={{ width: '80px', height: '80px', fontSize: '32px', position: 'fixed', right: '20px', bottom: '20px', zIndex: 1000 }}>
//                   🎙️
//                 </button>
//               </Link>
//             </>
//           }
//         />
//         <Route path='/speech-to-text' element={<SpeechToText />} />
//       </Routes>
//     </Router>
//   );
// }

// function SpeechToText() {
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState('');

//   const mic = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//   mic.continuous = true;
//   mic.interimResults = true;
//   mic.lang = 'en-US';

//   useEffect(() => {
//     if (isListening) {
//       mic.start();
//       mic.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join('');
//         setNote(transcript);
//       };
//       mic.onend = () => mic.start();
//     } else {
//       mic.stop();
//     }
//   }, [isListening]);

//   return (
//     <div className='p-4'>
//       <h2>Speech to Text</h2>
//       <button onClick={() => setIsListening(!isListening)} className='m-2 px-4 py-2 bg-blue-500 text-white rounded-2xl'>
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//       <p>{note}</p>
//       <Link to='/'>
//         <button className='mt-4 px-4 py-2 bg-gray-500 text-white rounded-2xl'>Go Back</button>
//       </Link>
//     </div>
//   );
// }

// export default App;





// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path='/'
//           element={
//             <>
//               <Navbar />
//               <Banner />
//               <Services />
//               <Doctors />
//               <Partners />
//               <Facilities />
//               <Testimonials />
//               <Footer />
//               <Link to='/speech-to-text'>
//               <button className='fixed p-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600' style={{ width: '80px', height: '80px', fontSize: '32px', position: 'fixed', right: '30px', bottom: '30px', zIndex: 1000, backgroundColor: '#007bff', borderRadius: '50%' }}>
//                   🎙️
//                 </button>
//               </Link>
//             </>
//           }
//         />
//         <Route path='/speech-to-text' element={<SpeechToText />} />
//       </Routes>
//     </Router>
//   );
// }

// function SpeechToText() {
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState('');

//   const mic = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//   mic.continuous = true;
//   mic.interimResults = true;
//   mic.lang = 'en-US';

//   useEffect(() => {
//     if (isListening) {
//       mic.start();
//       mic.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join('');
//         setNote(transcript);
//       };
//       mic.onend = () => mic.start();
//     } else {
//       mic.stop();
//     }
//   }, [isListening]);

//   return (
//     <div className='p-4'>
//       <h2>Speech to Text</h2>
//       <button onClick={() => setIsListening(!isListening)} className='m-2 px-4 py-2 bg-blue-500 text-white rounded-2xl'>
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//       <p>{note}</p>
//       <Link to='/'>
//         <button className='mt-4 px-4 py-2 bg-gray-500 text-white rounded-2xl'>Go Back</button>
//       </Link>
//     </div>
//   );
// }

// export default App;




// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Banner from './components/banner/Banner';
// import Doctors from './components/doctors/Doctors';
// import Facilities from './components/facilities/Facilities';
// import Footer from './components/footer/Footer';
// import Navbar from './components/navbar/Navbar';
// import Partners from './components/partners/Partners';
// import Services from './components/services/Services';
// import Testimonials from './components/testimonials/Testimonials';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path='/'
//           element={
//             <>
//               <Navbar />
//               <Banner />
//               <Services />
//               <Doctors />
//               <Partners />
//               <Facilities />
//               <Testimonials />
//               <Footer />
//               <Link to='/speech-to-text'>
//                 <button className='fixed p-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600' style={{ width: '80px', height: '80px', fontSize: '32px', position: 'fixed', right: '30px', bottom: '30px', zIndex: 1000, backgroundColor: '#007bff', borderRadius: '50%' }}>
//                   🎙️
//                 </button>
//               </Link>
//             </>
//           }
//         />
//         <Route path='/speech-to-text' element={<SpeechToText />} />
//       </Routes>
//     </Router>
//   );
// }

// function SpeechToText() {
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState('');

//   const mic = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//   mic.continuous = true;
//   mic.interimResults = true;
//   mic.lang = 'en-US';

//   useEffect(() => {
//     if (isListening) {
//       mic.start();
//       mic.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join('');
//         setNote(transcript);
//       };
//       mic.onend = () => mic.start();
//     } else {
//       mic.stop();
//     }
//   }, [isListening]);

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
//       <h2 className='text-3xl font-bold mb-4 text-blue-600'>Speech to Text</h2>
//       <div className='bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center'>
//         <button
//           onClick={() => setIsListening(!isListening)}
//           className={`p-4 text-white rounded-full shadow-lg transition-all ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
//           style={{ width: '80px', height: '80px', fontSize: '32px' }}
//         >
//           {isListening ? '🛑' : '🎙️'}
//         </button>
//         <p className='mt-4 text-lg text-gray-700'>{note || 'Your speech will appear here...'}</p>
//       </div>
//       <Link to='/'>
//         <button className='mt-6 px-6 py-2 bg-gray-500 text-white rounded-2xl shadow-md hover:bg-gray-600'>Go Back</button>
//       </Link>
//     </div>
//   );
// }

// export default App;




import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import Banner from './components/banner/Banner';
import Doctors from './components/doctors/Doctors';
import Facilities from './components/facilities/Facilities';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Partners from './components/partners/Partners';
import Services from './components/services/Services';
import Testimonials from './components/testimonials/Testimonials';
import SpeechToText from './components/SpeechToText/SpeechToText';
import DocumentUpload from './components/backup/components/DocumentUpload';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Banner />
              <Services />
              <Doctors />
              <Partners />
              <Facilities />
              <Testimonials />
              <Footer />
              <DocumentUpload />
              <Link to='/SpeechToText'>
                <button className='fixed p-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600' style={{ width: '80px', height: '80px', fontSize: '32px', position: 'fixed', right: '30px', bottom: '30px', zIndex: 1000, backgroundColor: '#007bff', borderRadius: '50%' }}>
                  🎙️
                </button>
              </Link>
            </>
          }
        />
        <Route path='/SpeechToText' element={<SpeechToText />} />
      </Routes>
    </Router>
  );
}

export default App;
