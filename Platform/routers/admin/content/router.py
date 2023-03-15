from flask import Flask, request, render_template, url_for, redirect


class ContentAdminRouter:
	def __init__(self, app: Flask, config):
		self.app: Flask= app
		self.config= config


		self.assign_content_index()
		self.assign_add_category()
		self.assign_delete_category()
		self.assign_update_content()


	def assign_delete_category(self):
		@self.app.route('/webapp/adminstration/content/', methods=["DELETE"])
		def delete_category():
			print(request.values)
			if 'category' in dict(request.values).keys():
				return self.app.response_class(
					status= 200 if self.config.categories.delete_category(dict(request.values)['category']) else 500
				)

			return self.app.response_class(status= 500)


	def assign_content_index(self):
		@self.app.route('/webapp/adminstration/content/', methods=["GET"])
		def content_index():
			self.config.categories.load()
			return render_template(
				"admin/content/index.html",
				config= self.config,
				categories=self.config.categories,
				content=self.config.website_content,
			)


	def assign_update_content(self):
		@self.app.route('/webapp/adminstration/content/', methods=["PATCH"])
		def update_content():
			mode= dict(request.values)["mode"] if "mode" in dict(request.values).keys() else 0
			if mode == 0:
				body= dict(json.loads(request.data))
				return self.app.response_class(status=500)
			elif mode == 1:
				pass
			else:
				return self.app.response_class(status= 404)

	def assign_add_category(self):
		@self.app.route('/webapp/adminstration/categories/', methods=["POST"])
		def category_add_content():
			import json
			import os

			params= dict(request.values)
			mode= params["mode"] if "mode" in params.keys() else 0
			if str(mode) == '0':
				print(request.data)
				print(type(request.data))
				print(type(dict(json.loads(request.data))))
				body= dict(json.loads(request.data))
				res= self.config.categories.create({
					"name": {
						"en": body["enName"],
						"ar": body["arName"]
					},
					"shortBio": {
						"en": body["enDesc"],
						"ar": body["arDesc"]
					}

				})

				if res != None:
					return self.app.response_class(status= 201, response=json.dumps({'_id': res}))
			elif str(mode) == '1':
				if 'cover' in request.files.keys() and 'category' in params :
					cat_id = params['category']

					cover = request.files['cover']
					cover.filename = "{}.{}".format(
						cat_id,
						cover.filename.split('.')[-1]
					)

					save_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../website/images/categories/'))
					print(os.path.exists(save_path))
					try:
						cover.save(os.path.join(save_path, cover.filename))
						if os.path.exists(os.path.join(save_path, cover.filename)):
							return self.app.response_class(status=201)

					except Exception as e:
						print(e)
				return self.app.response_class(status=500)

			else:
				return self.app.response_class(status= 404)