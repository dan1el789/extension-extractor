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
                obj = {"id": row[0], "name": row[1], "manifest" : manifest, "error" : "no"}
                data.append(obj)
        except:
            obj = {"id": row[0], "name": row[1], "error" : "yes"}
            data.append(obj)

out_file = open("output/manifests.json", "w")
json.dump(data, out_file)
out_file.close()
