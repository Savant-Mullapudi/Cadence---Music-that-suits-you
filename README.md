# Cadence - Music That Suits You

Welcome to **Cadence**, a sleek and user-friendly music player webpage built with HTML, CSS, and JavaScript. This project offers an engaging way to listen to your favorite songs with intuitive controls for playback, navigation, and more.

## HTML
The HTML file sets up the basic structure of the webpage. It includes:

- **Document Header:** Contains metadata about the webpage, links to the stylesheet, and the page title.
- **Navigation Bar:** A top bar with the brand logo and links to different sections (Home and About).
- **Main Container:** Holds the song collection and a background cover image. Each song is displayed with a cover image, name, duration, and a play button.
- **Player Controls:** Located at the bottom, it includes a seek bar to track song progress, and buttons for rewind, play/pause, fast-forward, previous, and next songs. There's also a display area for the currently playing song's information and cover image.

## CSS
The CSS file styles the webpage to make it visually appealing and responsive. It includes:

- **General Styles:** Sets the background color, font styles, and resets margins and padding for a consistent layout.
- **Navigation Bar:** Styles the top bar with a black background, light gray text, and arranges items horizontally.
- **Main Container:** Sets the dimensions, background color, and adds padding and rounded corners. It also applies a background image for the song collection area.
- **Song Items:** Styles each song entry with a background color, padding, and rounded corners. It arranges the song's cover image, name, duration, and play button in a horizontal layout.
- **Player Controls:** Styles the bottom control bar with icons for playback control and a seek bar for tracking song progress. The icons are clickable and change appearance on hover.

## JavaScript
The JavaScript file adds interactivity and functionality to the music player. It includes:

- **Song List Setup:** Defines an array of song objects with details like name, file path, cover image, and duration. It dynamically updates the song list in the HTML based on this array.
- **Playback Controls:** Implements functions to handle play, pause, rewind, fast-forward, previous, and next actions. It updates the play/pause button icon and the song's current time accordingly.
- **Seek Bar:** Updates the seek bar based on the song's current playback time and allows users to seek to a different part of the song by clicking on the bar.
- **Song Information Display:** Updates the displayed song name and cover image when a new song starts playing.
- **Event Listeners:** Adds click event listeners to the control buttons and play icons in the song list to trigger the appropriate actions.
