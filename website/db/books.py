import os
from bson.objectid import ObjectId
import pymongo
import time



class BooksHelper:
	def __init__(self, db_url: str):
		# Connect to database

		self.cover_supported_exts: list = [
			"jpg", "jpeg", "png", "webp", "gif"
		]
		self.asset_supported_exts: list = [
			"pdf"
		]
		self.db_url = db_url
		self.client = pymongo.MongoClient(self.db_url)
		self.database = self.client["storiesClub"]
		self.books_collection = self.database["books"]

		self.books = list(self.books_collection.find())


	def find_books_on_condition(self, params) -> list:
		return list(self.books_collection.find({
			"name": {
				"$regex": (params["name"] if "name" in params.keys() else "")
			},
			"id": {
				"$regex": (params["id"] if "id" in params.keys() else "")
			},
			"category": (params["category"] if "category" in params.keys() else None)
		}))




	def get_all_books(self, fetch_by_trending: bool = False):
		try:
			if fetch_by_trending:
				return sorted(self.books, key= lambda d: d['views'], reverse= True)

			return self.books

		except Exception as e:
			print(e)
			return []

	def create_book(self, payload):

		try:
			book_ = {
				"title": payload["title"],
				"desc": payload["desc"],
				"publisher": payload["publisher"],
				"book": "",
				"ph": "",
				"publishedIn": round(time.time() * 1000),
				"category": payload["category"],
				"views": 0,
				"parts": [],
				"likers": [],
				"comments": [],
				"__v": 0
			}

			book_ = self.books_collection.insert_one(book_)
			return book_.inserted_id

		except Exception as e:
			print(e)
			return -1

	def update_book(self, id, payload):
		try:
			result =  self.books_collection.find_one_and_update(
				{'_id': ObjectId(id)},
				{'$set': payload}
			)


			return 1
		except Exception as e:
			print(e)
			return -1

	def get_book_by_id(self, id: str):
		try:
			book = self.books_collection.find({'_id': ObjectId(id)})
			book = list(book)
			return dict(book[0])
		except Exception as e:
			print(e)
			return None

	def get_books_by_user_id(self, uid: str):
		try:

			books = self.books_collection.find({'publisher': ObjectId(uid)})
			return list(books)
		except Exception as e:
			return []

	def delete_book_by_id(self, id):

		try:
			book = self.books_collection.delete_one({'_id': ObjectId(id)})
			return 1
		except Exception as e:
			return -1

	def get_book_cover(self, _id):
		for ext in self.cover_supported_exts:
			path_= os.path.abspath(os.path.join(os.path.dirname(__file__), "./covers/books/{}.{}".format(_id, ext)))
			print(path_)
			if os.path.exists(path_):
				return(path_)
		return None

	def get_book_asset(self, _id):
		for ext in self.asset_supported_exts:
			path_= os.path.abspath(os.path.join(os.path.dirname(__file__), "./assets/books/{}.{}".format(_id, ext)))
			print(path_)
			if os.path.exists(path_):
				return(path_)
		return None
