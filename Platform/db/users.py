import os
import pymongo
import time
import datetime
from bson.objectid import ObjectId

from .audios import AudiosHelper
from .videos import VideosHelper
from .books import BooksHelper

class UsersHelper:

    def __init__(self, db_url: str):
        self.cities = [
            'alex','aswan','asyut','behira','beni_suef','cairo',
            'dakahlia','damietta','faiyum','gharbia','giza','ismailia',
            'kafr_sheikh','luxor','matruh','minya','monufia','wadi_geded',
            'north_sinai','port_said','qalyubia','qena','red_sea','sharqia',
            'sohag','south_sinai','suez',
        ]

        self.genders = [
            "male",
            "female",
            "preferNotToSay",
        ]

        self.db_url = db_url
        self.client = pymongo.MongoClient(self.db_url)
        self.database = self.client["storiesClub"]
        self.users_collection = self.database["users"]
        self.supported_exts: list = [
                "jpg", "jpeg", "png", "webp", "gif"
                ]
        
        self.users = list(self.users_collection.find())

    def find_users_on_condition(self, params) -> list:
        return list(self.users_collection.find({
            "name": {
                "$regex": (params["name"] if "name" in params.keys() else "")
            },
            "email": {
                "$regex": (params["email"] if "email" in params.keys() else "")
            },
        }))



    def get_user_by_email(self, email: str) -> dict:
        try:
            user = self.users_collection.find({'email': email})
            user = list(user)
            return dict(user[0])
        except Exception as e:
            print(e)
            return None

    def get_user_by_phone(self, phone: str) -> dict:
        try:
            user = self.users_collection.find({'phoneNumber': phone})
            user = list(user)
            return dict(user[0])
        except Exception as e:
            return None

    def get_user_by_id(self, id: str, login: bool= False) -> dict:
        try:
            user = self.users_collection.find({'_id': ObjectId(id)})
            user = list(user)
            user= dict(user[0])
            last_login_data = datetime.datetime.fromtimestamp(user['lastLogIn']/1000)
            today = datetime.datetime.today()
            if login:
                if last_login_data.day != today.day and last_login_data.month != today.month and last_login_data.year != today.year:
                    self.update_user(user['_id'], payload= {'loggingStreak': user['loggingStreak'] + 1, 'lastLogIn': round(time.time() * 1000)})

            return user
        except Exception as e:
            print(e)
            return None


    def create_user(self, payload: dict) -> str:
        try:
            user_ = {
              "name": payload["name"],
              "email": payload["email"],
              "bio": payload["bio"],
              "password": payload["password"],
              "phoneNumber": payload["phone"],
              "withdrawlBankAccount": "",
              "withdrawlPhoneWallet": "",
              "loggingStreak": 0,
              "gender": self.genders.index(payload["currentGender"]),
              "cityCode": self.cities.index(payload["currentCity"]),
              "publishes": [],
              "withdrawlRequests": [],
              "verified": False,
              "joinedIn": round(time.time() * 1000),
              "lastLogIn": round(time.time() * 1000),
              "wallet": 0,
              "log": {},
              "__v": 0
            }
            print(user_)

            user_ = self.users_collection.insert_one(user_)
            print(user_.inserted_id)
            return user_.inserted_id

        except Exception as e:
            print(e)
            return None

    def update_user(self, id: str, payload: dict) -> bool:
        try:
            result = self.users_collection.find_one_and_update({'_id': ObjectId(id)}, {'$set': payload})
            print(result)
            return True
        except Exception as e:
            print(e)
            return False



    def get_user_cover(self, _id):
        for ext in self.supported_exts:
            if os.path.exists(os.path.abspath(os.path.join(os.path.dirname(__file__), "./covers/users/{}.{}".format(_id, ext)))):
                return os.path.abspath(os.path.join(os.path.dirname(__file__), "./covers/users/{}.{}".format(_id, ext)))


    def get_user_asset(self, _id):
        for ext in self.supported_exts:
            if os.path.exists(os.path.abspath(os.path.join(os.path.dirname(__file__), "./assets/users/{}.{}".format(_id, ext)))):
                return os.path.abspath(os.path.join(os.path.dirname(__file__), "./assets/users/{}.{}".format(_id, ext)))

    def get_user_posts(self, _id):
        return {
            "audios": AudiosHelper(self.db_url).get_audios_by_user_id(_id),
            "videos": VideosHelper(self.db_url).get_videos_by_user_id(_id),
            "books": BooksHelper(self.db_url).get_books_by_user_id(_id),
        }

