# Cadence — Music That Suits You

A music player web app built with React 19. Browse a curated library of tracks, control playback seamlessly, and enjoy a clean, responsive listening experience — all in the browser.

🌐 **Live Demo**: [cadencemusics.netlify.app](https://cadencemusics.netlify.app/)

![Cadence App](./public/Cadence_Webpage.png)

---

## Features

- **Music playback controls** — play, pause, skip forward, skip backward, and rewind
- **Track navigation** — browse and select from a curated song library
- **Progress tracking** — real-time playback progress with seek functionality
- **Responsive design** — clean layout that works across desktop and mobile
- **Smooth UI** — icon-driven controls using Font Awesome for a polished experience

---

## Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| UI Framework | React 19                           |
| Styling      | CSS3 (custom properties, flexbox)  |
| Icons        | Font Awesome                       |
| Build Tool   | Create React App (react-scripts 5) |
| Hosting      | Netlify                            |

---

## Project Structure

```
Cadence---Music-that-suits-you/
├── public/
│   └── index.html
├── src/
│   ├── components/       # Player controls, track list, progress bar
│   ├── data/             # Song library and track metadata
│   ├── App.js            # Root component and state management
│   ├── App.css           # Global styles
│   └── index.js          # React DOM entry point
├── package.json
└── README.md
```

---

## Running Locally

### Prerequisites

- Node.js v16+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/Savant-Mullapudi/Cadence---Music-that-suits-you.git
cd Cadence---Music-that-suits-you

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`.

### Build for production

```bash
npm run build
```

---

## Key Implementation Details

- **React 19** — built on the latest React release, leveraging the updated rendering pipeline for improved performance
- **Component-driven architecture** — player controls, track list, and progress bar are each isolated components with clear props interfaces
- **State-driven playback** — all audio state (current track, play/pause, progress) lives in a single root-level state, passed down as props for predictable data flow
- **No external audio API dependencies** — playback is handled via the native HTML5 `<audio>` element, keeping the bundle lightweight

---

## Deployment

Deployed on **Netlify** with automatic builds from the `main` branch.

To deploy your own fork:

1. Push the repo to your GitHub account
2. Connect it to [Netlify](https://netlify.com)
3. Netlify auto-detects CRA settings — build command `npm run build`, publish directory `build/`
4. Deploy
