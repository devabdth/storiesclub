
FROM python:3.6-slim
COPY . /deploy/
WORKDIR /deploy/
RUN pip3 install --no-cache-dir -r requirements.txt
RUN	pip3 install pymongo pandas
RUN pip3 install "pymongo[srv]"
EXPOSE 80
ENTRYPOINT ["python", "app.py"]

