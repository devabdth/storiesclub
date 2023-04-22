from flask import Flask, render_template, request, session, redirect
import json
import os
import time

class VideosRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_videos_router()
        self.assign_videos_delete_router()
        self.assign_videos_post_router()


    def assign_videos_post_router(self):
        @self.app.route('/videos/', methods=["POST"])
        def website_videos_post():
            user_id = session.get("currentUserId", None)
            if user_id is None:
                return redirect('{}/login/'.format(self.config.url))

            modes = ['post', 'covers', 'assets']
            params = dict(request.values)
            if 'mode' not in params.keys():
                mode = 0
            else:
                mode = modes.index(params['mode'])

            print(mode)

            if mode == 0:
                try:
                    body = dict(json.loads(request.data))
                    body["category"] = int(body["category"])
                    body['_id'] = ""
                    body['publishedIn'] = time.time() * 1000
                    body['likers'] = []
                    body['comments'] = []
                    body['views'] = 0
                    body['publisher'] = user_id
                    body['ph'] = ''
                    post_id = self.config.db.videos.create_video(body)
                    if post_id != -1:
                        return self.app.response_class(status=201, response=json.dumps({'_id': str(post_id)}))


                    return self.app.response_class(status=500)
                except Exception as e:
                    print(e)
                    return self.app.response_class(status=500)

            if mode == 1:
                if 'cover' in request.files.keys() and 'video' in params :
                    video_id = params['video']

                    cover = request.files['cover']
                    cover.filename = "{}.{}".format(
                        video_id,
                        cover.filename.split('.')[-1]
                    )

                    save_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/covers/videos/'))
                    if not os.path.exists(save_path):                        
                        os.mkdir(save_path)                    
                    try:
                        cover.save(os.path.join(save_path, cover.filename))
                        if os.path.exists(os.path.join(save_path, cover.filename)):
                            return self.app.response_class(status=201)

                    except Exception as e:
                        print(e)
                return self.app.response_class(status=500)

            if mode == 2:
                if 'asset' in request.files.keys() and 'video' in params :
                    video_id = params['video']

                    asset = request.files['asset']
                    asset.filename = "{}.{}".format(
                        video_id,
                        asset.filename.split('.')[-1]
                    )

                    save_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/assets/videos/'))
                    if not os.path.exists(save_path):                        
                        os.mkdir(save_path)                    
                    try:
                        asset.save(os.path.join(save_path, asset.filename))
                        if os.path.exists(os.path.join(save_path, asset.filename)):
                            return self.app.response_class(status=201)

                    except Exception as e:
                        print(e)
                return self.app.response_class(status=500)




    def assign_videos_delete_router(self):
        @self.app.route('/videos/', methods=["DELETE"])
        def website_videos_delete():

            try:
                video_id = dict(request.values)['id']
                self.config.db.videos.delete_video_by_id(video_id)
                
                return self.app.response_class(status=200)
            except Exception as e:
                return self.app.response_class(status=500)

    def assign_videos_router(self):
        @self.app.route('/videos/', methods=["GET"])
        def website_videos_index():
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

            for video in self.config.db.videos.get_all_videos():
                print(list(self.config.categories.data.values())[video["category"]])
            return render_template(
                'website/videos/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                lang=lang or "en",
                current_category=current_category,
                loggedin=session.get('currentUserId') != None,
                token=token,
                videos= self.config.db.videos.get_all_videos(),
                check_if_arabic= self.config.check_if_arabic,
                len= len,
                list= list,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                }
            )
