function UploadAudio({ setAudioFile }) {
    function handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
            setAudioFile(file); // only set, do not upload
        }
    }

    return (
        <div className="w-full max-w-md mt-7 ">
            <label
                htmlFor="audio-upload"
                className="flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-xl bg-white text-center shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0L8 8m4-4l4 4"
                    />
                </svg>
                <strong className="text-gray-700 text-base sm:text-lg">
                    Click to Upload Audio File
                </strong>
                <span className="text-gray-400 text-sm">MP3, WAV, or WEBM (max ~50MB)</span>
            </label>

            <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}

export default UploadAudio;
