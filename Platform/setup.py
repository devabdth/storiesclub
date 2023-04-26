from flask import Flask, session
from flask_session import Session
from flask_cors import CORS

from routers.website.books.router import BooksRouter
from routers.website.book.router import BookRouter

from routers.website.audio.router import AudioRouter
from routers.website.audios.router import AudiosRouter

from routers.website.videos.router import VideosRouter
from routers.website.video.router import VideoRouter

from routers.website.login.router import LoginRouter
from routers.website.signup.router import SignUpRouter
from routers.website.signup_process.router import SignUpProcessRouter

from routers.website.config.router import ConfigRouter
from routers.website.images.router import ImagesRouter
from routers.website.users.router import UsersRouter
from routers.website.publish.router import PublishRouter

from routers.website.profile.router import ProfileRouter

from routers.website.earn_more.router import EarnMoreRouter

from routers.website.home.router import HomeRouter

from routers.website.about.router import AboutRouter


# Admin Routers
from routers.admin.users.router import UsersAdminRouter
from routers.admin.books.router import BooksAdminRouter
from routers.admin.audios.router import AudiosAdminRouter
from routers.admin.videos.router import VideosAdminRouter
from routers.admin.content.router import ContentAdminRouter



class Setup:
    def __init__(self, app: Flask, config):
        self.website = app
        self.config = config

        self.website_routers()
        self.setup_session()

    def setup_session(self):
        self.website.config["SESSION_PERMANENT"] = False
        self.website.config["SESSION_TYPE"] = "filesystem"
        self.website.config['CORS_HEADERS'] = 'Content-Type'
        self.website.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
        CORS(self.website, resources={r"/foo": {"origins": "*"}})

        Session(self.website)

    def website_routers(self):
        pass
        HomeRouter(app=self.website, config=self.config)
        AboutRouter(app=self.website, config=self.config)
        LoginRouter(app=self.website, config=self.config)
        SignUpRouter(app=self.website, config=self.config)
        SignUpProcessRouter(app=self.website, config=self.config)
        ImagesRouter(app=self.website, config=self.config)
        ConfigRouter(app=self.website, config=self.config)

        BookRouter(app=self.website, config=self.config)
        BooksRouter(app=self.website, config=self.config)

        UsersRouter(app=self.website, config=self.config)

        VideoRouter(app=self.website, config=self.config)
        VideosRouter(app=self.website, config=self.config)

        AudiosRouter(app=self.website, config=self.config)
        AudioRouter(app=self.website, config=self.config)

        PublishRouter(app=self.website, config=self.config)

        ProfileRouter(app=self.website, config=self.config)

        EarnMoreRouter(app=self.website, config=self.config)


        UsersAdminRouter(app= self.website, config= self.config)
        BooksAdminRouter(app= self.website, config= self.config)
        AudiosAdminRouter(app= self.website, config= self.config)
        VideosAdminRouter(app= self.website, config= self.config)
        # ContentAdminRouter(app= self.website, config= self.config)

