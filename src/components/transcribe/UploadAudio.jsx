// Upload audio .jsx -- this component is responsible for uploading the audio file.
function UploadAudio({setAudioFile}){

    function handleFileChange(event) {
        const file = event.target.files[0]; // it will take the first file from the array if multiple file are allowed.

        if (file) {
            setAudioFile(file); // here the file is set to the state variable ..
        }
    }
    return(
        <>
            <div className="upload-audio w-full max-w-md mx-auto my-6">
                <label
                    htmlFor="audio-upload"
                    className="block cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-lg text-center shadow-sm hover:bg-gray-100 transition duration-200"
                >
                    <strong className="text-gray-700 text-lg">Upload Audio File</strong>
                </label>

                {/* Hidden file input */}
                <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

        </>
    );
}

export default UploadAudio;