
from flask import Flask, render_template, request, send_file, session


class AudioRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_audio_router()
        self.assign_audio_cover()
        self.assign_audio_asset()

    def assign_audio_cover(self):
        @self.app.route('/audio/cover/<id>', methods=["GET"])
        def website_audio_cover(id):
            file_ = self.config.db.audios.get_audio_cover(id)
            if file_ == None:
                return self.app.response_class(status=404)
            return send_file(file_)


    def assign_audio_asset(self):
        @self.app.route('/audio/asset/<id>', methods=["GET"])
        def website_audio_asset(id):
            file_ = self.config.db.audios.get_audio_asset(id)
            if file_ == None:
                return self.app.response_class(status=404)

            audio_ = self.config.db.audios.get_audio_by_id(id)
            self.config.db.audios.update_audio(id, {'views': (int(audio_["views"]) +1)})
            return send_file(file_)

    def assign_audio_router(self):
        @self.app.route('/audio/<id>', methods=["GET"])
        def website_audio_index(id):
            params = dict(request.values)
            lang = session.get("lang", "ar")
            
            audio = self.config.db.audios.get_audio_by_id(id)
            print(audio["publisher"])
            audio["user"] = self.config.db.users.get_user_by_id(str(audio["publisher"]))

            current_user_id = session.get("currentUserId", None)
            if not current_user_id is None:
                current_user_data = self.config.db.users.get_user_by_id(current_user_id)

            print(audio)

            return render_template(
                'website/audio/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                list= list,
                lang=lang,
                audio=audio,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                    "url": self.config.url,
                },
                len=len,
                loggedin=current_user_id != None,
                trending_audios=self.config.db.audios.get_all_audios(fetch_by_trending= True),
                check_if_arabic=self.config.check_if_arabic,

            )
