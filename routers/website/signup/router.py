
from flask import Flask, render_template, request, session
import json


class SignUpRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_signup_router()
        self.assign_signup_operations()


    def assign_signup_operations(self):
        @self.app.route("/signup/", methods=["POST"])
        def signup_operations():
            try:
                payload = dict(json.loads(request.data))
                if not ("email" in payload.keys() and "password" in payload.keys() and "phone" in payload.keys()):
                    return self.app.response_class(status=500)

                emailUnique = self.config.db.users.get_user_by_email(payload['email']) == None
                phoneUnique = self.config.db.users.get_user_by_phone(payload['phone']) == None
                if not emailUnique:
                    return self.app.response_class(status=203)
                if not phoneUnique:
                    return self.app.response_class(status=204)
                if emailUnique and phoneUnique:
                    session['currentUserEmail'] = payload['email']
                    session['currentUserPassword'] = payload['password']
                    session['currentUserPhoneNumber'] = payload['phone']

                return self.app.response_class(status=201)
            except Exception as e:
                print(e)
                return self.app.response_class(status=500)

    def assign_signup_router(self):
        @self.app.route('/signup/', methods=["GET"])
        def website_signup_index():
            lang = session.get("lang", "ar")
            return render_template(
                'website/signup/index.html',
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
