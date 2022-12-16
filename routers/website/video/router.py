
from flask import Flask, render_template, request, send_file, session


class VideoRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_video_router()
        self.assign_video_cover()
        self.assign_video_asset()

    def assign_video_cover(self):
        @self.app.route('/video/cover/<id>', methods=["GET"])
        def website_video_cover(id):
            file_ = self.config.db.videos.get_video_cover(id)
            if file_ == None:
                return self.app.response_class(status=404)
            return send_file(file_)


    def assign_video_asset(self):
        @self.app.route('/video/asset/<id>', methods=["GET"])
        def website_video_asset(id):
            file_ = self.config.db.videos.get_video_asset(id)
            print(file_)
            if file_ == None:
                return self.app.response_class(status=404)

            video_ = self.config.db.videos.get_video_by_id(id)
            self.config.db.videos.update_video(id, {'views': (int(video_["views"]) +1)})

            return send_file(file_)

    def assign_video_router(self):
        @self.app.route('/video/<id>', methods=["GET"])
        def website_video_index(id):
            params = dict(request.values)
            lang = session.get("lang", "ar")
            
            video = self.config.db.videos.get_video_by_id(id)
            video["user"] = self.config.db.users.get_user_by_id(video["publisher"])
            print(self.config.db.users.get_user_by_id(video["publisher"]))

            current_user_id = session.get("currentUserId", None)
            if not current_user_id is None:
                current_user_data = self.config.db.users.get_user_by_id(current_user_id)


            return render_template(
                'website/video/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                list= list,
                lang=lang,
                video=video,
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
                trending_videos=self.config.db.videos.get_all_videos(fetch_by_trending= True),
                check_if_arabic=self.config.check_if_arabic,

            )
