import os 
import torch
from PIL import Image
import numpy as np
from RealESRGAN import RealESRGAN
import base64
from io import BytesIO

from fastapi import FastAPI, File, UploadFile,Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model2 = RealESRGAN(device, scale=2)
model2.load_weights('weights/RealESRGAN_x2.pth', download=True) 

model4 = RealESRGAN(device, scale=4)
model4.load_weights('weights/RealESRGAN_x4.pth', download=True)

model8 = RealESRGAN(device, scale=8)
model8.load_weights('weights/RealESRGAN_x8.pth', download=True)

@app.post("/upscale")
async def root(file: UploadFile = File()):
    image = Image.open(file.file).convert('RGB')
    sr_image = model4.predict(image)
    im_file = BytesIO()
    #sr_image.save('results/hello.png')
    sr_image.save(im_file, format="PNG")
    im_bytes = im_file.getvalue()
    im_b64 = base64.b64encode(im_bytes)
    return {"base64": im_b64}
    #return Response(content=im_bytes, media_type="image/jpg")