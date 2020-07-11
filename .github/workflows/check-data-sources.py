import urllib, json 

# test url with data
url = "https://hbk254.carto.com/api/v2/sql?q=SELECT * FROM clean_heat_data WHERE RIGHT(primary_fuel,1) = '6'&format=geojson"

# test url with zero records
# url = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/MAPPLUTO/FeatureServer/0/query?where=EDesigNum%20IS%20NOT%20NULL&outFields=Address,EDesigNum&outSR=4326&f=geojson#features/3/properties"

# test url that is broken
# url = "https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM facdb_170522 WHERE facsubgrp = 'Solid Waste Transfer and Carting'&format=geojson"

def check_if_data_source_works(url):
	response = urllib.urlopen(url)
	data = json.loads(response.read())
	# The run should fail if the json object is empty (length == 0). 
	# That's why 1 is being divided by the length of the json object
	return(1/len(data['features']))

check_if_data_source_works(url)

# data_source_urls = ['']

# for i in data_source_urls:
# 	check_if_data_source_works(i) 
