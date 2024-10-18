FROM python:3.11-bookworm

WORKDIR /sharenote-py

COPY requirements.txt gunicorn.conf.py main.py ./

COPY assets ./assets

RUN pip install -r requirements.txt

CMD ["gunicorn", "main:flask_app"]
