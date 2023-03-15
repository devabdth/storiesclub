from flask import Flask, render_template, request

import json


class BooksAdminRouter:
	def __init__(self, app: Flask, config):
		self.app: Flask= app
		self.config= config


		self.assign_books_index()



	def assign_books_index(self):
		@self.app.route('/webapp/adminstration/books/')
		def books_index():
			self.config.website_content.load()
			params: dict= dict(request.values)

			books: list = self.config.db.books.find_books_on_condition(params)
			return render_template(
				'/admin/books/index.html',
				lang="en",
				params= params,
				config= self.config,
				categories=self.config.categories,
				content=self.config.website_content,
				books= books,
				str= str

			)