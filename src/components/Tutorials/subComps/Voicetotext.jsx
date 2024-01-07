import React, { useState, useEffect, useRef } from 'react';
import "./voicetotext.css"

const VoiceToText = () => {
  const [transcript, setTranscript] = useState('');
  const [speech, setSpeech] = useState(true);
  const recognitionRef = useRef(null);
  const [isModel, setIsModel] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const confirmationMessageTimeoutRef = useRef(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;
      recognitionRef.current.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        setTranscript(transcript);
        console.log(transcript);
      });
    } else {
      setSpeech(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleSpeechRecognition = () => {
    if (speech && recognitionRef.current) {
      recognitionRef.current.start();
      setConfirmationMessage('We are listening to you.');
      scheduleMessageClear();
    }
  };

  const handleModal = () => {
    setIsModel(!isModel);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setConfirmationMessage('Listening stopped.');
      scheduleMessageClear();
    }
  };

  const closemodel = () => {
    setIsModel(false);
    recognitionRef.current.stop();
    setTranscript('');
  };

  const clearText = () => {
    setTranscript('');
    setConfirmationMessage('Text cleared.');
    scheduleMessageClear();
  };

  const copyText = () => {
    const textArea = document.createElement('textarea');
    textArea.value = transcript;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setConfirmationMessage('Text copied to clipboard.');
    scheduleMessageClear();
  };

  const scheduleMessageClear = () => {
    if (confirmationMessageTimeoutRef.current) {
      clearTimeout(confirmationMessageTimeoutRef.current);
    }
    confirmationMessageTimeoutRef.current = setTimeout(() => {
      setConfirmationMessage('');
    }, 2000);
  };

  return (
    <>
      <div>
        <button className="btn-modal" onClick={handleModal}>Voice to Text</button>
      </div>
      {isModel && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-header" style={{ margin: "0", textAlign: "center" }}>
              Listen & Type <span style={{ float: "right" }} onClick={closemodel} className="modal-close-button" >&times;</span>
            </h2>
            <p style={{ textAlign: "center" }}>Simplifying the process of adding steps or notes by effortlessly converting your voice into written content.</p>
            <div className='main-content' name="" id="convert_text" value={transcript} readOnly>{transcript}</div>
            <div className='btn-style'>
              <button onClick={handleSpeechRecognition} id="click_to_record">
                Start Listening
              </button>
              <button onClick={stopListening} id="stop_listening">
                Stop Listening
              </button>
              <button onClick={clearText} id="clear_text">
                Clear Text
              </button>
              <button onClick={copyText} id="copy_text">
                Copy Text
              </button>
            </div>
            <p className="" style={{ margin: "0" }}>{confirmationMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceToText;