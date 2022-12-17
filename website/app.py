from flask import Flask
from config import Config
from setup import Setup

config: Config = Config()
app: Flask = Flask("STORIESCLUB_WEBSITE")
setup: Setup = Setup(app= app, config=config)


app.run(
    debug= config.is_debug_mode,
    port= config.port
)
