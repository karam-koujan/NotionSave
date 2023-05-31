const { Client } = require("@notionhq/client")
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const youtube = require('youtube-metadata-from-url');
const port = 3000;
app.use(bodyParser.json());
app.use(cors({
  origin:"https://www.youtube.com"
}))
// Initializing a client
console.log(process.env.NOTION_TOKEN)
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})




app.post("/api/createDB", async(_,res)=>{
  const idList =  await getPagesId()
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
    "Authorization": 'Bearer '+ process.env.NOTION_TOKEN,
  },
  body :JSON.stringify(notionDbdata)
}
 const response= await fetch(url,options)
 const resJson = await res.json()
 res.status(201).json({ message: 'Db is created' });
  

})
    
  

app.post('/api/link', (req, res) => {
  const { link,type } = req.body;
  console.log(link)
  youtube.metadata(link).then((json) =>{
    console.log(json);
  }, (err)=>{
    console.log(err);
  });

  res.status(201).json({ message: 'Link is sent ' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


function getPagesId(){
  
  return new Promise((resolve,reject)=>{
    notion.search({
      filter: {
        value: 'page',
        property: 'object'
      }
    }).then(({results})=>resolve(results.map(result=>result.id))).catch(err=>reject(err))
  })

}

