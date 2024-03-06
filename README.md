# Happy & Neutral Face api

This api runs in local environment with using node.js
you need to install node.js 

## files

### package.json
you could check the npm libraries with checking package.json and package-lock.json files. 
I used "onnxruntime-node" library to run the saved AI model that I made in the other project.

### model.onnx
This is the file that you could use AI model to predict the data you need.

### index.js
this is the js file that creates api from the server. I didn't deploy the api yet, but when you run 
```
node index.js
```
this code runs in your local environment. Also, there is an important libraries that you need to know.

#### sharp
sharp is the library that I can preprocess image data. For example, my ai model need a image format of [1,48,48,3].
However, if you call this api, the image could not be a tensor or even size will be different everytime. 
Using resize,toBuffer, and etc methods, you could preprocess the image files into the tensor that fits to the model. 

## how to use
you first need to go the directory that index.js located. Then, you need to type 
```
node index.js
```
into a cmd window.

after that you get the message that the Server is running on port 3000, you are all set!

### how to call API in cmd
```
curl -X POST -F "image=@your_img_path" http://localhost:3000/predict
```
we can use cURL method to call api. this api returns value in json form.
also you could import this api with using url address. 


