import onnxruntime as ort

# 모델 로드
session = ort.InferenceSession("C:/Users/부일기획/Desktop/개발/image_classification_API/image-classification-api/model.onnx")


# 입력 레이어 이름 얻기
input_name = session.get_outputs()[0].name
print("Input layer name:", input_name)
