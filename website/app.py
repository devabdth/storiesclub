from flask import Flask
import os

from config import Config
from setup import Setup

config: Config = Config()
app: Flask = Flask(
    "STORIESCLUB_WEBSITE", 
    template_folder=os.path.join(os.path.dirname(__file__), "./templates"),
    static_folder=os.path.join(os.path.dirname(__file__), "./static"),
)
setup: Setup = Setup(app= app, config=config)


app.run(
    debug= config.is_debug_mode,
    port= config.port
)
