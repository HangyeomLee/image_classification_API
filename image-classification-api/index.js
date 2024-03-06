const express = require('express');
const ort = require('onnxruntime-node');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const upload = multer({ dest: 'uploads/' });

// 모델 로드 (모델 경로가 정확해야 함)
const sessionPromise = ort.InferenceSession.create("model.onnx");

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const data = await sharp(req.file.path)
      .resize(48, 48)
      .toColourspace('srgb')
      .removeAlpha()
      .raw()
      .toBuffer();

    const floatData = Float32Array.from(data);
    const tensor = new ort.Tensor('float32', floatData, [1, 48, 48, 3]);

    const session = await sessionPromise;
    const feeds = { args_0: tensor };
    const results = await session.run(feeds);
    const outputTensor = results.dense_1; // 'output'는 모델의 출력 레이어 이름에 따라 다를 수 있음

    // 'outputTensor.data'는 예측 확률 배열을 포함
    // 예측 클래스 ('happy', 'neutral')에 따른 인덱스를 알아야 함
    // 예제: [0.1, 0.9] -> 'neutral' 확률이 더 높음
    const prediction = {
      happy: outputTensor.data[0],
      neutral: outputTensor.data[1]
    };

    res.json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  } finally {
    fs.unlinkSync(req.file.path); // 업로드된 파일 삭제
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
