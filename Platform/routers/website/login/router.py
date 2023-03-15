
from flask import Flask, render_template, request, session
import json


class LoginRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_login_router()
        self.assign_validation()

    def assign_validation(self):
        @self.app.route('/login/validate/', methods=["PATCH"])
        def website_login_validate():
            try:
                payload = json.loads(request.data)
                return self.app.response_class(status=200)
            except Exception as e:
                print(e)
                return self.app.response_class(status=500)

    def assign_login_router(self):
        @self.app.route('/login/', methods=["GET"])
        def website_login_index():
            lang = session.get("lang", "ar")

            return render_template(
                'website/login/index.html',
                content=self.config.website_content,
                lang=lang,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                    "url": self.config.url,
                }
            )
