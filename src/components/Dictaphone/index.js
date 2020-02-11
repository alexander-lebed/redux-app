// @flow
import React, { useEffect} from "react";
import SpeechRecognition from "react-speech-recognition";

const Dictaphone = ({
    listening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    onSpeach
}) => {
    if (!browserSupportsSpeechRecognition) {
        return null;
    }
    useEffect(() => {
        if (listening) {
            onSpeach(transcript);
        }
    }, [listening, transcript]);
    return (
        <div>
            {listening ? null : (
                <i className='fas fa-microphone' onClick={startListening} />
            )}
            <button onClick={stopListening}>Stop</button>
            {/*<button onClick={resetTranscript}>Reset</button>*/}
            {/*<h1>{transcript}</h1>*/}
        </div>
    );
};

export default SpeechRecognition({autoStart: false, continuous: false})(Dictaphone);