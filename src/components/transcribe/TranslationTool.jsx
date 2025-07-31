import { useState } from 'react';

function TranslationTool({ transcriptionId }) {
    const [targetLanguage, setTargetLanguage] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // console.log("Transcription ID received in TranslationTool:", transcriptionId);

    async function handleTranslate() {
        if (!targetLanguage || !transcriptionId) {
            setError('Please select a language and make sure transcription is available.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setTranslatedText('');

            const response = await fetch(`http://localhost:3000/api/audio/${transcriptionId}/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetLanguage }),
            });

            const text = await response.text(); // read response as text first
            let data;

            try {
                data = JSON.parse(text);
            } catch (error) {
                console.log("erorr is : ",error);
                throw new Error('Invalid JSON response from server');
            }

            // console.log("Translate response:", data);

            if (!response.ok) {
                throw new Error(data.message || 'Translation failed');
            }

            setTranslatedText(data.data.translatedText);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-6 shadow-md">
            <h3 className="text-white text-lg font-semibold mb-2">Translate Transcription</h3>

            <input
                type="text"
                placeholder="Enter target language (e.g., fr, hi, es)"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleTranslate}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                disabled={loading}
            >
                {loading ? 'Translating...' : 'Translate'}
            </button>

            {error && <p className="text-red-400 mt-2">{error}</p>}

            {translatedText && (
                <div className="mt-4 bg-gray-700 p-3 rounded text-white whitespace-pre-wrap">
                    <h4 className="font-semibold mb-1">Translated Text:</h4>
                    {translatedText}
                </div>
            )}
        </div>
    );
}

export default TranslationTool;
