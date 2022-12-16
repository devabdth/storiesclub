
from flask import Flask, render_template, request, session


class ConfigRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config
        self.params = [
            "lang"
        ]

        self.assign_config_router()

    def assign_config_router(self):
        @self.app.route('/config/', methods=["GET"])
        def website_config_index():
            params = dict(request.values)
            for param in params.keys():
                if param in self.params:
                    session[param] = params[param]

            return self.app.response_class(status=200)
