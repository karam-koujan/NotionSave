const { Client } = require("@notionhq/client")
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
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

const getUsers = async () => {
    return  await notion.users.list({})
}
const createPage = async (link)=>{
    const {results} = await notion.search({
        filter: {
          value: 'page',
          property: 'object'
        }
      });
      const pagesId = results.map(({id})=>id)
      if (pagesId){
         console.log(pagesId)
          const response = await notion.pages.create({
            parent: {
                type:"page_id",
                page_id : pagesId[0]
                
            },
            properties: {
                
                    
                      "title": [{ "type": "text", "text": { "content": link} }]
                    }
                  
            
          })
      }
}




app.post('/api/link', (req, res) => {
  const { link,type } = req.body;
  console.log(req.body)
   createPage(link)

  res.status(201).json({ message: 'Link is sent ' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
