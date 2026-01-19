const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

function readFileData() {
  return JSON.parse(fs.readFileSync("users.json", "utf-8"));
}
function writeFileData(data) {
  return fs.writeFileSync("users.json", JSON.stringify(data, null, 2), "utf-8");
}

//---------register----------

//server with url and method

//check user existence

//if user exists, send back already exists message

//else add user to file and send back success message

const server = http.createServer((req, res) => {
  const { method, url } = req;
  // if (method === "POST" && url === "/create") {
  //   let body = "";
  //   req.on("data", (chunk) => {
  //     body += chunk;
  //   });
  //   req.on("end", () => {
  //     const newUser = JSON.parse(body);
  //     const { email } = newUser;
  //     const users = readFileData();
  //     const userExist = users.find((u) => u.email === email);
  //     if (userExist) {
  //       res.end("User already exists");
  //       return;
  //     }
  //     newUser.id = Date.now();
  //     users.push(newUser);
  //     writeFileData(users);
  //     res.end("User created successfully");
  //   });
  // }
  // // --------login---------

  // if (url === "/login" && method === "POST") {
  //   let body = "";
  //   req.on("data", (chunk) => {
  //     body += chunk;
  //   });
  //   req.on("end", () => {
  //       const loginedData = JSON.parse(body);
  //       const {email,password} = loginedData;
  //       const users = readFileData();
  //       //check user existence
  //       const userExist = users.find((u) => u.email === email);
  //       //check password
  //       const passwordExist = users.find((u)=>u.password === password);
  //       if(!(userExist&&passwordExist)){
  //         res.statusCode = 404;  
  //         res.end("User does not exist");
  //           return;
  //       }
  //       res.statusCode = 200;
  //       res.end("Login successful");



  //   });
  // }

  // update user 
  if(method === "PATCH"&&  url.startsWith("/update/")){
    const id = url.split("/")[2];
    let body = "";
    req.on('data',(chunck)=>{
      body += chunck;
    })
    req.on('end',()=>{
      const updatedData = JSON.parse(body);
      const users = readFileData();
      //check user by id
      const userIndex = users.findIndex((u)=>u.id == id);
      if(userIndex === -1){
        // else send back user not found message
        res.statusCode = 404;
        res.end("User not found");
        return;
      }
      // if user exists update the data in file
      Object.assign(users[userIndex],updatedData);
      writeFileData(users);
      // respond with success message
      res.statusCode = 200;
      res.end("User updated successfully");
    });
  }
   




});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
