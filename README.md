
# 🗣️ Speech to Text AI — Frontend

Live App: [https://speech-to-text-ai-frontend.vercel.app](https://speech-to-text-ai-frontend.vercel.app)

An intuitive web app to record or upload audio, convert it to text using AI, and view/edit your transcription history. Built with modern frontend tech and deployed on Vercel.

---

## 📸 Screenshots

<!-- Replace with actual file paths or URLs -->
![Home Page](./public/assets/site1.png)
![loged in page](./public/assets/site4.png)
![Home Page with loged in user](./public/assets/site0.png)
![Transcription Page](./public/assets/site2.png)
![transcribe page generating transcription](./public/assets/site3.png)
![transcribe page with transcription](./public/assets/site5.png)
![transcribe page with edit transcription](./public/assets/site6.png)
![transcribe page with transcribption hisotry](./public/assets/site7.png)

---

## Features

- Record or upload audio
- Get accurate transcription via AssemblyAI
- Edit transcription on the fly
- View transcription history (for logged-in users)
- Guest access with temporary storage
- Cloudinary-powered file handling
- Clerk-based user auth

---

## Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **Framer Motion**
- **Clerk** for authentication
- **Cloudinary** for file storage
- **Axios** for API communication

---

## 📁 Folder Structure

```plane text
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── pages/          # Page-level views
├── services/       # API utilities
└── App.jsx         # Route handler
```

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/speech-to-text-ai-frontend.git
cd speech-to-text-ai-frontend
npm install
npm run dev
```

> Make sure your \`.env\` points to the correct backend API URL.

---

## 🌐 Environment Variables

Create a \`.env\` file with:

```bash
VITE_API_BASE_URL=https://your-backend-url.com/api
```

and also add clerk VITE_CLERK_PUBLISHABLE_KEY if you are using clerk production instance then add production api keys.

---

## Coming Soon with more functionality

- **Translate Transcriptions into Multiple Languages**  
  - I'm working on adding support for translating transcriptions into multiple languages using the DeepL API or any free api.  
  - To improve performance and reduce API usage, I've also implemented backend caching by storing translations in the database—so if the same text is requested again, it won't trigger a new API call. the backend is ready with the route `audioRouter.post('/:id/translate',generalLimiter,translateTranscriptionController)`

- **Export to PDF / DOCX**  
  - I plan to add functionality to export edited transcriptions as PDF or Word documents for easy sharing.

- **Searchable History & Filtering**  
  - I'm planning to enhance the history page with search and filter options so users can easily locate specific transcriptions. and also get the specific transcription edited history based on title of the transcriptions or tags.


## 📄 License

MIT License — free for personal or commercial use.

---
