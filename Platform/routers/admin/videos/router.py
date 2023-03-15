from flask import Flask, render_template, request

import json


class VideosAdminRouter:
	def __init__(self, app: Flask, config):
		self.app: Flask= app
		self.config= config


		self.assign_videos_index()



	def assign_videos_index(self):
		@self.app.route('/webapp/adminstration/videos/')
		def videos_index():
			self.config.website_content.load()
			params: dict= dict(request.values)

			videos: list = self.config.db.videos.find_videos_on_condition(params)
			return render_template(
				'/admin/videos/index.html',
				lang="en",
				params= params,
				config= self.config,
				categories=self.config.categories,
				content=self.config.website_content,
				videos= videos,
				str= str

			)