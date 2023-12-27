FROM python:3.8

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# Build psycopg2-binary from source -- add required required dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev python3-dev ffmpeg libsm6 libxext6 && \
        pip install --upgrade pip setuptools wheel && \
        pip install --no-cache-dir -r requirements.txt
# RUN apk add --virtual .build-deps --no-cache alpine-sdk postgresql-dev gcc g++ python3-dev musl-dev && \
#         pip install --upgrade pip setuptools wheel && \
#         pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]