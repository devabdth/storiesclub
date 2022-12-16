

from flask import Flask, render_template, request, session, redirect


class ProfileRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_profile_router()

    def assign_profile_router(self):
        @self.app.route('/profile/', methods=["GET"])
        def website_profile_index():
            params = dict(request.values)
            lang = session.get("lang", "ar")
            current_user_id = session.get('currentUserId', None)
            if current_user_id == None:
                return redirect('{}/login/'.format(self.config.url))

            current_user_data = self.config.db.users.get_user_by_id(id= current_user_id, login= True)
            current_user_posts = self.config.db.users.get_user_posts(current_user_id)

            return render_template(
                'website/profile/index.html',
                content=self.config.website_content,
                lang=lang or "en",
                categories=self.config.categories.data,
                loggedin=current_user_id != None,
                current_user_data= current_user_data,
                timestamp_to_readable_data=self.config.timestamp_to_readable_data,
                books= current_user_posts["books"],
                audios= current_user_posts["audios"],
                videos= current_user_posts["videos"],
                len= len,
                calc_total_views= self.config.calc_total_views,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                    "url": self.config.url
                }
            )
            

