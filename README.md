# AI-Image-Tools

### Installation

#### Backend

##### Local install

```
cd backend/app
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

##### Docker install

```
cd backend/app
docker build -t backend .
docker run --rm -dit -p 8000:8000 backend:latest 

For Single CPU -cpuset-cpus="<CPU CORE Number>"
docker run --rm -dit --cpuset-cpus="3" -p 8000:8000 backend:latest 

```

API Docs:  http://localhost:8000/docs

#### Frontend

##### Local install

```
cd frontend
npm i
npm start
```

##### Docker install

```
cd frontend
docker build -t frontend .
docker run --rm -dit -p 3000:3000 frontend:latest 
```
Home Page:  http://localhost:3000