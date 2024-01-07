import cv2
import numpy as np
import mediapipe as mp
from keras.models import load_model

from proctoring.detectionModels.gazeTracking.gaze_tracking import GazeTracking

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



###################### Initialization for head pose detection ######################

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

######################################################################################


###################### Initialization for eye gaze detection ######################

gaze = GazeTracking()

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
    message = ''
    if className and className!='fist':
        final = True            # Suspicious activity detected
        message = 'Suspicious Hand Gestures Detected. Please do not use any hand gestures during the exam.'
    print('Gesture')
    return final, message


def detectPhone(frame):
    img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (320, 320))
    img = img.astype(np.float32)
    img = np.expand_dims(img, 0)
    img = img / 255
    boxes, scores, classes, nums = phoneModel(img)
    count=0
    suspicious = False
    message = ''
    for i in range(nums[0]):
        if int(classes[0][i] == 0):
            count +=1
        if int(classes[0][i] == 67):
            message = 'Mobile Phone detected. Please do not use your phone during the exam.'
            suspicious = True
        if int(classes[0][i] == 65):
            message = 'Remote Detected. Please do not use any remote during the exam.'
            suspicious = True
    if count == 0:
        message = 'No person detected. Please make sure you are in the frame.'
        suspicious = True 
    elif count > 1: 
        message = 'More than one person detected. Please make sure you are the only person in the frame.'
        suspicious = True
    print('Phone')
    return suspicious, message

# Function to detect and return the head pose
def detectHeadPose(image):
    results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if results.multi_face_landmarks:
        face_3d = []
        face_2d = []

        for face_landmarks in results.multi_face_landmarks:
            for idx, lm in enumerate(face_landmarks.landmark):
                if idx == 33 or idx == 263 or idx == 1 or idx == 61 or idx == 291 or idx == 199:
                    x, y = int(lm.x * image.shape[1]), int(lm.y * image.shape[0])

                    # Get the 2D Coordinates
                    face_2d.append([x, y])

                    # Get the 3D Coordinates
                    face_3d.append([x, y, lm.z])

        # Convert it to the NumPy array
        face_2d = np.array(face_2d, dtype=np.float64)

        # Convert it to the NumPy array
        face_3d = np.array(face_3d, dtype=np.float64)

        # The camera matrix
        focal_length = 1 * image.shape[1]

        cam_matrix = np.array([[focal_length, 0, image.shape[0] / 2],
                                [0, focal_length, image.shape[1] / 2],
                                [0, 0, 1]])

        # The distortion parameters
        dist_matrix = np.zeros((4, 1), dtype=np.float64)

        # Solve PnP
        success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)

        # Get rotational matrix
        rmat, _ = cv2.Rodrigues(rot_vec)

        # Get angles
        angles, _, _, _, _, _ = cv2.RQDecomp3x3(rmat)

        # Get the y rotation degree
        x = angles[0] * 360
        y = angles[1] * 360
        z = angles[2] * 360

        # See where the user's head tilting
        if y < -10:
            pose = "Looking Left"
        elif y > 10:
            pose = "Looking Right"
        elif x < -10:
            pose = "Looking Down"
        elif x > 20:
            pose = "Looking Up"
        else:
            pose = "Forward"

        # return pose
        if pose != "Forward":               # If the user is not looking forward
            message = 'You were found facing away from the screen. Please face the screen.'
            suspicious = True
        else:
            message = ''
            suspicious = False              # If the user is looking forward

        print('Head Pose')

        return suspicious, message

    # return "No Face Detected"
    suspicious = True                       # No face detected
    message = 'No face detected. Please make sure you are in the frame.'
    return suspicious, message


# Function to detect the eye gaze direction
def detectGazeDirection(image):
    

    # Convert the image to RGB (OpenCV uses BGR by default)
    frame = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Send the frame to GazeTracking to analyze it
    gaze.refresh(frame)

    # Get the annotated frame
    frame = gaze.annotated_frame()
    direction = ""

    if gaze.is_blinking():
        direction = "Blinking"
    elif gaze.is_right():
        direction = "Looking right"
    elif gaze.is_left():
        direction = "Looking left"
    elif gaze.is_center():
        direction = "Looking center"

    # left_pupil = gaze.pupil_left_coords()
    # right_pupil = gaze.pupil_right_coords()

    # Print direction to console (you can remove this line if not needed)
    # print(direction)
        
    if direction == "Looking left":
        message = 'You were found looking to the left of the screen. Please look at the screen.'
        suspicious = True
    elif direction == "Looking right":
        message = 'You were found looking to the right of the screen. Please look at the screen.'
        suspicious = True
    else:
        message = ''
        suspicious = False
    
    # return direction, left_pupil, right_pupil
    print('Gaze')
    return suspicious, message
