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

if __name__ == "__main__":
    app.run(
        debug= True,
        host= '0.0.0.0'
    )
