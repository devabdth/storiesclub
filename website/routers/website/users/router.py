from flask import Flask, render_template, request, session, send_file, redirect
import json
import os


class UsersRouter:
	def __init__(self, app: Flask, config):
		self.app = app
		self.config = config

		self.assign_user_login_router()
		self.assign_user_logout_router()
		self.assign_user_cover()
		self.assign_user_asset()
		self.assign_user_follow()
		self.assign_user_unfollow()
		self.assign_user_visit()
		self.assign_users_post_router()
		self.assign_profile_router()



	def assign_users_post_router(self):
		@self.app.route('/users/', methods=["POST"])
		def website_users_post():
			user_id = session.get("currentUserId", None)
			if user_id is None:
				return redirect('{}/login/'.format(self.config.url))

			modes = ['covers', 'assets']
			params = dict(request.values)
			if 'mode' not in params.keys():
				mode = 0
			else:
				mode = modes.index(params['mode'])

			if mode == 0:
				if 'cover' in request.files.keys() :

					cover = request.files['cover']
					cover.filename = "{}.{}".format(
						user_id,
						cover.filename.split('.')[-1]
					)

					if not os.path.exists(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/covers/users/'))):
						os.makedirs(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/covers/users/')))

					save_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/covers/users/'))
					try:
						cover.save(os.path.join(save_path, cover.filename))
						if os.path.exists(os.path.join(save_path, cover.filename)):
							return self.app.response_class(status=201)

					except Exception as e:
						print(e)
				return self.app.response_class(status=500)

			if mode == 1:
				if 'asset' in request.files.keys() :

					asset = request.files['asset']
					asset.filename = "{}.{}".format(
						user_id,
						asset.filename.split('.')[-1]
					)

					if not os.path.exists(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/assets/users/'))):
						os.makedirs(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/assets/users/')))


					save_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db/assets/users/'))
					try:
						asset.save(os.path.join(save_path, asset.filename))
						if os.path.exists(os.path.join(save_path, asset.filename)):
							return self.app.response_class(status=201)

					except Exception as e:
						print("ERROR: {}".format(e))
				return self.app.response_class(status=500)




	def assign_user_visit(self):
		@self.app.route('/users/<id>/', methods=["GET"])
		def website_user_visit(id):
			current_user_id = session.get("currentUserId", None)
			lang= session.get("lang", "ar")


			user_data = self.config.db.users.get_user_by_id(id)
			user_posts = self.config.db.users.get_user_posts(id)
			if current_user_id == id:

				return render_template(
					'website/profile/index.html',
					content=self.config.website_content,
					lang=lang or "en",
					categories=self.config.categories,
					loggedin=current_user_id != None,
					user_data= user_data,
					timestamp_to_readable_data=self.config.timestamp_to_readable_data,
					books= user_posts["books"],
					audios= user_posts["audios"],
					videos= user_posts["videos"],
					len= len,
					list= list,
					check_if_arabic= self.config.check_if_arabic,
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
			return render_template(
				'website/profile/visit/index.html',
				content=self.config.website_content,
				lang=lang or "en",
				categories=self.config.categories,
				loggedin=current_user_id != None,
				user_data= user_data,
				timestamp_to_readable_data=self.config.timestamp_to_readable_data,
				books= user_posts["books"],
				audios= user_posts["audios"],
				videos= user_posts["videos"],
				len= len,
				list= list,
				check_if_arabic= self.config.check_if_arabic,
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

	def assign_user_follow(self):
		@self.app.route('/users/follow/', methods=["PATCH"])
		def website_user_follow():
			try:
				current_user_id = session.get("currentUserId", None)
				print(current_user_id)
				if current_user_id is None:
					return self.app.response_class(status=401)

				# TODO

				return self.app.response_class(status=200)
			except Exception as e:
				print(e)
				return self.app.response_class(status=500)

	def assign_user_unfollow(self):
		@self.app.route('/users/unfollow/', methods=["PATCH"])
		def website_user_unfollow():
			try:
				current_user_id = session.get("currentUserId", None)
				print(current_user_id)
				if current_user_id is None:
					return self.app.response_class(status=401)

				# TODO

				return self.app.response_class(status=200)
			except Exception as e:
				print(e)
				return self.app.response_class(status=500)


	def assign_user_cover(self):
		@self.app.route('/user/cover/<id>', methods=["GET"])
		def website_user_cover(id):
			file_ = self.config.db.users.get_user_cover(id)
			if file_ == None:
				return self.app.response_class(status=404)
			return send_file(file_)

	def assign_user_asset(self):
		@self.app.route('/user/asset/<id>', methods=["GET"])
		def website_user_asset(id):
			file_ = self.config.db.users.get_user_asset(id)
			if file_ == None:
				return self.app.response_class(status=404)
			print(file_)
			return send_file(file_)

	def assign_user_logout_router(self):
		@self.app.route('/users/logout/', methods=["PATCH"])
		def website_users_logout_index():
			session['currentUserId'] = None
			session['currentUserEmail'] = None
			return self.app.response_class(status=200)

	def assign_user_login_router(self):
		@self.app.route('/users/login/', methods=["PATCH"])
		def website_users_index():
			try:

				body = dict(json.loads(request.data))
				user = self.config.db.users.get_user_by_email(
					email=body['username'])
				if user is None:
					return self.app.response_class(status=404)

				if user['password'] != body['password']:
					self.config.db.users.get_user_by_id(id= user['_id'], login= True)
					return self.app.response_class(status=301)

				if user['password'] == body['password']:
					session['currentUserId'] = user['_id']
					session['currentUserEmail'] = user['email']
					return self.app.response_class(status=200)

				return self.app.response_class(status=500)
			except Exception as e:
				print(e)
				return self.app.response_class(status=500)


	def assign_profile_router(self):
		@self.app.route('/profile/', methods=["GET"])
		def website_profile_index():
			params = dict(request.values)
			lang = session.get("lang", "ar")
			current_user_id = session.get('currentUserId', None)
			if current_user_id == None:
				return redirect('{}/login/'.format(self.config.url))

			return redirect('{}/users/{}'.format(self.config.url, current_user_id))
			


	def assign_user_signup_router(self):
		@self.app.route('/users/join/', methods=["PATCH"])
		def website_users_index():
			return self.app.response_class(status=500)

	def assign_user_update_router(self):
		@self.app.route('/users/patch/', methods=["PATCH"])
		def website_users_index():
			return self.app.response_class(status=500)
