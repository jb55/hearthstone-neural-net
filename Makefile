export PATH := $(npm bin):$(PATH)

all: prepared.csv

prepared.csv: basic-expert.json prepare.js
	<basic-expert.json ./prepare.js | json2csv > prepared.csv

show: prepared.csv
	<prepared.csv csv-columnify | less -S

.PHONY: show
