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


    def delete_category(self, id):
        del self.data['{}'.format(id)]
        try:
            with open(os.path.join(os.path.dirname(__file__), 'categories.csv'), 'w') as csvfile:
                csvfile.write('{},{},{},{},{}'.format('id', 'englishName', 'arabicName', 'englishShortBio', 'arabicShortBio'))
                for data in self.data.values():
                    csvfile.write('\n{},{},{},{},{}'.format(data["id"], data["name"]["en"], data["name"]["ar"], data["shortBio"]["en"], data["shortBio"]["ar"]))
                csvfile.close()
        except IOError:
            print("I/O error")

        return len(self.data.keys())


    def create(self, dict_):
        line= "{},{},{},{},{}".format(
            len(self.data.keys()),
            dict_["name"]["en"],
            dict_["name"]["ar"],
            dict_["shortBio"]["en"],
            dict_["shortBio"]["ar"],
        )

        with open(os.path.join(os.path.dirname(__file__), 'categories.csv'), "a", encoding='utf-8') as f:
            f.write('\n{}'.format(line))
            f.close()


        return len(self.data.keys())

