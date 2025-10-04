from typing import Optional, Tuple, TypedDict
import cv2
import math
import mediapipe as mp
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic

class COLOR:
    BLACK = (0, 0, 0)
    WHITE = (255, 255, 255)
    BLUE  = (255, 0, 0)
    GREEN = (0, 255, 0)
    RED   = (0, 0, 255)
    MAGENTA = (255, 0, 255)
    YELLOW = (0, 255, 255)


class ModePanelInterface(TypedDict):
  p1: Tuple[int, int]
  p2: Tuple[int, int]
  color: Tuple[int, int, int]
  label: str
  mode: str
  box_color: Tuple[int, int, int]
  box_thickness: int


mode_panel: list[ModePanelInterface] = [
    {
        "p1": (10, 10),
        "p2": (110, 110),
        "color": COLOR.MAGENTA,
        "label": "Magenta",
        "mode": "draw",
        "box_color": COLOR.MAGENTA,
        "box_thickness": 2
    },
    {
        "p1": (120, 10),
        "p2": (220, 110),
        "color": COLOR.WHITE,
        "label": "White",
        "mode": "draw",
        "box_color": COLOR.WHITE,
        "box_thickness": 2
    },
    {
        "p1": (230, 10),
        "p2": (330, 110),
        "color": COLOR.BLUE,
        "label": "Blue",
        "mode": "draw",
        "box_color": COLOR.BLUE,
        "box_thickness": 2
    },
    {
        "p1": (340, 10),
        "p2": (440, 110),
        "color": COLOR.GREEN,
        "label": "Green",
        "mode": "draw",
        "box_color": COLOR.GREEN,
        "box_thickness": 2
    },
    {
        "p1": (450, 10),
        "p2": (550, 110),
        "color": COLOR.RED,
        "label": "Red",
        "mode": "draw",
        "box_color": COLOR.RED,
        "box_thickness": 2
    },
    {
        "p1": (560, 10),
        "p2": (660, 110),
        "color": COLOR.YELLOW,
        "label": "Yellow",
        "mode": "draw",
        "box_color": COLOR.YELLOW,
        "box_thickness": 2
    }
]

instructions = [
    "Color Selection: Touch the color panels at the top with your left-hand index finger tip",
    "Drawing: Touch the tip of your right-hand index finger to your right thumb tip and move your hand to draw",
    "Clear Screen: Move your left-hand index finger over the 'Clear Screen' area",
    "Wait: Keep the thumb apart from the index fingers"
]

def getColor(x, y):
    if y < 10 or y > 110:
        return ("white", COLOR.WHITE)

    for color_set in mode_panel:
        x1, y1 = color_set["p1"]
        x2, y2 = color_set["p2"]
        if x >= x1 and x <= x2 and y >= y1 and y <= y2:
            return (color_set["label"], color_set["color"])

    return ("white", COLOR.WHITE)

def main():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    
    canvas = np.zeros((720, 1280, 3), dtype=np.uint8) 
    
    with mp_holistic.Holistic(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    ) as holistic:
        
        prev_x, prev_y = None, None
        curr_x, curr_y = None, None
        selected_color = ("white", COLOR.WHITE)

        while cap.isOpened():
            success, image = cap.read()
            if not success:
                print("Ignoring empty camera frame.")
                continue

            image = cv2.flip(image, 1)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = holistic.process(image)
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
            mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

            h, w, _ = image.shape

            if results.right_hand_landmarks:
              index_tip = results.right_hand_landmarks.landmark[8]
              x, y = int(index_tip.x * w), int(index_tip.y * h)
              cv2.circle(image, (x, y), 10, COLOR.YELLOW, -1)
              if y <= 120:
                selected_color = getColor(x, y)
                x1, y1 = (600, 10)
                x2, y2 = (w - 50, 110)
                if x >= x1 and x <= x2 and y >= y1 and y <= y2:
                  canvas[:] = 0 
                  # canvas = np.zeros((720, 1280, 3), dtype=np.uint8)

            if results.left_hand_landmarks:
                thumb_tip = results.left_hand_landmarks.landmark[4]
                index_tip = results.left_hand_landmarks.landmark[8]
                middle_tip = results.left_hand_landmarks.landmark[12]

                distance = math.sqrt((index_tip.x * w - thumb_tip.x * w) ** 2 + (index_tip.y * h - thumb_tip.y * h) ** 2)
                distance_t_i = abs(distance)

                distance = math.sqrt((middle_tip.x * w - thumb_tip.x * w) ** 2 + (middle_tip.y * h - thumb_tip.y * h) ** 2)
                distance_t_m = abs(distance)

                x, y = int(thumb_tip.x * w), int(thumb_tip.y * h)

                if distance_t_i <= 50 and y > 120:
                    curr_x, curr_y = x, y
                    if prev_x is not None and prev_y is not None:
                        _, color_code = selected_color
                        cv2.line(canvas, (prev_x, prev_y), (curr_x, curr_y), color_code, 5)
                    prev_x, prev_y = curr_x, curr_y
                else:
                    prev_x, prev_y = None, None

            cv2.line(image, (0, 120), (w, 120), COLOR.BLACK, 1)

            for mode_data in mode_panel:
                cv2.rectangle(image, mode_data["p1"], mode_data["p2"], mode_data["box_color"], mode_data["box_thickness"])

            cv2.putText(image, "Clear Screen", (710, 110 - 10), cv2.FONT_HERSHEY_COMPLEX, 0.8, COLOR.WHITE, 2)
            cv2.rectangle(image, (700, 10), (w - 50, 110), COLOR.WHITE, 4)

            len_instruction = len(instructions)
            for i in range(len_instruction):
              cv2.putText(image, instructions[len_instruction - 1 - i], (10, h - 10 - 20 * i), cv2.FONT_HERSHEY_COMPLEX, 0.5, COLOR.WHITE, 1)
            color_name, color_code  = selected_color
            cv2.putText(image, f"colour: {color_name}", (w - 150, h-25), cv2.FONT_HERSHEY_COMPLEX, 0.5, color_code, 1)
            
            output = cv2.addWeighted(image, 1, canvas, 1, 0.9)
            cv2.imshow('Paint App', output)
            if cv2.waitKey(5) & 0xFF == 27:
                break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
