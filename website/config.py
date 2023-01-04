import os
import sys
from enum import Enum

from content.categories import CategoriesContent
from content.website import WebsiteContent

from db import DatabaseHelper


class Config():

    def __init__(self):
        self.debug_mode_token = "DEBUG"
        self.production_mode_token = "PROD"

        self.port = os.environ.get("PORT") or 3030
        self.mode = os.environ.get("MODE") or self.debug_mode_token
        self.auth_key = os.environ.get("AUTH_KEY") or "1234567890"
        self.url = os.environ.get("URL") or "http://127.0.0.1:5000"
        self.db_url = os.environ.get(
            "DB_URL") or "mongodb+srv://website:cqoS01gP7RzULu9v@storiesclub.twg2b.mongodb.net/storiesclub?retryWrites=true&w=majority"

        self.email_model_email = os.environ.get(
            "EMAIL_MODEL_EMAIL") or "no.reply@storiesclub.net"
        self.email_model_access_key = os.environ.get(
            "EMAIL_MODEL_ACCESS_KEY") or "2892022-CUBERS-MAILING-AUTH-KEY@StroiesClub.Password@Cubers IO Inc."
        # TODO
        self.header_desc = os.environ.get("HEADER_DESC") or """"""
        # TODO
        self.header_keywords = os.environ.get("HEADER_KEYWORDS") or ""

        self.facebook = os.environ.get(
            "FACEBOOK") or "https://facebook.com/storiesclub.net"
        self.linkedin = os.environ.get(
            "LINKEDIN") or "https://linkedin.com/company/storiesclun.net"
        self.instagram = os.environ.get(
            "INSTAGTAM") or "https://instagram.com/storiesclun.net"
        self.email = os.environ.get("CONTACT_EMAIL") or "info@cubersio.com"
        self.phone = os.environ.get("CONTACT_PHONE") or "+20 112 916 4522"
        self.address = os.environ.get("CONTACT_ADDRESS") or ""

        self.website_content = WebsiteContent()
        self.categories = CategoriesContent()
        self.db = DatabaseHelper(self.db_url)

        # Placeholders
        self.videos_placeholder = [{
            "_id": "62f47af716f5d9374d3c304f",
            "title": "مرسال غياب اضطراري",
            "desc": "ترى أصلا فاكر وعدك ليا؟ عارفة الموت ضرورة حتمية.",
            "publisher": "62f478f87206d0bcb5f1fe75",
            "book": "",
            "ph": "",
            "publishedIn": "1660189431101",
            "category": 13,
            "views": 2,
            "parts": [],
            "likers": [],
            "comments": [],
            "__v": 0
        } for _ in range(0, 30)]
        self.audios_placeholder = [{
            "_id": "62f47af716f5d9374d3c304f",
            "title": "مرسال غياب اضطراري",
            "desc": "ترى أصلا فاكر وعدك ليا؟ عارفة الموت ضرورة حتمية.",
            "publisher": "62f478f87206d0bcb5f1fe75",
            "book": "",
            "ph": "",
            "publishedIn": "1660189431101",
            "category": 13,
            "views": 2,
            "parts": [],
            "likers": [],
            "comments": [],
            "__v": 0
        } for _ in range(0, 30)]
        self.books_placeholder = [{
            "_id": "62bc83aaa3bf2b70f4c8343e",
            "title": "الكرسي",
            "desc": "مرت عدة أيام حتى شم الجيران رائحة عفنة تنبعث من تلك الشقة الغريبة، فطلبوا الشرطة، كسروا الباب فصعق الجميع مما رأوا، فقد وجدوا شرف منتفخاً متعفناً على الكرسي! وفي غرفة أخرى وجدوا شابة مقتولة في حالة يرثى لها، كان منظرًا مرعبًا مثيرًا للاشمئزاز، كان منظرًا يقشعر له البدن، تلك الجثة المتعفنة الجالسة على الكرسي، والمتمسكة به وكأنه أملها الوحيد في النجاة! هكذا رأى الجميع الامر، لكن ثمة شخص بصر بما لم يبصروا به.",
            "publisher": "62bc82f7a3bf2b70f4c8341f",
            "depositNumber": "",
            "ph": "",
            "category": 0,
            "views": 86,
            "isin": 0,
            "publishingDate": "1656521642473",
            "likers": [
                "62bc82f7a3bf2b70f4c8341f"
            ],
            "comment": [],
            "__v": 5
        } for _ in range(0, 30)]
        self.user_placeholder = {
            "_id": "62bc82f7a3bf2b70f4c8341f",
            "name": "Ahmad Abdelrasoul",
            "email": "ahmedabdelrasol1070@gmail.com",
            "password": "012280029zaloma",
            "phoneNumber": "01116513425",
            "withdrawlBankAccount": "",
            "withdrawlPhoneWallet": "",
            "gender": 1,
            "cityCode": 5,
            "loggingStreak": 0,
            "publishes": [],
            "withdrawlRequests": [],
            "verified": False,
            "joinedIn": "1656521463390",
            "lastLogIn": "1660246050095",
            "log": {},
            "__v": 0
        }

        self.cities = {
            0: 'alex',
            1: 'aswan',
            2: 'asyut',
            3: 'behira',
            4: 'beni_suef',
            5: 'cairo',
            6: 'dakahlia',
            7: 'damietta',
            8: 'faiyum',
            9: 'gharbia',
            10: 'giza',
            11: 'ismailia',
            12: 'kafr_sheikh',
            13: 'luxor',
            14: 'matruh',
            15: 'minya',
            16: 'monufia',
            17: 'wadi_geded',
            18: 'north_sinai',
            19: 'port_said',
            20: 'qalyubia',
            21: 'qena',
            22: 'red_sea',
            23: 'sharqia',
            24: 'sohag',
            25: 'south_sinai',
            26: 'suez',
        }

        self.genders = {
            0: "male",
            1: "female",
            2: "preferNotToSay",
        }

    @property
    def is_debug_mode(self) -> bool:
        return self.mode == self.debug_mode_token

    def check_if_arabic(self, input: str):
        arabic_letters = [
            "ء", "ي", "و", "ه", "ش", "س", "ق", "ف", "غ", "ع", "ض", "ص", "ن", "م", "ل", "ك", "ظ", "ط", "ز", "ر", "ذ", "د", "خ", "ح", "ج", "ث", "ت", "ب", "ا"
        ]

        return input[0] in arabic_letters and input[-1] in arabic_letters

    def timestamp_to_readable_data(self, timestamp) -> str:
        return "16, Sep, 2022"

    def calc_total_views(self, list_: list) -> int:
        views = 0
        for i in list_:
            views = views + i['views']

        return views
