import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

function EditTranscription({ transcription, onUpdate, onCancel ,transcriptionId}) {
    console.log("transcription in edit frontend is : ",transcription);
    const [text, setText] = useState(transcription.text || '');
    const [tags, setTags] = useState(transcription.tags?.join(', ') || '');
    const [reviewed, setReviewed] = useState(transcription.reviewed || false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { getToken } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                text: text.trim(),
                tags: tags.split(',').map(function (tag) {
                    return tag.trim();
                }).filter(Boolean),
                reviewed
            };

            // const { data } = await axios.put(`/api/audio/${transcription._id}`, payload);

            const token = await getToken();

            const { data } = await axios.put(
                `https://speech-to-text-ai-backend-tm9n.onrender.com/api/audio/${transcriptionId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            onUpdate(data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update transcription.');
        } finally {
            setLoading(false);
        }
    }

    // function handleCancel() {
    //     onCancel();
    // }


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl mx-auto mt-10"
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Edit Transcription
            </h2>

            {error && (
                <p className="text-red-600 mb-4 text-center bg-red-100 px-4 py-2 rounded">
                    {error}
                </p>
            )}

            <div className="mb-6">
                <label className="block mb-2 text-gray-700 font-medium">Transcription Text</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                    placeholder="Edit transcription text here..."
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-gray-700 font-medium">Tags (comma separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., meeting, notes, interview"
                />
            </div>

            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                    className="mr-3 h-5 w-5 accent-blue-600"
                />
                <span className="text-gray-700">Mark as Reviewed</span>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EditTranscription;
