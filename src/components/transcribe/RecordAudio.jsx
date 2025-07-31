import { useState, useRef, useEffect } from "react";

function RecordAudio({ onRecordingComplete, clearPreview }) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null); // for preview
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            recordedChunksRef.current = [];

            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = function () {
                const audioBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
                console.log("Recorded Blob Size:", audioBlob.size);
                if (audioBlob.size === 0) {
                    alert("Recording failed or empty. Please try again.");
                    return;
                }

                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url); // for preview

                const audioFile = new File([audioBlob], "recorded_audio.webm", { type: 'audio/webm' });
                onRecordingComplete(audioFile); // send to parent
            };

            mediaRecorder.start();
            setIsRecording(true);

        } catch (error) {
            console.error("Microphone access error:", error);
            alert("Please allow microphone access to record audio.");
        }
    }

    function stopRecording() {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }

    function handleRecordClick() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    // Clear preview audio when parent says to
    useEffect(() => {
        if (clearPreview) {
            setAudioUrl(null);
        }
    }, [clearPreview]);

    return (
        <div className="record-audio text-left px-0 my-4 ">
            <button
                onClick={handleRecordClick}
                className={`w-full sm:w-auto px-6 py-2 rounded text-white font-semibold lg:mb-1 mt-2 
    bg-[length:200%_200%] transition-all duration-500 ease-in-out transform
    ${isRecording
                        ? "bg-gradient-to-r from-red-500 to-red-700 hover:bg-[position:100%_0]"
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:bg-[position:100%_0]"
                    } 
    hover:scale-[1.03] hover:-translate-y-[2px] shadow-md hover:shadow-lg active:scale-100 active:translate-y-0`}
                style={{
                    backgroundSize: '200% 200%',
                    transitionProperty: 'transform, box-shadow, background-position',
                }}
            >
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>




            {audioUrl && (
                <div className="mt-4">
                    <p className="text-gray-700 mb-2 font-medium">Recorded Preview:</p>
                    <audio controls className="w-full max-w-md mx-auto">
                        <source src={audioUrl} type="audio/webm" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default RecordAudio;
