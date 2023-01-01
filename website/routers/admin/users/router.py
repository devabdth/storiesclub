from flask import Flask, render_template, request

import json


class UsersAdminRouter:
	def __init__(self, app: Flask, config):
		self.app: Flask= app
		self.config= config


		self.assign_users_index()



	def assign_users_index(self):
		@self.app.route('/webapp/adminstration/users/')
		@self.app.route('/webapp/adminstration/')
		def users_index():
			self.config.website_content.load()
			params: dict= dict(request.values)

			users: list = self.config.db.users.find_users_on_condition(params)
			return render_template(
				'/admin/users/index.html',
				params= params,
				config= self.config,
				categories=self.config.categories,
				content=self.config.website_content,
				users= users,
				str= str

			)