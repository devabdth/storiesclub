

from flask import Flask, render_template, request, session, redirect


class PublishRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_publish_router()

    def assign_publish_router(self):
        @self.app.route('/publish/', methods=["GET"])
        def website_publish_index():
            params = dict(request.values)
            
            if "mode" in list(params.keys()) and params["mode"] == "audios":
                mode = 1
            elif "mode" in list(params.keys())and params["mode"] == "videos": 
                mode = 2
            else:
                mode = 0

            lang = session.get("lang", "ar")
            current_user_id = session.get("currentUserId")
            if current_user_id is None:
                return redirect("{}/login/".format(self.config.url))

            return render_template(
                'website/publish/index.html',
                content=self.config.website_content,
                categories=self.config.categories.data,
                lang=lang,
                mode= mode,
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
            