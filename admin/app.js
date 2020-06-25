const express = require('express');
const bodyParser= require('body-parser')
const { ObjectID } = require('mongodb');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({ extended: true }))

var data = {result: 'Post Saved'};

app.listen(4000);

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

app.post('/add_post_submit', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function(err, db) {
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
})

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
