from flask import Flask, render_template, request

import json


class AudiosAdminRouter:
	def __init__(self, app: Flask, config):
		self.app: Flask= app
		self.config= config


		self.assign_audios_index()



	def assign_audios_index(self):
		@self.app.route('/webapp/adminstration/audios/')
		def audios_index():
			self.config.website_content.load()
			params: dict= dict(request.values)

			audios: list = self.config.db.audios.find_audios_on_condition(params)
			return render_template(
				'/admin/audios/index.html',
				lang="en",
				params= params,
				config= self.config,
				categories=self.config.categories,
				content=self.config.website_content,
				audios= audios,
				str= str

			)