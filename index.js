const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

function readFileData(){
    return JSON.parse(fs.readFileSync("users.json","utf-8"));
};
function writeFileData(data){
    return fs.writeFileSync("users.json",JSON.stringify(data,null,2),"utf-8");
};

//---------register----------

//server with url and method

//check user existence 

//if user exists, send back already exists message

//else add user to file and send back success message

const server = http.createServer((req,res)=>{
    const {method,url} = req;
    if(method === "POST" && url === "/create"){
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk;
        });
        req.on('end',()=>{
            const newUser = JSON.parse(body);
            const {email} = newUser;
            const users = readFileData();
            const userExist = users.find(u=>u.email === email)
            if(userExist){
                res.end("User already exists");
                return;
            }
            newUser.id=Date.now();
            users.push(newUser);
            writeFileData(users);
            res.end("User created successfully");
        })
    }
});



// --------login---------


//check user existence

//check password 


const port = 3000;
server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});






