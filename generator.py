import os


def main():

    router_name = input("Router Name: ")
    router_mode = input("Router Mode (website/admin): ")

    if not router_mode in ["website", "admin"]:
        return

    template_path = "./templates/{}/{}".format(
        router_mode.lower(), router_name.lower())
    static_path = "./static/{}/{}".format(router_mode.lower(),
                                          router_name.lower())
    routers_path = "./routers/{}/{}".format(
        router_mode.lower(), router_name.lower())

    if not os.path.exists(template_path):
        os.mkdir(template_path)

    print("{}/index.html".format(template_path, router_name.lower()))

    # Generate Template
    with open("{}/index.html".format(template_path, router_name.lower()), 'w', encoding="utf-8") as f:
        f.write(r"""
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StoriesClub - """+router_name+r"""</title>

    <link
      rel="stylesheet"
      href="{{url_for('static', filename='website/global/styles/computer.css')}}"
    />
    <link
      rel="stylesheet"
      href="{{url_for('static', filename='website/global/styles/smallDevices.css')}}"
    />
    <link
      rel="stylesheet"
      href="{{url_for('static', filename='website/"""+router_name.lower()+r"""/styles/computer.css')}}"
    />
    <link
      rel="stylesheet"
      href="{{url_for('static', filename='website/"""+router_name.lower()+r"""/styles/smallDevices.css')}}"
    />
    <script src="{{url_for('static', filename='website/global/scripts/main.js')}}"></script>
    <script src="{{url_for('static', filename='website/"""+router_name.lower()+r"""/scripts/main.js')}}"></script>
    <link
      rel="icon"
      type="image/x-icon"
      href="{{url_for('static', filename='./styles/global/images/logo-accent.ico')}}"
    />
    <meta name="description" content="{{header_desc}}" />
    <meta name="keywords" content="{{keywords}}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <header>
      <div>
        <a href="/"><div id="logo-accent"></div></a>
        <a href="/">StoriesClub</a>
      </div>
      <nav style="flex-direction: row">
        {% if lang == "en" %}
        <a style="font-family: 'Poppins'" class="header-tab" href="/"
          >{{content.tabs[lang]["home"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/about"
          >{{content.tabs[lang]["about"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/earnMore"
          >{{content.tabs[lang]["earnMore"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/books"
          >{{content.tabs[lang]["books"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/videos"
          >{{content.tabs[lang]["videos"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/audios"
          >{{content.tabs[lang]["audios"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/suppliers"
          >{{content.tabs[lang]["suppliers"]}}</a
        >
        <div class="vertical-divider"></div>
        {% if loggedin %}
        <a style="font-family: 'Poppins'" class="header-tab" href="/profile/"
          >{{content.tabs[lang]["profile"]}}</a
        >
        {% else %}
        <a style="font-family: 'Poppins'" class="header-tab" href="/login/"
          >{{content.tabs[lang]["login"]}}</a
        >
        <a style="font-family: 'Poppins'" class="header-tab" href="/signup/"
          >{{content.tabs[lang]["signup"]}}</a
        >
        {% endif %} {% endif %} {% if lang == "ar" %}
        <a style="font-family: 'Cairo'" class="header-tab" href="/"
          >{{content.tabs[lang]["home"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/about"
          >{{content.tabs[lang]["about"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/earnMore"
          >{{content.tabs[lang]["earnMore"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/books"
          >{{content.tabs[lang]["books"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/videos"
          >{{content.tabs[lang]["videos"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/audios"
          >{{content.tabs[lang]["audios"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/suppliers"
          >{{content.tabs[lang]["suppliers"]}}</a
        >
        {% if loggedin %}
        <a style="font-family: 'Cairo'" class="header-tab" href="/profile/"
          >{{content.tabs[lang]["profile"]}}</a
        >
        {% else %}
        <a style="font-family: 'Cairo'" class="header-tab" href="/login/"
          >{{content.tabs[lang]["login"]}}</a
        >
        <a style="font-family: 'Cairo'" class="header-tab" href="/signup/"
          >{{content.tabs[lang]["signup"]}}</a
        >
        {% endif %} {% endif %}  {% if lang == 'en' %}
        <button onclick="changeLang('{{contact_info['url']}}', 'ar');" style="font-family: 'Cairo'" class="lang-btn" href="./?lang=ar"
          >ar</button
        >
        {% endif %} {% if lang == 'ar' %}
        <button onclick="changeLang('{{contact_info['url']}}', 'en');" style="font-family: 'Cairo'" class="lang-btn" href="./?lang=en"
          >en</button
        >
        {% endif %}
      </nav>
    </header>

    <footer>
      <div>
        <div id="footer-logo"></div>
        <p class="footer-contact-info">{{contact_info["phone"]}}</p>
        <p class="footer-contact-info">{{contact_info["email"]}}</p>
        <p class="footer-contact-info">{{contact_info["address"]}}</p>
        <div id="footer-social-media-icons">
          <a
            href='{{contact_info["facebook"]}}'
            class="footer-social-icon"
            id="footer-social-facebook"
            target="_blank"
          ></a>
          <a
            href='{{contact_info["instagram"]}}'
            class="footer-social-icon"
            id="footer-social-instagram"
            target="_blank"
          ></a>
          <a
            href='{{contact_info["linkedin"]}}'
            class="footer-social-icon"
            id="footer-social-linkedin"
            target="_blank"
          ></a>
        </div>
      </div>
      <div>
        {% if lang == "en" %}
        <a style="font-family: 'Poppins'" class="footer-tab" href="/about"
          >{{content.tabs[lang]["about"]}}</a
        >
        <a style="font-family: 'Poppins'" class="footer-tab" href="/earnMore"
          >{{content.tabs[lang]["earnMore"]}}</a
        >
        <a style="font-family: 'Poppins'" class="footer-tab" href="/books"
          >{{content.tabs[lang]["books"]}}</a
        >
        <a style="font-family: 'Poppins'" class="footer-tab" href="/videos"
          >{{content.tabs[lang]["videos"]}}</a
        >
        <a style="font-family: 'Poppins'" class="footer-tab" href="/audios"
          >{{content.tabs[lang]["audios"]}}</a
        >
        <a style="font-family: 'Poppins'" class="footer-tab" href="/suppliers"
          >{{content.tabs[lang]["suppliers"]}}</a
        >
        {% if loggedin %}
        <a style="font-family: 'Poppins'" class="footer-tab" href="/profile/"
          >{{content.tabs[lang]["profile"]}}</a
        >
        {% else %}
        <a style="font-family: 'Poppins'" class="footer-tab" href="/login/"
          >{{content.tabs[lang]["login"]}}</a
        >
        <a style="font-family: 'Poppins'" class="footer-tab" href="/signup/"
          >{{content.tabs[lang]["signup"]}}</a
        >
        {% endif %} {% endif %} {% if lang == "ar" %}
        <a style="font-family: 'Cairo'" class="footer-tab" href="/about"
          >{{content.tabs[lang]["about"]}}</a
        >
        <a style="font-family: 'Cairo'" class="footer-tab" href="/earnMore"
          >{{content.tabs[lang]["earnMore"]}}</a
        >
        <a style="font-family: 'Cairo'" class="footer-tab" href="/books"
          >{{content.tabs[lang]["books"]}}</a
        >
        <a style="font-family: 'Cairo'" class="footer-tab" href="/videos"
          >{{content.tabs[lang]["videos"]}}</a
        >
        <a style="font-family: 'Cairo'" class="footer-tab" href="/audios"
          >{{content.tabs[lang]["audios"]}}</a
        >
        <a style="font-family: 'Cairo'" class="footer-tab" href="/suppliers"
          >{{content.tabs[lang]["suppliers"]}}</a
        >
        {% if loggedin %}
        <a style="font-family: 'Cairo'" class="footer-tab" href="/profile/"
          >{{content.tabs[lang]["profile"]}}</a
        >
        {% else %}
        <a style="font-family: 'Cairo'" class="footer-tab" href="/login/"
          >{{content.tabs[lang]["login"]}}</a
        >
        <a style="font-family: 'Cairo'" class="footer-tab" href="/signup/"
          >{{content.tabs[lang]["signup"]}}</a
        >
        {% endif %} {% endif %}
      </div>
      <div></div>
    </footer>


    <div id="drawer-overlay" onclick="closeDrawer()"></div>
    <div id="drawer">
      <div id="drawer-header">
        <button id="drawer-icon" onclick="closeDrawer();">x</button>
      </div>
      <div id="footer-logo"></div>
      {% if lang == "en" %}
        <nav style="align-items: start">
      {% else %}
        <nav style="align-items: end">
      {% endif %}
        {% if lang == "en" %}
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab active-tab" href="/"
          >{{content.tabs[lang]["home"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/about"
          >{{content.tabs[lang]["about"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/earnMore"
          >{{content.tabs[lang]["earnMore"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/books"
          >{{content.tabs[lang]["books"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/videos"
          >{{content.tabs[lang]["videos"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/audios"
          >{{content.tabs[lang]["audios"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/suppliers"
          >{{content.tabs[lang]["suppliers"]}}</a
        >
        <div class="vertical-divider"></div>
        {% if loggedin %}
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/profile/"
          >{{content.tabs[lang]["profile"]}}</a
        >
        {% else %}
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/login/"
          >{{content.tabs[lang]["login"]}}</a
        >
        <a style="font-family: 'Poppins'; text-align: left;" class="header-tab" href="/signup/"
          >{{content.tabs[lang]["signup"]}}</a
        >
        {% endif %} {% endif %} {% if lang == "ar" %}
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab active-tab" href="/"
          >{{content.tabs[lang]["home"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/about"
          >{{content.tabs[lang]["about"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/earnMore"
          >{{content.tabs[lang]["earnMore"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/books"
          >{{content.tabs[lang]["books"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/videos"
          >{{content.tabs[lang]["videos"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/audios"
          >{{content.tabs[lang]["audios"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/suppliers"
          >{{content.tabs[lang]["suppliers"]}}</a
        >
        {% if loggedin %}
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/profile/"
          >{{content.tabs[lang]["profile"]}}</a
        >
        {% else %}
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/login/"
          >{{content.tabs[lang]["login"]}}</a
        >
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="/signup/"
          >{{content.tabs[lang]["signup"]}}</a
        >
        {% endif %} {% endif %}  {% if lang == 'en' %}
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="./?lang=ar"
          >ar</a
        >
        {% endif %} {% if lang == 'ar' %}
        <a style="font-family: 'Cairo'; text-align: right;" class="header-tab" href="./?lang=en"
          >en</a
        >
        {% endif %}
      </nav>
      <div
        style="
          justify-content: space-between;
          width: 70%;
          margin-top: 10%;
          height: 64px;
          flex-direction: row;
          display: flex;
          align-items: center;
        "
      >
        <a
          class="social-media-icon"
          href="{{contact_info['facebook']}}"
          id="drawer-facebook"
        ></a>
        <a
          class="social-media-icon"
          href="{{contact_info['linkedin']}}"
          id="drawer-linkedin"
        ></a>
        <a
          class="social-media-icon"
          href="{{contact_info['instagram']}}"
          id="drawer-instagram"
        ></a>
      </div>
    </div>
    <div id="toast">
      <p id="toast-text">This is a Toast</p>
    </div>

  </body>
</html>


        
        """)

        f.close()

        if not os.path.exists(static_path):
            os.mkdir(static_path)
        if not os.path.exists("{}/styles".format(static_path)):
            os.mkdir("{}/styles".format(static_path))
        if not os.path.exists("{}/scripts".format(static_path)):
            os.mkdir("{}/scripts".format(static_path))

        with open("{}/styles/{}".format(static_path, "computer.css"), 'w', encoding="utf-8") as f:
            f.write(r"""
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
:root {
    --main-color: #6b469c;
    --accent-color: #eee7ce;
  --main-color-variant: #6b469c92;
    --main-bg-color: #fefbe3;
}

@media screen and (min-width: 999px) {}
            """)
            f.close()
        with open("{}/styles/{}".format(static_path, "smallDevices.css"), 'w', encoding="utf-8") as f:
            f.write(r"""
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
:root {
    --main-color: #6b469c;
    --accent-color: #eee7ce;
  --main-color-variant: #6b469c92;
    --main-bg-color: #fefbe3;
}
@media screen and (max-width: 999px) {}
            """)
            f.close()
        with open("{}/scripts/{}".format(static_path, "main.js"), 'w', encoding="utf-8") as f:
            f.close()

        if not os.path.exists(routers_path):
            os.mkdir(routers_path)

        with open("{}/__init__.py".format(routers_path), 'w', encoding="utf-8") as f:
            f.close()

        with open("{}/router.py".format(routers_path), 'w', encoding="utf-8") as f:
            f.write(r"""

from flask import Flask, render_template, request, session


class """+router_name+r"""Router:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_"""+router_name.lower()+r"""_router()

    def assign_"""+router_name.lower()+r"""_router(self):
        @self.app.route('/books/', methods=["GET"])
        def website_"""+router_name.lower()+r"""_index():
            params = dict(request.values)
            lang = session.get("lang", "ar")

            if not "category" in list(params.keys()):
                current_category = None
            else:
                current_category = params["category"]

            if not "token" in list(params.keys()):
                token = None
            else:
                token = params["token"]

            return render_template(
                'website/books/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                lang=lang or "en",
                loggedin=session.get('currentUserId') != None,
                current_category=current_category,
                token=token,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                }
            )
            """)
            f.close()


try:
    main()
except Exception as e:
    print(e)
