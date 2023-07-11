import csv
import json

data = []
with open('extensions.csv', 'r') as extensions_csv:
    reader = csv.reader(extensions_csv)
    for row in reader:
        with open(row[0] + '/manifest.json', 'r') as json_manifest:
            manifest = json.load(json_manifest)
            obj = {"id": row[0], "name": row[1], "manifest" : manifest}
            data.append(obj)
    print(data)

out_file = open("manifests.json", "w")
json.dump(data, out_file)
out_file.close()
