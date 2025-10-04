# Adjusting Volume by Finger

This project allows you to control the system volume using finger gestures detected via a webcam. It uses MediaPipe Holistic for hand tracking and Pycaw to adjust the Windows system volume.

## Prerequisites

- Windows OS (only Windows is supported)
- Python 3.x
- Webcam

## Installation

1. Create and activate a virtual environment:
   ```bash
   python -m venv myenv
   source myenv/Scripts/activate 
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

The webcam will open, and you can control the volume by adjusting the distance between your thumb and index finger on your right hand. The volume percentage will be displayed on the screen.

## Notes

- The volume control works by mapping the distance between thumb tip and index finger tip to a volume percentage.
- Press `ESC` to exit the application.

## Dependencies

- OpenCV
- MediaPipe
- Pycaw
- Comtypes
