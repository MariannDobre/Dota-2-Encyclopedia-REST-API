# 🛡️ REST API for Dota 2 Encyclopedia

Welcome to my **Dota 2 Heroes REST API**! 🎮✨  
This project demonstrates my ability to **build, design, and improve a RESTful API from scratch** using **Node.js** and **Express**. It’s designed as a backend for an encyclopedia-like app about **Dota 2 heroes**, inspired by one of my favorite games.

---

## 🚀 Features Implemented

This backend, built entirely from scratch, works currently with a **JSON data file** and includes some of the **most important real-world API concepts**:

- **🗂️ Fetch all heroes** – Get a complete list of heroes.
- **🔎 Fuzzy search** – Find heroes with partial or case-insensitive name matches.
- **📄 Pagination** – Control page size and navigate through results.
- **🎯 Filtering** – Filter heroes by **attack type** (Melee/Range) and **primary attribute** (Strength/Agility/Intelligence/Universal).
- **⬆️⬇️ Sorting** – Sort heroes by name in ascending or descending order.
- **💾 Create heroes** – Add new heroes to the data.
- **✏️ Update heroes** – Update existing hero data.
- **🗑️ Delete heroes** – Remove heroes from the collection.

> ⚡ All routes are fully **RESTful** and designed to demonstrate practical backend skills.

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime for backend development.
- **Express** – Minimalist web framework for building REST APIs.
- **CORS** – Handle cross-origin requests.
- **File System (fs)** – For storing and reading JSON data locally.
- **dotenv** – Manage environment variables like port configuration.

---

## 📁 File Structure

/data
└─ heroes.json # JSON file containing all hero data
/server.js # Main Express server file
.gitignore # Excluding node_modules, .env, logs, etc.

> The data is intentionally visible in the repo to showcase full functionality and provide a **hands-on demonstration** for recruiters.

---

## 🔗 Available Routes

| Method | Endpoint                | Description                                                  |
| ------ | ----------------------- | ------------------------------------------------------------ |
| GET    | `/`                     | Test if the API is running                                   |
| GET    | `/api/heroes`           | Fetch all heroes (supports filters, sorting, and pagination) |
| GET    | `/api/heroes/:heroName` | Fetch a single hero by name (fuzzy search)                   |
| POST   | `/api/create-hero`      | Create a new hero                                            |
| PUT    | `/api/heroes/:id`       | Update an existing hero by ID                                |
| DELETE | `/api/heroes/:id`       | Delete a hero by ID                                          |

---

## 🎯 Future Improvements

This project is meant to **grow and evolve** as I continue learning:

- **🔐 Authentication & Authorization** – JWT-based auth, protected routes.
- **🗄️ Database Integration** – Move from JSON files to **PostgreSQL** or **MongoDB**.
- **⚡ Performance Optimization** – Handle large datasets and implement caching.
- **📈 Advanced Filtering & Sorting** – Multi-field and dynamic filters.

---

## 💡 Why This Project?

This repository is designed as **proof of my practical skills in backend development**:

- Fully built **from scratch** using Node and Express.
- Demonstrates understanding of **real-world API concepts**.
- Easy to extend and scale with **future features**.
- Perfect for showcasing in **GitHub and LinkedIn** to recruiters and peers.

---

## 📌 How to Run

1. Clone the repo:

```bash
git clone https://github.com/your-username/dota2-heroes-api.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with your preferred port:

```bash
PORT=3000
```

4. Start the server:

```bash
npm run dev
```

5. Test endpoints via browser or tools like Postman.
