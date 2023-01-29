import os
from bson.objectid import ObjectId
import pymongo
import time



class VideosHelper:
	def __init__(self, db_url: str):
		# Connect to database

		self.cover_supported_exts: list = [
			"jpg", "jpeg", "png", "webp", "gif"
		]
		self.asset_supported_exts: list = [
			"mp4"
		]
		self.db_url = db_url
		self.client = pymongo.MongoClient(self.db_url)
		self.database = self.client["storiesClub"]
		self.videos_collection = self.database["videos"]

		self.videos = list(self.videos_collection.find())

	def find_videos_on_condition(self, params) -> list:
		return list(self.videos_collection.find({
			"name": {
				"$regex": (params["name"] if "name" in params.keys() else "")
			},
			"id": {
				"$regex": (params["id"] if "id" in params.keys() else "")
			},
			"category": (params["category"] if "category" in params.keys() else None)
		}))



	def get_all_videos(self, fetch_by_trending: bool = False):
		try:
			if fetch_by_trending:
				return sorted(self.videos, key= lambda d: d['views'], reverse= True)

			return self.videos

		except Exception as e:
			print(e)
			return []
	def create_video(self, payload):

		try:
			video_ = {
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

			video_ = self.videos_collection.insert_one(video_)
			return video_.inserted_id

		except Exception as e:
			print(e)
			return -1

	def update_video(self, id, payload):
		try:
			result =  self.videos_collection.find_one_and_update(
				{'_id': ObjectId(id)},
				{'$set': payload}
			)


			return 1
		except Exception as e:
			print(e)
			return -1

	def get_video_by_id(self, id: str):
		try:
			video = self.videos_collection.find({'_id': ObjectId(id)})
			video = list(video)
			return dict(video[0])
		except Exception as e:
			print(e)
			return None


	def get_videos_by_user_id(self, uid: str):
		try:

			videos = self.videos_collection.find({'publisher': ObjectId(uid)})
			return list(videos)
		except Exception as e:
			print(e)
			return []

	def delete_video_by_id(self, id):

		try:
			video = self.videos_collection.delete_one({'_id': ObjectId(id)})
			return 1
		except Exception as e:
			return -1

	def get_video_cover(self, _id):
        for ext in self.cover_supported_exts:
            path_= os.path.abspath(os.path.join(os.path.dirname(__file__), "./covers/videos/{}.{}".format(_id, ext)))
            print(path_)
            if os.path.exists(path_):
                return(path_)
        return None

	def get_video_asset(self, _id):
        for ext in self.asset_supported_exts:
            path_= os.path.abspath(os.path.join(os.path.dirname(__file__), "./assets/videos/{}.{}".format(_id, ext)))
            print(path_)
            if os.path.exists(path_):
                return(path_)
        return None
