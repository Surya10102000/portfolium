# 🌐 Portfolium

**Portfolium** is a full-featured portfolio website builder where users can effortlessly create, customize, and share their personal portfolio. Built with **Next.js App Router**, this project allows users to choose templates, add their project and experience details, and get a live portfolio at `/username`.

---

## 🚀 Features

- ✨ Multiple portfolio templates with dynamic layouts
- 🧠 User authentication
- 📁 Easy form-based content input (Projects, Experience, About, Contact)
- 🖼️ Dynamic page generation using `app/[username]` route
- 🧩 Template selection and live previews
- 🎨 Theme customization (colors, layout, etc.)
- 🌐 Public portfolio link: `https://portfolium.com/username`
- 🤖 Built-in AI assistant (Gemini) with animated chat widget for better visibility
- 📄 PDF export & social share options (coming soon)

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database   | Auth              | Styling        |
|-----------------|------------------|------------|-------------------|----------------|
| Next.js (App Router) | Node.js (Express) | MongoDB    |   NextAuth   | Tailwind CSS + ShadCN |

---

## 🧑‍💻 Getting Started

### 1.⭐ Star this project (required before contributing)

### 2. Clone the repository

```bash
git clone https://github.com/yourusername/portfolium.git
cd portfolium
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set environment variables

Create a `.env.local` file and add:

```env
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
DATABASE_URL=
PORT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Gemini AI
GEMINI_API_KEY=
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🤖 AI Assistant (Gemini)

### Features
- **Floating Chat Widget**: Accessible from any page via an animated chat button
- **Animated Icon**: Gently pulses to attract attention when first loaded
- **Responsive Design**: Works on all device sizes
- **Test Mode**: Try it out without an API key (uses mock responses)

### Implementation
- **Backend**: `app/api/assistance/route.ts`
  - Handles AI requests using Google's Generative Language API
  - Includes test mode for development
  - Environment variable: `GEMINI_API_KEY`

- **Frontend**:
  - Service: `services/assistantApi.ts`
  - UI Component: `app/_components/assistant/ChatWidget.tsx`
  - Uses Framer Motion for smooth animations

### Usage
1. The chat widget appears as a floating button in the bottom-right corner
2. Click to open the chat interface
3. Type your question and press Enter or click Send
4. The assistant will respond with helpful information

### Notes
- API key is required for production (add to `.env.local`)
- Test mode is enabled by default for development
- Animation automatically stops after first interaction or 2 minutes
- Error handling for API failures and network issues

---

## ✨ Templates

Each template is stored under `components/_templates/` and has:
- Custom Layout
- Custom Navbar
- Project Detail Page


---

## ✅ TODO (Contributions Welcome)

- [ ] Add more beautiful templates
- [ ] Export as PDF & PNG
- [ ] Custom domain support
- [ ] Template preview gallery
- [ ] Realtime form preview

---

## 🪪 License

MIT License

---

## 👨‍💻 Developed by

**Surya Prakash Mallah**  
[GitHub](https://github.com/suryaprakashmallah) ・ [LinkedIn](https://linkedin.com/in/suryaprakashmallah)
