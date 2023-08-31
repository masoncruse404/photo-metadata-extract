const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');
const cors = require('cors');
const PORT = process.env.PORT;
const { exec } = require('node:child_process')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.options('*', cors());
// require database connection 
const dbConnect = require("./db/dbConnect.js");
var pdfPath = ''
const Folder = require("./db/folderModel");
const User = require("./db/userModel")
dbConnect();
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
     (req, res) => {

        const files = req.files

        console.log('files',files)
        console.log('req body',req.body.profileID)
        console.log('meta tags',req.body.meta_tags)
    //create upload folder
    const uploadFolder = new Folder({
       path:'path',
       profile_id: req.body.profileID
      });
    
      // save the new post
      uploadFolder
      .save()
      console.log('uploadFolder',uploadFolder)
      console.log('uploadFolder ID', uploadFolder._id.valueOf())
      let parentPath = __dirname+'files/' + uploadFolder._id
      pdfPath = parentPath + '/' + uploadFolder._id + '.pdf'
      console.log('pdfPath',pdfPath)
      console.log('parentPath',parentPath)
      uploadFolder.path = parentPath
      const currentDir = __dirname
      console.log('currentDir', currentDir)
      console.log('uploadFolder',uploadFolder)
    
      Object.keys(files).forEach(key => {
            const filepath = path.join(parentPath,  files[key].name)
            console.log("KEY",files[key])
            files[key].mv(filepath, (err) => {
              console.log('file',files[key].name)
              console.log('filepath',filepath)
            })
            console.log("NEWKEY",files[key])
        })  
        console.log('return')
   

// run the `ls` command using exec
exec('cp ./python/metaDataEx.py '+parentPath, (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    console.log("Output: \n", output)
})

process.chdir(parentPath);


exec('ls -la ', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    console.log("Output: \n", output)
})
var tag_args = req.body.meta_tags
var parsed_tag_arr = []
for(var tag in tag_args){
  var parsed_tag = tag_args[tag].replace(" ","_").replace("  ","_")
  console.log('parsed_tag',parsed_tag.replace(" ","_"))
  parsed_tag_arr.push(parsed_tag.replace(" ","_"))
}

exec('python3 ' + 'metaDataEx.py ' + parsed_tag_arr, (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    return res.status(200).json({ status: uploadFolder._id})
    console.log("Output: \n", output)
})
        
    // go back to old dir
     process.chdir(currentDir)
    }
)

app.get('/download', function(req, res){
    const file = pdfPath
   
    res.download(file, 'file.pdf', function (err) {
        
      if (err) {

        console.log('eer',err);
      }
    }); 
  });

  app.get('/download/:uid', function(req, res){
    console.log('download uid',req.params.uid)
    let parentPath = __dirname+'files/' + req.params.uid + '/' + req.params.uid + '.pdf'
    console.log("parentPath",parentPath)
    res.download(parentPath, req.params.uid+'.pdf', function (err) {
      console.log("res download")
    if (err) {

      console.log('eer',err);
    }
  }); 
  });

app.post("/download", function (req, res) { 
    console.log('download',req.body)
    // The res.download() talking file path to be downloaded
     res.download(req.body.filePath, 'file.pdf', function (err) {
        console.log("res download")
      if (err) {

        console.log('eer',err);
      }
    }); 
  });



  app.get('/register', (request, response) => {
    response.json({ message: 'hi '})
  })
  
  app.post("/register", async (request, response) => {
    const email = request.body.email
    const password = request.body.password
    console.log('Register request ',request.body)
    console.log('Register request email ',email)
    console.log('Register request password ',password)
    //check if email is in use
    User.findOne({ email: email })
    
      // if email exists
      .then((user) => {
      
        if(user){
          console.log("Register - email is taken")
          //email does not exist
          return response.status(409).send({
                message: "Email is taken",
                error:'ofc',
        })
        return;
    }
    else{
      console.log('email has not been taken')
    }
  
    console.log('Register request pw ',password)
    try{
       // hash the password
    bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: email,
        password: hashedPassword,
      });
  
      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          console.log("Register - 201")
          response.status(201).send({
            message: "User Created Successfully",
            result:result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.log("Register - 500 - 1")
          response.status(500).send({
            message: "User wasn't added successfully to the database",
            error: error,
          });
        });
    }).catch((e) => {
      console.log("Register - 500 -2")
      response.status(500).send({
        message: "Password was not hashed successfully",
        e:e,
      })
  
    })

    }catch{
      console.log("Error")
      
        
    }
   
  })
  });
  
  app.get("/login", (request, response) => {
    response.json({ message: "Hey! This is your server response!" });
  });
  // login endpoint
  app.post("/login", (request, response) => {
   console.log('login',request.body)
   const email = request.body.email
   const password = request.body.password
   console.log('Login request email ',email)
   console.log('Login request pw ',password)
  
   try{
    User.findOne({ email: email })
    
      // if email exists
      .then((user) => {
       
        if(!user){
        
          //email does not exist
          return response.status(439).send({
                message: "No user does not match",
                error:'ofc',
              });
        }
        // compare the password entered and the hashed password found
        bcrypt
          .compare(password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
            console.log('in pw check', passwordCheck)
            // check if password matches
            if(!passwordCheck) {
              console.log('password do not match')
              return response.status(400).send({
                message: "Passwords does not match",
                error: "Passwords do not match",
              });
            }
  
            //   create JWT token
            console.log('user id',user._id)
            const userID = user._id
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            user.token = token
            user.save()
            
            //   return success response
            response.status(200).cookie('token', token).send({
              message: "Login Successful",
              email: user.email,
              userID: userID,
              token: token,
            });
          })
          
          // catch error if password does not match
          
          
      })
   }catch{
    
   }
   
  });

  app.get("/get_user",(request, response) => {
    //console.log('profile req',request.headers)
   // auth()
    response.json({ message: "get profile"})
  });
  
  app.post("/get_user",  (request, response) => {
    if(!request.body.token){
      return;
    }
    const token = request.body.token
   // const decodedToken =  jwt.verify(token.toString(), "RANDOM-TOKEN");
    console.log('dec',token);
  
    if(token){
      User.findOne({ token: token }).then(user => {
        if(user){
        console.log('user',user.email)
        console.log('user id',user._id)
        
      
        response.json({ message: user.email, userId: user._id})
        }
      })
      
      
    }
    
  });

 
  app.get("/profile",(request, response) => {
    //console.log('profile req',request.headers)
   // auth()
    response.json({ message: "get profile"})
  });


  app.post("/profile",(request, response) => {
    //console.log('profile req',request.headers)
   // auth()
    
    console.log('req',request.body.varActiveProfileId)
    if(request.body.varActiveProfileId){
    Folder.find({ profile_id: request.body.varActiveProfileId }).then(folder => {
   
      response.json({ message: folder})
   
    });
   
    }
  })
  
  
  



app.listen(process.env.PORT || 4000);