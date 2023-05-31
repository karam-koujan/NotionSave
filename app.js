const { Client } = require("@notionhq/client")
require('dotenv').config();

// Initializing a client
console.log(process.env.NOTION_TOKEN)
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const getUsers = async () => {
    return  await notion.users.list({})
}
const createPage = async ()=>{
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
                
                    
                      "title": [{ "type": "text", "text": { "content": "A note from your pals at Notion" } }]
                    }
                  
            
          })
      }
}
createPage()
