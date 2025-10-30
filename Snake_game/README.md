# 🐍 Snake Game (Pygame)

<p align="center">
<img src="https://github.com/ndleah/python-mini-project/blob/main/IMG/Snake_game.png" width=60%>
</p>

## 📝 Description
This is a simple and classic **Snake Game** built using **Python** and **Pygame**.  
You control the snake to eat food and grow longer. The challenge is to avoid colliding with the walls or your own tail.

This version includes:
- Improved UI design
- Smooth rendering
- Real-time scoring
- Restartable game session

---

## ⭐ Features
- Smooth snake movement and keyboard controls
- Live score displayed on screen
- Game Over screen with **Restart option**
- Grid-based snake motion
- Clean & readable code structure
- Easy to modify and customize

---

## ⚙️ Getting Started

### 🧠 Prerequisites
Ensure you have **Python 3.x** installed.

Install the required dependency:
```bash
python -m pip install --upgrade pygame
```

#### 🚀 How to Run

1. Clone or download this repository.
2. Open a terminal and navigate to the project folder:

   ```bash
   cd src/snake_game
   ```

3. Run the game:

   ```bash
   python main.py
   ```
---

### 🎯 How to Play

- Use the following keys to move the tiles:

  ```
  W → Move Up
  A → Move Left
  S → Move Down
  D → Move Right
  ESC → Quit Game
  ```

### 🧩 Code Overview

* Modular Functions: Code is separated into logic blocks (movement, collision, rendering).
* Grid-Based Movement: Prevents glitchy or diagonal movement.
* Transparent Game Loop: Easy to modify for new features (power-ups, themes, difficulty, etc).