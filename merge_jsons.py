import csv
import json

data = []
with open('manifests/extensions.csv', 'r') as extensions_csv:
    reader = csv.reader(extensions_csv)
    for row in reader:
        print('manifests/' + row[0] + '.json')
        try:
            with open('manifests/' + row[0] + '.json', 'r') as json_manifest:
                manifest = json.load(json_manifest)
                obj = {"id": row[0], "name": row[1], "downloads": int(row[3]), \
                "recommended" : row[5] == "true", "lastUpdate" : row[4],
                "manifest" : manifest, "error" : False}
                data.append(obj)
        except:
            obj = {"id": row[0], "name": row[1], "downloads": int(row[3]), "error" : True}
            data.append(obj)

out_file = open("output/manifests.json", "w")
json.dump(data, out_file)
out_file.close()
