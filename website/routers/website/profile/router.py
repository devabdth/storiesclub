

from flask import Flask, render_template, request, session, redirect


class ProfileRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        # self.assign_profile_router()



