import { useState } from 'react';
import DeleteTranscription from './DeleteTranscription';
import EditTranscription from './EditTranscription';
import { useUser } from '@clerk/clerk-react';

function TranscriptionViewer({ transcription, transcriptionId, ownerId, currentUserId, onDeleteSuccess }) {
    const { isSignedIn } = useUser();
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [allowDelete, setAllowDelete] = useState(false);
    const [currentTranscription, setCurrentTranscription] = useState(transcription);


    console.log("userId in transcription viewer is : ",ownerId);
    console.log("current user id is :",currentUserId);
    console.log("transcription in transcription viewer is : ",transcription);
    console.log("transcrpiot id in trancription viewer is : ",transcriptionId);

    const isOwner = currentUserId === ownerId;
    console.log("is owner is ------------------------------- : ",isOwner);

    function handleEditClick() {
        if (!isSignedIn) {
            setShowLoginAlert(true);
        } else {
            setShowEdit(true);
            setShowLoginAlert(false);
        }
    }

    function handleDeleteClick() {
        if (!isSignedIn) {
            setShowLoginAlert(true);
        } else {
            setAllowDelete(true);
            setShowLoginAlert(false);
        }
    }

    return (
        <div className="mt-6 p-4 border rounded shadow bg-white text-black">
            <h2 className="text-lg font-semibold mb-2">Transcription Result:</h2>

            {currentTranscription ? (
                <p className="whitespace-pre-wrap leading-relaxed">{currentTranscription.text || currentTranscription}</p>

            ) : (
                <p className="text-gray-500 italic">No transcription available yet.</p>
            )}

            {showLoginAlert && (
                <p className="text-red-500 mt-2">⚠️ Please log in to perform this action.</p>
            )}

            {showEdit && (
                <EditTranscription
                    transcription={currentTranscription}
                    transcriptionId={transcriptionId}
                    onUpdate={(updatedData) => {
                        setCurrentTranscription(updatedData);
                        setShowEdit(false);
                    }}
                    onCancel={() => setShowEdit(false)}
                />
            )}

            {isOwner && (
                <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full">
                    <button
                        onClick={handleEditClick}
                        className="w-full sm:w-auto px-5 py-2 text-white font-semibold rounded 
               bg-[length:200%_200%] bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 
               transition-all duration-500 ease-in-out 
               hover:bg-[position:100%_0] hover:scale-[1.03] hover:shadow-md active:scale-100"
                    >
                        Edit Transcription
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="w-full sm:w-auto px-5 py-2 text-white font-semibold rounded 
               bg-[length:200%_200%] bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 
               transition-all duration-500 ease-in-out 
               hover:bg-[position:100%_0] hover:scale-[1.03] hover:shadow-md active:scale-100"
                    >
                        Delete Transcription
                    </button>






                    {allowDelete && (
                        <DeleteTranscription
                            transcriptionId={transcriptionId}
                            onDeleteSuccess={onDeleteSuccess}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default TranscriptionViewer;
