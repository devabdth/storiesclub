from flask import Flask, render_template, request, send_file, session
import json


class BookRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_book_router()
        self.assign_book_cover()
        self.assign_book_asset()
        self.assign_book_update()

    def assign_book_update(self):
        @self.app.route('/book/', methods=["PATCH", "DELETE"])
        def book_update():
            if request.method == "PATCH":
                body = json.loads(request.data)
                body['category'] = int(body['category'])
                try:
                    id_ = body['id']
                    del body['id']
                    res = self.config.db.books.update_book(
                        id=id_, payload=body)
                    if res:
                        return self.app.response_class(status=200)

                except Exception as e:
                    print(e)

                return self.app.response_class(status=500)

            if request.method == ["DELETE"]:
                id_ = (dict(json.loads(request.values)))['id']
                try:
                    res = self.config.db.books.delete_book_by_id(id_)
                    if res:
                        return self.app.response_class(status=200)
                except Exception as e:
                    print(e)

                return self.app.response_class(status=500)

    def assign_book_cover(self):
        @self.app.route('/book/cover/<id>', methods=["GET"])
        def website_book_cover(id):
            file_ = self.config.db.books.get_book_cover(id)
            if file_ == None:
                return self.app.response_class(status=404)
            return send_file(file_)

    def assign_book_asset(self):
        @self.app.route('/book/asset/<id>', methods=["GET"])
        def website_book_asset(id):
            file_ = self.config.db.books.get_book_asset(id)
            if file_ == None:
                return self.app.response_class(status=404)

            book_ = self.config.db.books.get_book_by_id(id)
            self.config.db.books.update_book(
                id, {'views': (int(book_["views"]) + 1)})
            return send_file(file_)

    def assign_book_router(self):
        @self.app.route('/book/<id>', methods=["GET"])
        def website_book_index(id):
            params = dict(request.values)
            lang = session.get("lang", "ar")

            book = self.config.db.books.get_book_by_id(id)
            print(book["publisher"])
            book["user"] = self.config.db.users.get_user_by_id(
                str(book["publisher"]))

            current_user_id = session.get("currentUserId", None)
            if not current_user_id is None:
                current_user_data = self.config.db.users.get_user_by_id(
                    current_user_id)

            print(book)

            return render_template(
                'website/book/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                list=list,
                lang=lang,
                book=book,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                    "url": self.config.url,
                },
                len=len,
                loggedin=current_user_id != None,
                trending_books=self.config.db.books.get_all_books(
                    fetch_by_trending=True),
                check_if_arabic=self.config.check_if_arabic,

            )
