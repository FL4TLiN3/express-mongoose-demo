# Express + Mongoose Demo

A simple but well tested demo of a web application by express and mongoose.

This application includes:

+ easy to understand MVC architecture.
+ save and manage bookmarks(url)
+ CRUD support by Mongoose
+ simple RESTful interface(`[GET|POST|PUT|DELETE] /bookmark`)
+ unit tested over http by Mocha + Supertest + should.js
+ all tasks are written in Gruntfile.js

## install

```
git clone git@github.com:FL4TLiN3/express-mongoose-demo.git
cd express-mongoose-demo
mkdir log
npm install -l
mkdir node_modules/share
ln -s lib/share.js node_modules/share/index.html
```

## how to run

```
grunt nodemon
```

then your RESTful server is standing by.

you can access:

### GET `http://localhost:3000/bookmarks`

list of all bookmarks.

### GET `http://localhost:3000/bookmark/:bookmarkID`

show specified bookmark.

@param
+ `bookmarkID`

### POST `http://localhost:3000/bookmark`

save a bookmark.

@param
+ `url`

### PUT `http://localhost:3000/bookmark/:bookmarkID`

update specified bookmark.

@param
+ `bookmarkID`

### DELETE `http://localhost:3000/bookmark/:bookmarkID`

delete specified bookmark.

@param
+ `bookmarkID`

## test

```
grunt simplemocha

# or

grunt test # this command gonna watch test-target files
```

## license

MIT
