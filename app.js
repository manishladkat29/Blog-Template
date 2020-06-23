// console.log("Welcome to Node JS tutorial");
// const tutorial = require('./tutorial');
// console.log(tutorial);
// console.log(tutorial.sum(2, 4));
// console.log(tutorial.PI);
// console.log(new tutorial.someMathObject);

// const EventEmmiter = require('events');
// const eventEmmiter = new EventEmmiter();

// eventEmmiter.on('tutorial', (num1, num2)=>{
//     console.log('tutorial event has occured');
//     console.log(num1 + num2);
// });

// eventEmmiter.emit('tutorial', 1, 3);

// class Person extends EventEmmiter{
//     constructor(name){
//         super();
//         this._name = name;
//     }

//     get name(){
//         return this._name;
//     }
// }

// let pedro = new Person('Pedro');
// let christina = new Person('Christina');
// christina.on('name', ()=>{
//     console.log('My Name is ' + christina.name);
// });
// pedro.on('name', ()=>{
//     console.log('My Name is ' + pedro.name);
// });

// pedro.emit('name');
// christina.emit('name');

// const readline = require('readline');
// const rl = readline.createInterface({input : process.stdin, output : process.stdout});
// let num1 = Math.floor((Math.random() * 10) + 1);
// let num2 = Math.floor((Math.random() * 10) + 1);
// let answer = num1 + num2;

// console.log(num1 + '+' + num2 + ' = ' + answer)

// rl.question('What is ' + num1 + ' + ' + num2 + '? \n', (userInput)=>{
//     if(userInput.trim() == answer){
//         rl.close();
//     }else{
//         rl.setPrompt('Incorrect Anwser, try again\n');
//         rl.prompt();
//         rl.on('line', (userInput)=>{
//             if(userInput.trim() == answer)
//                 rl.close();
//             else{
//                 rl.setPrompt('Your answer ' + userInput + ' is incorrect, Try again\n');
//                 rl.prompt();
//             }
//         })
//     }
// });

// rl.on('close', ()=>{
//     console.log('Correct!!');
// });

// const fs = require('fs')

//create a file
// fs.writeFile('example1.txt', 'My name is Manish', (err)=>{
//     if(err)
//         console.log(err);
//     else{
//         console.log('File created successfully');
//         fs.readFile('example1.txt', 'utf-8', (err, file)=>{
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(file);
//             }
//         });
//     }
// });

// fs.rename('example2.txt', 'example3.txt', (err) => {
//     if(err)
//         console.log(err);
//     else{
//         console.log('File renamed successfully');
//     }
// });

// fs.unlink('example1.txt', (err)=> {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("File successfully deleted");
//     }
// });

// fs.appendFile('example3.txt', 'Some thing appended', (err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('File successsfully appended');
//     }
// });


const fs = require('fs');
// fs.mkdir('tutorial1', (err)=>{
//     if(err)
//         console.log(err);
//     else{
//         fs.rmdir('tutorial', (err)=>{
//             if(err)
//                 console.log(err);
//             else
//                 console.log('Folder successfully deleted');
//         })
//     }
// });

// fs.writeFile('tutorial1/exampl1.txt', 'abcd', (err)=>{
//     if(err)
//         console.log(err);
//     else{
//         console.log("FIle created successfully");
//     }
// });


// Delete a folder containing files
// fs.unlink('./tutorial1/exampl1.txt', (err)=>{
//     if(err)
//         console.log(err)
//         else{
//             fs.rmdir('tutorial1', (err)=>{
//                 if(err)
//                     console.log(err);
//                 else{
//                     console.log("Folder deleted successfully");
//                 }
//             });            
//         }
// });

//Delete a folder containing multiple files

/* fs.readdir('example', (err, files)=>{
    if(err){
        console.log(err);
    }else{
        for(let file of files){
            fs.unlink('./example/'+file, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('File deleted successfully');
                }
            });
        }
        fs.rmdir('example', (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('Folder deleted successfully');
            }
        });
    }
});
 */


/* const readStream = fs.createReadStream('example3.txt', 'UTF-8');
const writeStream = fs.createWriteStream('example4.txt');
readStream.on('data', (chunk)=>{
    writeStream.write(chunk);
});
 */

//zipping the text file

/* const zlib = require('zlib');
const gzip = zlib.createGzip('example4.txt');
const readStream = fs.createReadStream('example3.txt', 'UTF-8');
const writeStream = fs.createWriteStream('example5.txt.gz');
readStream.pipe(gzip).pipe(writeStream);
 */

//unzipping the text file

// const zlib = require('zlib');

/* const gunzip = zlib.createGunzip('example4.txt');
const readStream = fs.createReadStream('example5.txt.gz');
const writeStream = fs.createWriteStream('example5.txt');
readStream.pipe(gunzip).pipe(writeStream); */

//Setting up a host for web
/* 
const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write('Hello from Node JS 3000');
        res.end();
    }else{
        res.write('Some other domain');
        res.end();
    }
}).listen('3000'); */

/* const http = require('http');
const server = http.createServer((req,res)=>{
    const readStream = fs.createReadStream('./static/index.html');
    res.writeHead(200, {'Content-type' : 'application/html'});
    readStream.pipe(res); 
}).listen('3000'); */


/* const http = require('http');
const server = http.createServer((req,res)=>{
    const readStream = fs.createReadStream('./static/example.json');
    res.writeHead(200, {'Content-type' : 'application/json'});
    readStream.pipe(res); 
}).listen('3000'); */

/* const http = require('http');
const server = http.createServer((req,res)=>{
    const readStream = fs.createReadStream('./static/example.png');
    res.writeHead(200, {'Content-type' : 'image/png'});
    readStream.pipe(res); 
}).listen('3000'); */

/* const lodash = require('lodash');
let example = lodash.fill([1,2,3,4,5], "banana", 0, 4);
console.log(example); */


/* const express = require("express");
const app = express();

app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.get('/example', (req, res)=>{
    res.send("Hitting example route");
});

app.get('/example/:name/:age', (req, res)=>{
    res.send("Name: "+req.params.name + " Age: " + req.params.age);
    console.log(req.params);
    console.log(req.query);
});

app.listen(3000); */


const express = require("express");
const app = express();
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'static','index.html'));
}).listen(3000);



/* const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const joi = require('joi');

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'static','index.html'));
});

app.post('/', (req, res)=>{
    console.log(req.body);
    const schema = joi.object().keys({
        email : joi.string().trim().email().required(),
        password : joi.string().min(5).max(10).required()
    });
    joi.validate(req.body, schema, (err, result)=>{
        if(err){
            res.send('ann error has occured');
            console.log(err)
        }else{
            res.send('successfull posteddd data');
            console.log(result);   
        }
    });
}); 

app.listen(3000);*/
