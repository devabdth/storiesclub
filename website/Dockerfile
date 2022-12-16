FROM python:3.8

COPY nginx.conf /etc/nginx

Copy . /srv/storiesclub
WORKDIR /srv/storiesclub

Run pip3 install -r requirements.txt --src /usr/local/src
RUN pip3 install uwsgi


CMD service nginx start && uwsgi --ini uwsgi.ini
