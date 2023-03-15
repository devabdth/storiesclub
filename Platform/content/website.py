import json
import os


class WebsiteContent:
    def __init__(self):
        self.load()

    def load(self):
        with open(os.path.join(os.path.dirname(__file__), 'websiteContent.json'), encoding='utf-8') as f:
            self.data = dict(json.loads(f.read()))

        self.tabs = self.data["header"]["tabs"]
        self.entry = self.data["entry"]
        self.global_ = self.data["global"]
        self.auth = self.data["auth"]
        self.books = self.data["books"]
        self.audios = self.data["audios"]
        self.videos = self.data["videos"]
        self.publish = self.data["publish"]
        self.users = self.data["users"]
        self.cities = self.data["cities"]
        self.about = self.data["about"]
