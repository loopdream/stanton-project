# Stanton Second Sitters Project

## Index

1. [Overview](#overview)
2. [Running the project](#running-the-project)
3. TBC

## Overview 
(WIP) A node.js app and service (built on Hapi.js) which does the following:
- Uses the the Twitter streaming API to listen for a specific hash tag and save this in a data store (Mongo) 
- Serve a page which displayes the second sitters logo and the latest hashtagged tweet. Periodically checks datastore for a more recent tweet and update UI when it finds one.

# Running the project
- Clone the repo
- `npm install`
- `npm start` to start the server and serve the page on [localhost:3000](localhost:3000)
- `npm twitter` to start the twitter streaming service (in progress)

