
FROM python:3.6-slim
COPY . /deploy/
WORKDIR /deploy/
RUN pip3 install --no-cache-dir -r requirements.txt
RUN	pip3 install pymongo pandas
EXPOSE 80
ENTRYPOINT ["python", "app.py"]

