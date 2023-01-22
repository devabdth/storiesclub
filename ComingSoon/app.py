from flask import Flask, render_template


app: Flask= Flask("STORIESCLUB_COMING_SOON")

@app.route("/", methods=["GET"])
def index():
    return render_template(
        "index.html"
    )

app.run(
    debug= True,
    port= 3000
)
