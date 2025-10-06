# Virtual Paint Application

This project is a virtual paint application that allows you to draw on the screen using hand gestures detected via a webcam. It uses MediaPipe Holistic for hand tracking and OpenCV for image processing and drawing.

## Features

- **Color Selection**: Choose a color by placing the tip of your left-hand index finger over the color panels located at the top of the screen.
- **Drawing**: To draw, touch the tip of your right-hand index finger to your right thumb tip, then move your hand to begin sketching.
- **Clear Screen**: Clear the canvas by moving your left-hand index finger over the "Clear Screen" area.

## Prerequisites

- Python 3.x
- Webcam

## Installation

1. Create and activate a virtual environment:
   ```bash
   python -m venv myenv
   source myenv/Scripts/activate  # On Windows
   source myenv/bin/activate  # On Linux
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the main script:
```bash
python main.py
```

The webcam will open, and you can start painting using your hands. 
Follow the instructions displayed on the screen.

Press `ESC` to exit the application.

## Dependencies

- OpenCV
- MediaPipe
- NumPy
