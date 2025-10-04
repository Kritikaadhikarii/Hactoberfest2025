import cv2
import math
import mediapipe as mp

from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic

def set_system_volume(volume_percent):
  volume_percent = max(0, min(100, volume_percent))

  devices = AudioUtilities.GetSpeakers()
  interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
  volume = cast(interface, POINTER(IAudioEndpointVolume))

  volume.SetMasterVolumeLevelScalar(volume_percent / 100, None)

def main():
  # For webcam input:
  cap = cv2.VideoCapture(0)
  with mp_holistic.Holistic(
      min_detection_confidence=0.5,
      min_tracking_confidence=0.5) as holistic:
    
    min_dist = 10
    max_dist = 110
    volume_percentage = 0
    while cap.isOpened():
      success, image = cap.read()
      if not success:
        print("Ignoring empty camera frame.")
        continue

      image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
      results = holistic.process(image)
      image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
      
      mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

      h,w,_ = image.shape

      if results.right_hand_landmarks:    
          thumb_tip = results.right_hand_landmarks.landmark[4]
          index_tip = results.right_hand_landmarks.landmark[8]

          x1, y1 = int(thumb_tip.x * w), int(thumb_tip.y * h)
          x2, y2 = int(index_tip.x * w), int(index_tip.y * h)
          
          length = math.hypot(x2 - x1, y2 - y1)
          dist = max(min_dist, min(max_dist, length))
          volume_percentage = ((dist - min_dist) / (max_dist - min_dist)) * 100
          volume_percentage = int(volume_percentage)
          set_system_volume(volume_percentage)
          cv2.putText(image, f"Volume: {volume_percentage}%", (10,h-10), cv2.FONT_HERSHEY_PLAIN, 1, (0,0,255), 2)

      cv2.imshow('MediaPipe Holistic', image)
      if cv2.waitKey(5) & 0xFF == 27:
        break

  cap.release()
  cv2.destroyAllWindows()

if __name__ == "__main__":
  main()