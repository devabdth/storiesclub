

from flask import Flask, render_template, request, session


class AboutRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_about_router()

    def assign_about_router(self):
        @self.app.route('/about/', methods=["GET"])
        def website_about_index():
            params = dict(request.values)
            lang = session.get("lang", "ar")

            if not "category" in list(params.keys()):
                current_category = None
            else:
                current_category = params["category"]

            if not "token" in list(params.keys()):
                token = None
            else:
                token = params["token"]

            return render_template(
                'website/about/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                lang=lang or "en",
                loggedin=session.get('currentUserId') != None,
                current_category=current_category,
                token=token,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                }
            )
            