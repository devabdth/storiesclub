

from flask import Flask, render_template, request, session


class EarnMoreRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_earnmore_router()

    def assign_earnmore_router(self):
        @self.app.route('/earnMore/', methods=["GET"])
        def website_earnmore_index():
            lang = session.get("lang", "ar")
            return render_template(
                'website/earnmore/index.html',
                content=self.config.website_content,
                lang=lang,
                loggedin=session.get('currentUserId') != None,
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
            