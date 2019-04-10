from flask import Flask
from flask_restful import Api, Resource, reqparse
#imports - just open cv atm
import werkzeug, os
import random
import cv2
import glob # reading images from local folder

app = Flask(__name__)
api = Api(app)

users = [
    {
        "name": "Liam",
        "age": "19",
        "ocupation": "student"
    }
]

class Process():
    #remove the red and blue value from each pixel
    def remove_RB(image):
        rows,columns,channels = image.shape
        for x in range(rows):
            for y in range(columns):
                image[x, y, 0] = 0 # remove red value
                image[x, y, 2] = 0 # remove blue value
        return image
    #islates hand and creates mask (current sweet spot 130-150 blue value)
    def isolate_hand(image):
        rows,columns,channels = image.shape
        count = 0
        for x in range(rows):
            for y in range(columns):
                # check if blue is greater than 150, changed to black
                if(image[x, y, 2] <= 100):
                    image[x, y, 0] = 0
                    image[x, y, 1] = 0
                    image[x, y, 2] = 0
                else:
                    count += 1 #count of hand pixels
        return image, count
    #counts pixels where gel present (current sweet spot green channel > 5)
    def count_coverage(image):
        rows,columns,channels = image.shape
        count = 0
        for x in range(rows):
            for y in range(columns):
                if (image[x, y, 1] > 3):
                    count += 1
        return count

    # #TESTING
    # path = glob.glob('handwash/*.jpg') #import images from folder stored in path
    # image_list = []
    # for file in path:
    #     image = cv2.imread(file) #read image
    #     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) #convert to RGB
    #     image_list.append(image) #adds image to list
    # test = image_list[4] #choose random image from
    # mask, count = isolate_hand(test)
    # result = remove_RB(mask)
    # coverage = count_coverage(result)
    # percent = coverage/count
    # print(percent)

class Image(Resource):

    def get(self):
        for user in users:
            if("Liam" == user["name"]):
                return user, 200
        return "User not found", 404

    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parser.parse_args()

        body = args['file']
        body.save("files/{}".format(body.filename))

        # "./files/{}".format(filename)
        image = cv2.imread("files/{}".format(body.filename))

        # cv2.imwrite('my.jpg', image, [cv2.IMWRITE_JPEG_QUALITY, 30])

        # image = cv2.imread("my.jpg")
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        mask, count = Process.isolate_hand(image)
        result = Process.remove_RB(mask)
        coverage = Process.count_coverage(result)
        try:
            percent = coverage/count
        except:
            percent = 0

        responce = {
            # "coverage": coverage,
            # "mask": mask,
            "percent": percent
        }

        return responce, 201

api.add_resource(Image, "/image")
app.run(debug=True)