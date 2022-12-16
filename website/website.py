from flask import Flask
from config import Config
from setup import Setup

config: Config = Config()
website: Flask = Flask("STORIESCLUB_WEBSITE")
setup: Setup = Setup(website=website, config=config)


website.run(
    debug= config.is_debug_mode,
    port= config.port
)
