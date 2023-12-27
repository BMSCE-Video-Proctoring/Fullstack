import cv2
import numpy as np
import mediapipe as mp
from keras.models import load_model

###################### Initialization for hand gesture detection ######################

mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
gestureModel = load_model('./proctoring/detectionModels/handGestures/mp_hand_gesture')        # Load the model

f = open('./proctoring/detectionModels/handGestures/gesture.names', 'r')
gestureClassNames = f.read().split('\n')                                           # Get the class names
f.close()

######################################################################################


###################### Initialization for phone & multiple people detection ##########

phoneModel = load_model('./proctoring/detectionModels/phoneMultiplePeople/model')
class_names = [c.strip() for c in open("./proctoring/detectionModels/phoneMultiplePeople/Classes.TXT").readlines()]

######################################################################################

# Detect hand gestures
def detectGestures(frame):
    x, y, c = frame.shape
    frame = cv2.flip(frame, 1)                          # Flip the frame vertically
    framergb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Get hand landmark prediction
    result = hands.process(framergb)
    className = ''

    # post process the result
    if result.multi_hand_landmarks:
        landmarks = []
        for handslms in result.multi_hand_landmarks:
            for lm in handslms.landmark:
                lmx = int(lm.x * x)
                lmy = int(lm.y * y)
                landmarks.append([lmx, lmy])

            # Predict gesture
            prediction = gestureModel.predict([landmarks])
            # print(prediction)
            classID = np.argmax(prediction)
            className = gestureClassNames[classID]
    final = False               # (Default at first) No suspicious activity detected
    if className and className!='fist':
        final = True            # Suspicious activity detected
    return final


def detectPhone(frame):
    img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (320, 320))
    img = img.astype(np.float32)
    img = np.expand_dims(img, 0)
    img = img / 255
    boxes, scores, classes, nums = phoneModel(img)
    count=0
    suspicious = False
    for i in range(nums[0]):
        if int(classes[0][i] == 0):
            count +=1
        if int(classes[0][i] == 67):
            print('Mobile Phone detected')
            suspicious = True
        if int(classes[0][i] == 65):
            print('Remote Detected')
            suspicious = True
    if count == 0:
        print('No person detected')
        suspicious = True 
    elif count > 1: 
        print('More than one person detected')
        suspicious = True
    return suspicious
