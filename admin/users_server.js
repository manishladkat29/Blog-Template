const express = require("express");
const bodyParser= require('body-parser');
const { ObjectID } = require('mongodb');
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;
var getJSON = require('get-json')
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

'use strict';

var request = require('request');

const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const user_url = "http://localhost:5000/users"

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.set('view engine', 'ejs');
app.use(express.json());

const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5000, () =>
  console.log(`server has started at port 5000`)
);

app.get('/', (req, res)=>{
    res.render('login.ejs');
});

app.post('/post_status_change', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        var query = { _id: new ObjectID(req.query.id)};
        var newvalues = { $set: {status: req.query.status} };
        console.log(newvalues);
        dbo.collection("posts").updateOne(query, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
        res.redirect('/list_posts');
    });
});

app.get('/add_post', (req, res) => {
    res.render('add_post.ejs');
});


app.get('/add_user', (req, res) => {
    res.render('add_user.ejs');
});

app.post('/add_post_submit', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        console.log(req.body);
        if (err) throw err;
        var dbo = db.db("myblog");
        dbo.collection("posts").insertOne({post_title: req.body.post_title, post_text: req.body.post_text, status: 'unchecked' }, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        res.redirect('/add_post');
    });
})

app.post('/uploadfile', upload.single('fileToUpload'), (req, res) => {
    fs.readFile(__dirname + '/uploads/' + req.file.filename, 'utf-8', (err, data)=>{
        if(data.split(':')[0] === "Post Title"){
            var postTitle = data.split(':')[1].split(',')[0].trim();
            if(data.split(':')[1].split(',')[1].trim() === "Post Text"){
                var postText = data.split(':')[2].trim();
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("myblog");
                    dbo.collection("posts").insertOne({post_title: postTitle, post_text: postText, status: 'unchecked' }, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                    });
                    res.redirect('/add_post');
                });
            }
        }
    });
    fs.unlink(__dirname + '/uploads/' + req.file.filename, (err)=> {
        if(err){
            console.log(err);
        }
    });
});

app.post('/add_user_submit', (req, res) => {
    console.log(req.body)
    request.post({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/',
        "body": JSON.stringify({
            "name": req.body.name,
            "password": req.body.password,
            "status": 'checked'
        })
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        //console.log(JSON.parse(body));
        res.render('add_user.ejs');
    });
});

app.get('/list_posts', (req, res) => {
    
    var result1;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        dbo.collection('posts').find().toArray()
            .then(results => {
                res.render('list_posts.ejs', { posts: results });
            });
    });
});

app.get('/list_users', (req, res) => {

    request.get({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/'
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        //console.log(JSON.parse(body));
        res.render('list_users.ejs', {data: JSON.parse(body)});
    });
});


app.get('/read_post', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        var query = { _id: new ObjectID(req.query.id)};
        dbo.collection("posts").find(query).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.render('read_post.ejs', {data: result[0]});
        }); 
    });
});

app.get('/update_post', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        var query = { _id: new ObjectID(req.query.id)};
        dbo.collection("posts").find(query).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.render('update_post.ejs', {data: result[0]});
        }); 
    });
});

app.get('/update_user', (req, res) => {
    console.log(user_url + '/' + new ObjectID(req.query.id));
    request.get({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/get_user/' + new ObjectID(req.query.id)
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        console.log(JSON.parse(body));
        res.render('update_user.ejs', {data: JSON.parse(body)});
    });
});

app.post('/update_post_submit', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        var query = { _id: new ObjectID(req.query.id)};
        var newvalues = { $set: req.body };
        dbo.collection("posts").updateOne(query, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
        res.redirect('/list_posts');
    });
});

app.post('/update_user_submit', (req, res) => {
    console.log(req.query);
    request.patch({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/' + new ObjectID(req.query.id),
        "body": JSON.stringify({
            "name": req.body.name,
            "password": req.body.password,
            "status": req.query.status
        })
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        console.log(JSON.parse(body));
        res.redirect('/list_users');
    });
});

app.post('/user_status_change', (req, res) => {
    console.log(req.query);
    console.log(user_url + '/' + new ObjectID(req.query.id));
    request.patch({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/update_user/' + new ObjectID(req.query.id),
        "body": JSON.stringify({
            "status": req.query.status
        })
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        console.log(JSON.parse(body));
        res.redirect('/list_users');
    });
});


app.post('/add_user_submit', (req, res) => {
    console.log(req.body)
    request.patch({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/',
        "body": JSON.stringify({
            "name": req.body.name,
            "password": req.body.password,
            "status": "checked"
        })
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        //console.log(JSON.parse(body));
        res.render('add_user.ejs');
    });
})

app.get('/delete_post', (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        var query = { _id: new ObjectID(req.query.id)};
        dbo.collection("posts").deleteOne(query, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
        res.redirect('/list_posts');
    });
});

app.get('/delete_user_ind', (req, res) => {
    console.log(user_url + '/delete_user/' + new ObjectID(req.query.id));
    request.delete({
        "headers": { "content-type": "application/json" },
        "url": user_url + '/' + new ObjectID(req.query.id)
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.log(JSON.parse(body));
        res.redirect('/list_users');
    });
});