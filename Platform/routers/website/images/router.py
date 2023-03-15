
from flask import Flask, send_file
from flask_session import Session
import os


class ImagesRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config
        self.exts = ["jpg", "png", "gif", "webp"]

        self.assign_categories_images()

    def assign_categories_images(self):
        @self.app.route('/images/categories/<id>/', methods=["GET"])
        def categories_images(id):
            for ext in self.exts:
                path_ = os.path.abspath(
                    os.path.join(os.path.dirname(__file__), 'categories/{}.{}'.format(id, ext)))
                print(path_)
                if os.path.exists(path_):
                    return send_file(path_)

            return self.app.response_class(status=404)
