import csv
import os


class CategoriesContent:
    def __init__(self):
        self.load()

    def load(self):
        self.data = {}
        with open(os.path.join(os.path.dirname(__file__), 'categories.csv'), encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                if row[0] != "id":
                    self.data["{}".format(row[0])] = {
                        "id": row[0],
                        "name": {
                            "en": row[1],
                            "ar": row[2],
                        },
                        "shortBio": {
                            "en": row[3],
                            "ar": row[4]
                        },
                    }
