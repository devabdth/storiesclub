from flask import Flask, render_template, request, session


class HomeRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_home_router()

    def assign_home_router(self):
        @self.app.route('/', methods=["GET"])
        @self.app.route('/home/', methods=["GET"])
        @self.app.route('/index/', methods=["GET"])
        def website_home_index():
            self.config.website_content.load()
            lang = session.get("lang", "ar")
            return render_template(
                'website/home/index.html',
                header_desc=self.config.header_desc,
                keywords=self.config.header_keywords,
                categories=self.config.categories,
                content=self.config.website_content,
                lang=lang or "en",
                user=self.config.db.users.get_user_by_id(
                    id=session.get("currentUserId"), login= True),
                trending_videos=self.config.db.videos.get_all_videos(fetch_by_trending= True),
                trending_audios=self.config.db.audios.get_all_audios(fetch_by_trending= True),
                trending_books=self.config.db.books.get_all_books(fetch_by_trending= True),
                loggedin=session.get('currentUserId') != None,
                check_if_arabic=self.config.check_if_arabic,
                len=len,
                list=list,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                }
            )
