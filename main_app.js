const express = require('express');
const bodyParser= require('body-parser')
const { ObjectID } = require('mongodb');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000);

app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        dbo.collection('posts').find().toArray()
            .then(results => {
                console.log(results);
                var i, results_refined = [], j=0;
                for (i = 0; i < results.length; i++) {
                    if(results[i].status === 'checked'){
                        console.log(results[i].post_title);
                        results_refined[j++] = results[i];
                    }
                }
                res.render('index.ejs', { posts: results_refined });
            });
    });
});


app.get('/admin_login', (req, res)=> {
    res.redirect('http://localhost:4000/');
});

app.get('/post', (req, res)=> {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myblog");
        var query = { _id: new ObjectID(req.query.id)};
        dbo.collection("posts").find(query).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.render('post.ejs', {data: result[0]});
        }); 
    });
});