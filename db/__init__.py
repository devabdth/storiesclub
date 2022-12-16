from .videos import VideosHelper
from .audios import AudiosHelper
from .users import UsersHelper
from .suppliers import SuppliersHelper
from .phs import PHSHelper
from .books import BooksHelper


class DatabaseHelper:
    def __init__(self, db_url: str):
        self.videos = VideosHelper(db_url)
        self.audios = AudiosHelper(db_url)
        self.users = UsersHelper(db_url)
        self.supploers = SuppliersHelper(db_url)
        self.phs = PHSHelper(db_url)
        self.books = BooksHelper(db_url)
