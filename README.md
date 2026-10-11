# The Wumpus World

A browser version of the classic Wumpus World puzzle, built with plain HTML, CSS and JavaScript. Explore a dark 4×4 cave using only the warnings you receive, grab the gold, and get back to the start alive.

The page is responsive, so it works on phones as well as desktops.

## How to play

**Objective:** Pick up the gold, then return to the starting room (top-left).

**Movement:** You can only move to the room directly above, below, left or right of you. Walking into a wall does nothing.

**Warnings** appear in the Alert Box and only describe the rooms next to you:

| Warning | Meaning |
| --- | --- |
| Breeze | A pit is in a neighbouring room |
| Stench | The Wumpus is in a neighbouring room |
| Grabbed the gold | You are in the gold's room |

**Hazards:** Entering a room with a pit or a live Wumpus ends the game.

**Shooting:** You have one arrow per game. Pick a direction and shoot at the room next to you. If the Wumpus is there, it dies and you earn a bonus. The arrow only hits the adjacent room, and a miss still uses it up.

## Controls

| Action | Touch / mouse | Keyboard |
| --- | --- | --- |
| Move | Left pad (Up, Left, Right, Down) | Arrow keys |
| Shoot | Right pad (Up, Left, Right, Down) | Ctrl + Arrow key |
| Restart after a game ends | Restart button | Enter |
| Show or hide instructions | Tap "Read Instructions" | Mouse click |

## Scoring

| Event | Points |
| --- | --- |
| Each move | −10 |
| Grabbing the gold | +200 |
| Shooting an arrow | −50 |
| Killing the Wumpus | +500 |
| Falling into a pit or meeting the Wumpus | −100 |

The Score Box also shows your current attempt number and your high score.

## Project structure

```
.
├── index.html   # Page structure: world grid, score box, alert box, controls
├── style.css    # Layout, colours and responsive (mobile) styling
├── app.js       # Game logic: movement, warnings, shooting, scoring
└── README.md    # This file
```

## Running the game

No build step or dependencies are needed.

1. Download or clone the project and keep all files in the same folder.
2. Open `index.html` in any modern browser.

Fonts are loaded from Google Fonts, so an internet connection is needed to see them. Without a connection the game still works and uses your system fonts instead.

## Notes for developers

- `app.js` finds elements by their class names and ids, so keep names such as `.world-box`, `.step-box`, `.maroon`, `.hide`, `.control-button`, `.shootBtn`, `#score` and `#attempt` unchanged when editing the HTML or CSS.
- The world grid is 16 `.step-box` elements in `index.html`, indexed 0–15 from top-left to bottom-right. Hazards and gold are marked by hidden text inside those boxes, and the game logic reads that text.
- The cave layout is fixed. It does not change between attempts.



