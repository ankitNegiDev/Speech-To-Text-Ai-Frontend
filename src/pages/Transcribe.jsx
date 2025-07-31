// import { useState } from 'react';
// import { useUser, useAuth } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// import TranscriptionViewer from '../components/transcribe/TranscriptionViewer';
// import UploadAudio from '../components/transcribe/UploadAudio';
// import RecordAudio from '../components/transcribe/RecordAudio';
// import TranslationTool from '../components/transcribe/TranslationTool';

// function Transcribe() {
//     const { user } = useUser();
//     const { getToken } = useAuth();
//     const navigate = useNavigate();

//     const [audioFile, setAudioFile] = useState(null);
//     const [audioData, setAudioData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [clearPreview, setClearPreview] = useState(false);

    

//     async function handleUpload() {
//         if (!audioFile) return;

//         const uploadToast = toast.loading('Uploading audio...');
//         try {
//             setLoading(true);
//             setError('');
//             setClearPreview(false);

//             const token = await getToken();
//             const formData = new FormData();
//             formData.append('audio', audioFile);

//             const response = await fetch('https://speech-to-text-ai-backend-tm9n.onrender.com/api/audio/upload', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Upload failed');
//             }

//             toast.success('Transcription completed!', { id: uploadToast });

//             setAudioData(data);
//             setAudioFile(null);
//             setClearPreview(true);
//         } catch (err) {
//             console.error(err);
//             toast.error(err.message || 'Something went wrong.', { id: uploadToast });
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     function handleDeleteSuccess() {
//         setAudioData(null);
//     }

//     function handleGoToHistory() {
//         navigate('/history');
//     }

//     return (
//         <div className="min-h-screen bg-gray-0 text-black px-4 py-6 sm:px-6 md:px-8 pt-28 mb-0 max-w-7xl mx-auto">
            
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//                 <h1 className="text-2xl font-bold sm:text-left text-center sm:mb-0 mb-2">
//                     Transcribe Your Audio
//                 </h1>
//                 <button
//                     onClick={handleGoToHistory}
//                     className="w-full sm:w-auto px-4 py-2  lg:py-2 sm:px-6 sm:py-2.5 bg-[#9E3BEE] text-white font-medium rounded-2xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#7e2dc0] hover:shadow-lg active:scale-95"
//                 >
//                     View History
//                 </button>
//             </div>

//             {/* Main Flex Layout */}
//             <div className="flex flex-col md:flex-row gap-8">
//                 {/* Left Side */}
//                 <div className="w-full md:w-1/2 space-y-8">
//                     <UploadAudio setAudioFile={setAudioFile} />
//                     <RecordAudio onRecordingComplete={setAudioFile} clearPreview={clearPreview} />

//                     {audioFile && (
//                         <div className="text-left">
//                             <p className="text-sm font-medium text-indigo-700 bg-indigo-50 px-4 py-2 rounded shadow-sm border border-indigo-200 mb-3">
//                                 Selected: <span className="font-semibold">{audioFile.name}</span>
//                             </p>

//                             <button
//                                 onClick={handleUpload}
//                                 disabled={loading}
//                                 className={`w-full sm:w-auto px-6 py-2 text-white font-semibold rounded 
//                                     bg-[length:200%_200%] transition-all duration-500 ease-in-out transform
//                                     ${loading
//                                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 cursor-not-allowed opacity-70'
//                                         : `bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 
//                                         hover:bg-[position:100%_0] 
//                                         hover:scale-[1.03] hover:-translate-y-[2px] 
//                                         shadow-md hover:shadow-lg active:scale-100 active:translate-y-0`
//                                     }`}
//                                 style={{
//                                     backgroundSize: '200% 200%',
//                                     transitionProperty: 'transform, box-shadow, background-position, background-color',
//                                 }}
//                             >
//                                 {loading ? 'Uploading please wait...' : 'Upload & Transcribe'}
//                             </button>


//                         </div>
//                     )}

//                     {error && <p className="text-red-600 text-center">{error}</p>}

//                     {/* Audio Preview */}
//                     {audioData?.transcription.audioUrl && (
//                         <div className="text-left bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm mb-4">
//                             <p className="text-indigo-700 text-sm font-semibold mb-2">🎵 Audio Preview</p>

//                             <audio
//                                 controls
//                                 className="w-full rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             >
//                                 <source src={audioData.transcription.audioUrl} type="audio/webm" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                         </div>

//                     )}
//                 </div>

//                 {/* Right Side */}
//                 <div className="w-full md:w-1/2 space-y-6">
//                     {loading ? (
//                         <div className="relative w-full h-80 rounded-lg bg-gray-300 overflow-hidden mt-6 flex flex-col items-center justify-start px-6 py-8">
//                             {/* Transcription message at the top */}
//                             <p className="text-gray-800 font-semibold text-lg z-10 mb-4 text-center">
//                                 Please wait transcription is generatating.......
//                             </p>

//                             {/* Shimmer stripe overlay */}
//                             <div className="absolute inset-0 shimmer-overlay" />
//                         </div>
//                     ) : (
//                         audioData && (
//                             <TranscriptionViewer
//                                 transcription={audioData.transcription.text}
//                                 transcriptionId={audioData.transcription._id}
//                                 ownerId={audioData.transcription.userId}
//                                 currentUserId={user?.id}
//                                 onDeleteSuccess={handleDeleteSuccess}
//                             />
//                         )
//                     )}



//                 </div>
//             </div>

//             {/* Bottom Translation Tool */}
//             {/* <div className="mt-0">
//                 <h2 className="text-xl font-semibold mb-2 text-center">Translation</h2>
//                 <div className="bg-white border border-gray-300 rounded p-4 text-center text-gray-500">
//                     Coming Soon...
//                 </div>
//             </div> */}
//             <div className='mt-24 lg:mt-10'>

//             </div>
//         </div>
//     );
// }

// export default Transcribe;




// import { useState, useEffect } from 'react';
// import { useUser, useAuth } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// import TranscriptionViewer from '../components/transcribe/TranscriptionViewer';
// import UploadAudio from '../components/transcribe/UploadAudio';
// import RecordAudio from '../components/transcribe/RecordAudio';

// function Transcribe() {
//     const { user } = useUser();
//     const { getToken } = useAuth();
//     const navigate = useNavigate();

//     const [audioFile, setAudioFile] = useState(null);
//     const [audioFileName, setAudioFileName] = useState('');
//     const [audioData, setAudioData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [clearPreview, setClearPreview] = useState(false);

//     // Load saved state on mount
//     useEffect(() => {
//         const savedAudioData = sessionStorage.getItem('audioData');
//         const savedAudioFileName = sessionStorage.getItem('audioFileName');

//         if (savedAudioData) {
//             setAudioData(JSON.parse(savedAudioData));
//         }
//         if (savedAudioFileName) {
//             setAudioFileName(savedAudioFileName);
//         }
//     }, []);

//     // Persist state to sessionStorage
//     useEffect(() => {
//         if (audioData) {
//             sessionStorage.setItem('audioData', JSON.stringify(audioData));
//         }
//         if (audioFile) {
//             sessionStorage.setItem('audioFileName', audioFile.name);
//             setAudioFileName(audioFile.name);
//         }
//     }, [audioData, audioFile]);

//     async function handleUpload() {
//         if (!audioFile) return;

//         const uploadToast = toast.loading('Uploading audio...');
//         try {
//             setLoading(true);
//             setError('');
//             setClearPreview(false);

//             const token = await getToken();
//             const formData = new FormData();
//             formData.append('audio', audioFile);

//             const response = await fetch('https://speech-to-text-ai-backend-tm9n.onrender.com/api/audio/upload', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Upload failed');
//             }

//             toast.success('Transcription completed!', { id: uploadToast });

//             setAudioData(data);
//             setAudioFile(null);
//             setClearPreview(true);
//         } catch (err) {
//             console.error(err);
//             toast.error(err.message || 'Something went wrong.', { id: uploadToast });
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     function handleDeleteSuccess() {
//         setAudioData(null);
//         sessionStorage.removeItem('audioData');
//     }

//     function handleGoToHistory() {
//         navigate('/history');
//     }

//     return (
//         <div className="min-h-screen bg-gray-0 text-black px-4 py-6 sm:px-6 md:px-8 pt-28 mb-0 max-w-7xl mx-auto">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//                 <h1 className="text-2xl font-bold sm:text-left text-center sm:mb-0 mb-2">
//                     Transcribe Your Audio
//                 </h1>
//                 <button
//                     onClick={handleGoToHistory}
//                     className="w-full sm:w-auto px-4 py-2 lg:py-2 sm:px-6 sm:py-2.5 bg-[#9E3BEE] text-white font-medium rounded-2xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#7e2dc0] hover:shadow-lg active:scale-95"
//                 >
//                     View History
//                 </button>
//             </div>

//             <div className="flex flex-col md:flex-row gap-8">
//                 {/* Left Column */}
//                 <div className="w-full md:w-1/2 space-y-8">
//                     <UploadAudio setAudioFile={setAudioFile} />
//                     <RecordAudio onRecordingComplete={setAudioFile} clearPreview={clearPreview} />


//                     {(audioFileName || audioFile) && (
//                         <div className="text-left">
//                             {audioFile && (
//                                 <button
//                                     onClick={handleUpload}
//                                     disabled={loading}
//                                     className={`w-full sm:w-auto px-6 py-2 text-white font-semibold rounded 
//                                     bg-[length:200%_200%] transition-all duration-500 ease-in-out transform
//                                     ${loading
//                                             ? 'bg-gradient-to-r from-blue-400 to-blue-600 cursor-not-allowed opacity-70'
//                                             : `bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 
//                                         hover:bg-[position:100%_0] 
//                                         hover:scale-[1.03] hover:-translate-y-[2px] 
//                                         shadow-md hover:shadow-lg active:scale-100 active:translate-y-0`
//                                         }`}
//                                     style={{
//                                         backgroundSize: '200% 200%',
//                                         transitionProperty: 'transform, box-shadow, background-position, background-color',
//                                     }}
//                                 >
//                                     {loading ? 'Uploading please wait...' : 'Upload & Transcribe'}
//                                 </button>
//                             )}
//                         </div>
//                     )}

//                     {error && <p className="text-red-600 text-center">{error}</p>}

//                     {audioData?.transcription?.audioUrl && (
//                         <div className="text-left bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm mb-4">
//                             <p className="text-indigo-700 text-sm font-semibold mb-2">🎵 Audio Preview</p>
//                             <audio
//                                 controls
//                                 className="w-full rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             >
//                                 <source src={audioData.transcription.audioUrl} type="audio/webm" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                         </div>
//                     )}
//                 </div>

//                 {/* Right Column */}
//                 <div className="w-full md:w-1/2 space-y-6">
//                     {loading ? (
//                         <div className="relative w-full h-80 rounded-lg bg-gray-300 overflow-hidden mt-6 flex flex-col items-center justify-start px-6 py-8">
//                             <p className="text-gray-800 font-semibold text-lg z-10 mb-4 text-center">
//                                 Please wait, transcription is generating...
//                             </p>
//                             <div className="absolute inset-0 shimmer-overlay" />
//                         </div>
//                     ) : (
//                         audioData && (
//                             <>
//                                 <TranscriptionViewer
//                                     transcription={audioData.transcription.text}
//                                     transcriptionId={audioData.transcription._id}
//                                     ownerId={audioData.transcription.userId}
//                                     currentUserId={user?.id}
//                                     onDeleteSuccess={handleDeleteSuccess}
//                                 />

//                                 <button
//                                     onClick={() => {
//                                         sessionStorage.removeItem('audioData');
//                                         sessionStorage.removeItem('audioFileName');
//                                         setAudioData(null);
//                                         setAudioFile(null);
//                                         setAudioFileName('');
//                                         toast.success("Transcription cleared!");
//                                     }}
//                                     className="px-4 py-2 text-sm border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300"
//                                 >
//                                     Clear Transcription Data
//                                 </button>
//                             </>
//                         )
//                     )}
//                 </div>
//             </div>

//             <div className="mt-24" />
//         </div>
//     );

// }

// export default Transcribe;




import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import TranscriptionViewer from '../components/transcribe/TranscriptionViewer';
import UploadAudio from '../components/transcribe/UploadAudio';
import RecordAudio from '../components/transcribe/RecordAudio';

function Transcribe() {
    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [audioFile, setAudioFile] = useState(null);
    const [audioFileName, setAudioFileName] = useState('');
    const [audioData, setAudioData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [clearPreview, setClearPreview] = useState(false);

    // Load saved state on mount
    useEffect(() => {
        const savedAudioData = sessionStorage.getItem('audioData');
        const savedAudioFileName = sessionStorage.getItem('audioFileName');

        if (savedAudioData) {
            setAudioData(JSON.parse(savedAudioData));
        }
        if (savedAudioFileName) {
            setAudioFileName(savedAudioFileName);
        }
    }, []);

    // Persist state to sessionStorage
    useEffect(() => {
        if (audioData) {
            sessionStorage.setItem('audioData', JSON.stringify(audioData));
        }
        if (audioFile) {
            sessionStorage.setItem('audioFileName', audioFile.name);
            setAudioFileName(audioFile.name);
        }
    }, [audioData, audioFile]);

    async function handleUpload() {
        if (!audioFile) return;

        const uploadToast = toast.loading('Uploading audio...');
        try {
            setLoading(true);
            setError('');
            setClearPreview(false);

            const token = await getToken();
            const formData = new FormData();
            formData.append('audio', audioFile);

            const response = await fetch('https://speech-to-text-ai-backend-tm9n.onrender.com/api/audio/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Upload failed');
            }

            toast.success('Transcription completed!', { id: uploadToast });

            setAudioData(data);
            setAudioFile(null);
            setClearPreview(true);
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Something went wrong.', { id: uploadToast });
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleDeleteSuccess() {
        setAudioData(null);
        sessionStorage.removeItem('audioData');
    }

    function handleGoToHistory() {
        navigate('/history');
    }

    const handleSampleAudio = async () => {
        const response = await fetch('/sample.mp3');
        const blob = await response.blob();
        const file = new File([blob], 'sample.mp3', { type: 'audio/webm' });
        setAudioFile(file);
        toast.success('Sample audio loaded now click on upload & transcribe button');
    };

    return (
        <div className="min-h-screen bg-gray-0 text-black px-4 py-6 sm:px-6 md:px-8 pt-28 mb-0 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-2xl font-bold sm:text-left text-center sm:mb-0 mb-2">
                    Transcribe Your Audio
                </h1>
                <button
                    onClick={handleGoToHistory}
                    className="w-full sm:w-auto px-4 py-2 lg:py-2 sm:px-6 sm:py-2.5 bg-[#9E3BEE] text-white font-medium rounded-2xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#7e2dc0] hover:shadow-lg active:scale-95"
                >
                    View History
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="w-full md:w-1/2 space-y-4">
                    <UploadAudio setAudioFile={setAudioFile} />
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-full sm:w-auto">
                            <RecordAudio onRecordingComplete={setAudioFile} clearPreview={clearPreview} />
                        </div>

                        <button
                            onClick={handleSampleAudio}
                            className="w-full sm:w-auto px-6 py-2 text-indigo-600 border border-indigo-500 font-semibold rounded-xl transition-all duration-300 hover:bg-indigo-50 hover:shadow-md"
                        >
                            🎧 Try Sample Audio
                        </button>
                    </div>


                    {(audioFileName || audioFile) && (
                        <div className="text-left">
                            {audioFile && (
                                <button
                                    onClick={handleUpload}
                                    disabled={loading}
                                    className={`w-full sm:w-auto px-6 py-2 text-white font-semibold rounded 
                                    bg-[length:200%_200%] transition-all duration-500 ease-in-out transform
                                    ${loading
                                            ? 'bg-gradient-to-r from-blue-400 to-blue-600 cursor-not-allowed opacity-70'
                                            : `bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 
                                        hover:bg-[position:100%_0] 
                                        hover:scale-[1.03] hover:-translate-y-[2px] 
                                        shadow-md hover:shadow-lg active:scale-100 active:translate-y-0`
                                        }`}
                                    style={{
                                        backgroundSize: '200% 200%',
                                        transitionProperty: 'transform, box-shadow, background-position, background-color',
                                    }}
                                >
                                    {loading ? 'Uploading please wait...' : 'Upload & Transcribe'}
                                </button>
                            )}
                        </div>
                    )}

                    {error && <p className="text-red-600 text-center">{error}</p>}

                    {audioData?.transcription?.audioUrl && (
                        <div className="text-left bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm mb-4">
                            <p className="text-indigo-700 text-sm font-semibold mb-2">🎵 Audio Preview</p>
                            <audio
                                controls
                                className="w-full rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <source src={audioData.transcription.audioUrl} type="audio/webm" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 space-y-6">
                    {loading ? (
                        <div className="relative w-full h-80 rounded-lg bg-gray-300 overflow-hidden mt-6 flex flex-col items-center justify-start px-6 py-8">
                            <p className="text-gray-800 font-semibold text-lg z-10 mb-4 text-center">
                                Please wait, transcription is generating...
                            </p>
                            <div className="absolute inset-0 shimmer-overlay" />
                        </div>
                    ) : (
                        audioData && (
                            <>
                                <TranscriptionViewer
                                    transcription={audioData.transcription.text}
                                    transcriptionId={audioData.transcription._id}
                                    ownerId={audioData.transcription.userId}
                                    currentUserId={user?.id}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />

                                <button
                                    onClick={() => {
                                        sessionStorage.removeItem('audioData');
                                        sessionStorage.removeItem('audioFileName');
                                        setAudioData(null);
                                        setAudioFile(null);
                                        setAudioFileName('');
                                        toast.success("Transcription cleared!");
                                    }}
                                    className="px-4 py-2 text-sm border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300"
                                >
                                    Clear Transcription Data
                                </button>
                            </>
                        )
                    )}
                </div>
            </div>

            <div className="mt-24" />
        </div>
    );
}

export default Transcribe;
