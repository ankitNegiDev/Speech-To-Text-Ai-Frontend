import { useAuth } from '@clerk/clerk-react';
import React, { useState } from 'react';

function DeleteTranscription({ transcriptionId, onDeleteSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    async function handleDelete() {
        const confirmDelete = window.confirm("Are you sure you want to delete this transcription?");
        if (!confirmDelete) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`https://speech-to-text-ai-backend-tm9n.onrender.com/api/audio/${transcriptionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete transcription.');
            }

            if (onDeleteSuccess) {
                onDeleteSuccess(); // Notify parent to refresh or redirect
            }
        } catch (err) {
            console.error("Delete error:", err);
            setError(err.message || 'Something went wrong.');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="mt-4">
            <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition duration-200"
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete Transcription'}
            </button>

            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}

export default DeleteTranscription;
