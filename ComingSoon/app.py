from flask import Flask, render_template
import os

app: Flask= Flask(
	"STORIESCLUB_COMING_SOON",
	template_folder=os.path.join(os.path.dirname(__file__), "./templates"),
	static_folder=os.path.join(os.path.dirname(__file__), "./static"),
)


@app.route("/", methods=["GET"])
def index():
	return render_template(
		"index.html"
	)

app.run(
	debug= True,
	port= 3000
)
	