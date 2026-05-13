# 🏏 Super Over Saga: IPL Edition

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

**Super Over Saga** is a high-octane, comic-book styled cricket arcade game built with React. Step into the shoes of your favorite IPL legends and face off against world-class bowlers in a nail-biting 6-ball super over. Can you beat the target and cement your place in the Hall of Fame?

---

## 🎨 Aesthetic & Vibe

- **Comic Book / Pop Art Style:** Bold outlines, halftone dots, vibrant colors, and dynamic typography ("POW!", "BOOM!", "BAM!").
- **IPL Themed:** Play as legendary batsmen like **The King**, **The Hitman**, or **The Finisher** and face off against bowlers like **Boom Boom**, **Spin Wizard**, and **Slinga**.
- **Juicy Animations:** Screen shakes, hit pauses, and spring-based UI transitions powered by Framer Motion.

## 🚀 Key Features

### 1. Hero Selection (Batsman Perks)

Choose your playing style with unique character abilities:

- 👑 **The King (Kohli):** Master of timing with a **25% larger hit window**.
- 💥 **The Hitman (Rohit):** Aggressive scoring with **faster building streak multipliers**.
- 🚁 **The Finisher (Dhoni):** The ultimate clutch player—**double runs on the last 2 balls**.

### 2. AI Bowler Personas

Face three distinct bowling styles:

- 🎯 **Boom Yorker (Bumrah):** Lethal pace, very tight timing window.
- 🌀 **Mystery Spin (Rashid):** Deceptive speed and tricky timing.
- 🐢 **The Slinger (Pathirana):** Slow and deceptive, requires patience.

### 3. Gameplay Mechanics

- **One-Tap Timing:** A precision-based timing bar determines your shot outcome (6s, 4s, 2s, dots, or wickets).
- **Streak Multiplier:** String together boundaries to activate **2x and 3x score multipliers**.
- **Chase Mode:** Every game generates a random target score (15-28 runs) creating instant pressure.

### 4. Global Leaderboard (Google Cloud Integration)

- Powered by **Google Sheets API** via Apps Script for a zero-latency, serverless global Hall of Fame.
- Robust **Local Storage Fallback** ensures your scores are saved even if you're playing offline or without configuration.

### 5. Synthetic Audio Engine

- Lightweight audio experience using the **Web Audio API** (Oscillators/Noise buffers). No heavy MP3/WAV files to download!

---

## 🕹️ How to Play

1. **Start:** Click "Tap to Play" on the title screen.
2. **Select Hero:** Pick your favorite batsman based on their unique perks.
3. **Analyze:** Watch the "Ball Reveal" flash to see which bowler is coming.
4. **Swing:** When the ball is delivered, tap (or press Space/Enter) when the cursor is inside the **Green Hit Zone**.
5. **Score:** Aim for the center of the zone for a **MASSIVE SIX**!

---

## 🛠️ Technical Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + Vanilla CSS (Comic Design System)
- **Animations:** Framer Motion
- **State Management:** React Context + useReducer (FSM Architecture)
- **Database:** Google Sheets API / LocalStorage

---

## 📦 Local Setup & Deployment

### Installation

```bash
# Clone the repository
git clone https://github.com/devesh-talreja/super-over-saga.git

# Enter the directory
cd super-over-saga

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Leaderboard Setup (Google Sheets)

To enable the global leaderboard, refer to the [Google Apps Script Guide](./artifacts/google_apps_script_guide.md) for full instructions on setting up your personal Google Sheet backend.

### Deploying to Netlify

1. Push your code to GitHub.
2. Connect your repository to **Netlify**.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. (Optional) Add your `VITE_GOOGLE_SHEETS_URL` to the Environment Variables in the Netlify UI.

---

## 🤝 Contributions & Support

If you enjoyed playing **Super Over Saga**, consider supporting the project!

- **Star this repository** ⭐️ to show your support!
- **Fork it** and add your own IPL teams or characters.
- **Report bugs** or suggest new features via the Issues tab.

Created with ❤️ by [Your Name/Handle]
