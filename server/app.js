const { Client } = require("@notionhq/client")
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const youtube = require('youtube-metadata-from-url');
const port = 3000;
const mongoose = require("mongoose")
app.use(bodyParser.json());
app.use(cors({
  origin:"*"
}))
// Initializing a client

const Schema = mongoose.Schema({
  bot_id:"string",
  token : "string",
  name:"string",
  avatar_url:"string",
  isDbCreated:{type:"boolean",default:false}
})
const user = mongoose.model("User",Schema)

const notion = new Client({
    auth: "secret_2FRtaMW38Bpo6z7T8qmXNdWfVoNqhc1KJd5yBGlhoNp"
})


const isAuth = async (req,res,next)=>{
   const authorization = req.headers.authorization
   console.log(req.headers)
   console.log("authorization",authorization)
   if(!authorization){
        return res.status(403).json({message:"there is no authorization header",error:true})
   }
   const tokenArray = authorization.split(' ');
   if(!tokenArray[0]){
    return res.status(400).json({message:"bad request",error:true})

   }
   // Get the token value
   const token = tokenArray[1];
   const  profile = await user.findOne({token})
   if(!profile) return res.status(403).json({message:"there is no authorization header",error:true})
   req.user = profile
   next()
}

app.get("/api/dbId",async (req,res)=>{
  const token = req.headers.authorization; 
  console.log(token)
  try{
    const dbId = await getDatabasesId("Social Media Bookmarks",token)
    res.json({dbId,error:false})
  }catch{
      res.json({error:true})
  }
})  
app.post("/api/createDB", async(req,res)=>{
  try{
  
    
  const idList =  await getPagesId(req.headers.authorization)
  const pageId = idList[0] 
  const notionDbdata = {
    parent : {
      type: "page_id",
      page_id : pageId 
      },
      title: [{ type: "text", text: { "content": "Social Media Bookmarks"} }],
     properties : {
      Title  : {title:{}},
      "Social Media" : {
        select : {
          options : [
            {
              name : "youtube",
              color : "red"
            },
            {
              name : "twitter",
              color : "blue"
            },
            {
              name : "linkedIn",
              color : "green"
            }
          ]
        }
      },
      Link  : {url:{}} 
     
     }

  }
const url = 'https://api.notion.com/v1/databases';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Notion-Version': '2022-06-28',
    'content-type': 'application/json',
    "authorization": `Bearer ${req.headers.authorization}`,
  },
  body :JSON.stringify(notionDbdata)
}
 const response= await fetch(url,options)
 const resJson = await res.json()
 console.log(resJson)
}catch(err){
  console.log(err)
}
  

})
    
  

app.post('/api/bookmark', async (req, res) => {
  const { link,type } = req.body;
  console.log("aut",req.headers.authorization)
  try{
    const dbId = await getDatabasesId("Social Media Bookmarks",req.headers.authorization)
    const url = 'https://api.notion.com/v1/pages';
   let notionPagedata
    if(type==="youtube"){

     const youtubeMetadata = await  youtube.metadata(link)
   notionPagedata = {
   parent : {
     type :"database_id",
     database_id :dbId[dbId.length-1]
   },
   properties : {
     Title :  {type:"title",title:[{type:"text",text:{content:youtubeMetadata.title}}]},
     "Social Media":  {
       select: {
         "name": "youtube"
       }
     },
     Link : {url:link}
   },
   children : [{
     type :"embed",
     embed : {url : link}
   }]
  }
   }else{
     notionPagedata =  {
     parent : {
       type :"database_id",
       database_id :dbId[dbId.length-1]
     },
     properties : {
       Title :  {type:"title",title:[{type:"text",text:{content:req.body.metaData.title}}]},
       "Social Media":  {
         select: {
           "name": "twitter"
         }
       },
       Link : {url:link}
     },
     children : [{
       type :"embed",
       embed : {url : link}
     }]
    }

   }
 

 const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Notion-Version': '2022-06-28',
    'content-type': 'application/json',
    "authorization": `Bearer ${req.headers.authorization}`,
  },
  body :JSON.stringify(notionPagedata)
}

 const response= await fetch(url,options)
 const resJson = await response.json()
 console.log(resJson)
 return res.status(201).json({ message: 'page is created' });
}catch(err){
  console.log(err)
}
});


app.get("/api/auth",async(req,res)=>{
  const {code,error} = req.query 
  console.log("code",req.query)
  console.log(error)
  if(error!=="null"){
    return res.json({message:"request cancelled",error:true})
  }


  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;
  
  // encode in base 64
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  try{
  const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${encoded}`,
  },
      body: JSON.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
      }),
  });
  
  const data = await response.json()
  console.log("data",data)
  if(data.error){
   return res.json({message:data.error,error:true})
  }
  console.log(data.owner.user.name,)
  
  res.json({message:"sucess",data,error:false})
}catch(err){
  console.log(err)
}

})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


function getPagesId(token){
  const notion = new Client({
    auth: token
})
  return new Promise((resolve,reject)=>{
    notion.search({
      filter: {
        value: 'page',
        property: 'object'
      }
    }).then(({results})=>resolve(results.map(result=>result.id))).catch(err=>reject(err))
  })

}
function getDatabasesId(query,token){
  console.log(token)
  const notion = new Client({
    auth: token
})
  return new Promise((resolve,reject)=>{
    notion.search({
      query,
      filter: {
        value: 'database',
        property: 'object'
      }
    }).then(({results})=>resolve(results.map(result=>result.id))).catch(err=>reject(err))
  })

}

app.get("/api/user",isAuth,(req,res)=>{
   
  res.json({
    message:"user info",
    data:req.user,
    error:false
  })
})

const uri = `mongodb+srv://karamkaku2000:${process.env.DB_PASSWORD}@cluster0.rdpr9ds.mongodb.net/?retryWrites=true&w=majority`;

//mongoose.connect(uri).then(()=>console.log("working")).catch(console.log)