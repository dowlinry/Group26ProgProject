# Group26ProgProject 
Surewash Handwash App

How to run the project:

1. Clone the repository.

2. cd cloned/repository/path/webservice

3. python app.ppy

4. ./ngrok http <port the webservice is running on>

5. cd cloned/repository/path/Website

6. open RealTime.html

7. cd cloned/repository/path/HandWashApp

8. edit /screens/CameraScreen1.js

9. Replace http://8c41529b.ngrok.io/image with http://<hash provided by step 4>.ngrok.io/image

10. cd ../; npm i

11. react-native link

12. react-native run-android
