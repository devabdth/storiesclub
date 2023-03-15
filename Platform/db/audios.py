import os
from bson.objectid import ObjectId
import pymongo
import time



class AudiosHelper:
	def __init__(self, db_url: str):
		# Connect to database

		self.cover_supported_exts: list = [
			"jpg", "jpeg", "png", "webp", "gif"
		]
		self.asset_supported_exts: list = [
			"mp3"
		]
		self.db_url = db_url
		self.client = pymongo.MongoClient(self.db_url)
		self.database = self.client["storiesClub"]
		self.audios_collection = self.database["audios"]

		self.audios = list(self.audios_collection.find())

	def refresh(self):
		self.audios = list(self.audios_collection.find())

	def find_audios_on_condition(self, params) -> list:
		return list(self.audios_collection.find({
			"name": {
				"$regex": (params["name"] if "name" in params.keys() else "")
			},
			"id": {
				"$regex": (params["id"] if "id" in params.keys() else "")
			},
			"category": (params["category"] if "category" in params.keys() else None)
		}))


	def get_all_audios(self, fetch_by_trending: bool = False):
		try:
			self.refresh()
			if fetch_by_trending:
				return sorted(self.audios, key= lambda d: d['views'], reverse= True)

			return self.audios

		except Exception as e:
			print(e)
			return []

	def create_audio(self, payload):

		try:
			audio_ = {
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

			audio_ = self.audios_collection.insert_one(audio_)
			return audio_.inserted_id

		except Exception as e:
			print(e)
			return -1

	def update_audio(self, id, payload):
		try:
			result =  self.audios_collection.find_one_and_update(
				{'_id': ObjectId(id)},
				{'$set': payload}
			)


			return 1
		except Exception as e:
			print(e)
			return -1

	def get_audio_by_id(self, id: str):
		try:
			audio = self.audios_collection.find({'_id': ObjectId(id)})
			audio = list(audio)
			return dict(audio[0])
		except Exception as e:
			print(e)
			return None


	def get_audios_by_user_id(self, uid: str):
		try:

			audios = self.audios_collection.find({'publisher': ObjectId(uid)})
			return list(audios)
		except Exception as e:
			return []

	def delete_audio_by_id(self, id):

		try:
			audio = self.audios_collection.delete_one({'_id': ObjectId(id)})
			return 1
		except Exception as e:
			return -1

	def get_audio_cover(self, _id):
		for ext in self.cover_supported_exts:
			path_= os.path.abspath(os.path.join(os.path.dirname(__file__), "./covers/audios/{}.{}".format(_id, ext)))
			print(path_)
			if os.path.exists(path_):
				return(path_)
		return None


	def get_audio_asset(self, _id):
		for ext in self.asset_supported_exts:
			path_= os.path.abspath(os.path.join(os.path.dirname(__file__), "./assets/audios/{}.{}".format(_id, ext)))
			print(path_)
			if os.path.exists(path_):
				return(path_)
		return None
