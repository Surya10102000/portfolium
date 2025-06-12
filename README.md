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
- 📄 PDF export & social share options (coming soon)

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database   | Auth              | Styling        |
|-----------------|------------------|------------|-------------------|----------------|
| Next.js (App Router) | Node.js (Express) | MongoDB    |   NextAuth   | Tailwind CSS + ShadCN |

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolium.git
cd portfolium
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

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

```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

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
