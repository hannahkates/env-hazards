![Data Sources Check](https://github.com/hannahkates/env-hazards/workflows/Data%20Sources%20Check/badge.svg)

## Environmental Hazards in NYC

New York City has some of the most progressive environmental policies; yet, its century-old buildings, legacy infrastructure, and long industrial history have left many environmental hazards to remediate. These hazards include combined sewers, brownfields, Superfund sites, buildings that burn heavy heating oil, among others. Day-to-day urban activity contributes to oil and chemical spills, meanwhile climate change and extreme weather events pose a growing threat.

This interactive map compiles open data sources into one consolidated tool, allowing advocates to more easily access this public information.

### Tech Stack

This is a simple JQuery web app. The map utilizes Leaflet.js. There is no corresponding database or API - all data layers are sourced via public APIs. The URL sources are listed in [`js/config.js`](https://github.com/hannahkates/env-hazards/blob/master/js/config.js)

### How to Run

- Clone repo `git clone https://github.com/hannahkates/env-hazards.git`
- Initiate local dev server `python3 -m http.server`
