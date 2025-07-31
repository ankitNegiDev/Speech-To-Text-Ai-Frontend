
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AudioLines } from 'lucide-react';

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { getToken } = useAuth();
    const navigate = useNavigate();

    useEffect(function () {
        fetchHistory();
    }, []);

    async function fetchHistory() {
        try {
            const token = await getToken();
            // const response = await axios.get('http://localhost:3000/api/audio/history', {
            //     headers: { Authorization: `Bearer ${token}` },
            // });

            const response = await axios.get('https://speech-to-text-ai-backend-tm9n.onrender.com/api/audio/history', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && Array.isArray(response.data.data)) {
                setHistory(response.data.data);
            } else {
                setHistory([]);
            }
        } catch (error) {
            console.error('Error fetching transcription history:', error);
        } finally {
            setLoading(false);
        }
    }

    function toggleExpand(index) {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    }

    function getPreview(text) {
        if (!text) return '';
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }

    function handleBackClick() {
        navigate('/transcribe');
    }

    function renderHistoryItems() {
        if (history.length === 0) {
            return (
                <div className="text-center mt-16 text-gray-500">
                    <AudioLines className="mx-auto mb-2 w-10 h-10 text-gray-400" />
                    No transcription history found.
                </div>
            );
        }

        return history.map(function (item, index) {
            const isExpanded = expandedIndex === index;

            return (
                <div
                    key={item._id}
                    className="bg-white border border-gray-200 shadow-md rounded-lg mb-6 transition-all duration-300 hover:shadow-lg"
                >
                    <button
                        onClick={function () {
                            toggleExpand(index);
                        }}
                        className="w-full px-6 py-5 text-left focus:outline-none"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                    🎧 {item.originalFileName || 'Testing Audio'}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                                    {isExpanded ? item.text : getPreview(item.text)}
                                </p>
                            </div>
                            <div className="text-xs text-gray-400 text-right ml-4 whitespace-nowrap">
                                {new Date(item.createdAt).toLocaleDateString()} <br />
                                {new Date(item.createdAt).toLocaleTimeString()}
                            </div>
                        </div>
                        <p className="text-xs text-indigo-600 mt-2">
                            {isExpanded ? 'Click to collapse ▲' : 'Click to expand ▼'}
                        </p>
                    </button>

                    {isExpanded && (
                        <div className="px-6 pb-6">
                            {item.audioUrl && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                        Audio Playback:
                                    </p>
                                    <audio controls className="w-full rounded">
                                        <source src={item.audioUrl} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}

                            {item.editHistory?.length > 0 && (
                                <div className="mt-6 border-t pt-4">
                                    <h4 className="text-sm font-semibold mb-2 text-gray-800">Edit History:</h4>
                                    <div className="space-y-3">
                                        {item.editHistory.map(function (edit, editIndex) {
                                            return (
                                                <div
                                                    key={editIndex}
                                                    className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                                                >
                                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                        {edit.previousText}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Edited at: {new Date(edit.editedAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        });
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20 px-4 sm:px-8 md:px-16">
                <div className="flex justify-start mb-6">
                    <button
                        onClick={handleBackClick}
                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 text-sm"
                    >
                        ← Back to Transcribe
                    </button>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
                    Transcription History
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center mt-20">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                    </div>
                ) : (
                    renderHistoryItems()
                )}
            </div>

            <div className='mt-4'>

            </div>
        </>
    );
}

export default History;
