export async function onRequestPost({request, env, params}) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400',
      };
      
    const user = await env.SEE_ME_DOWNLOAD.get(params.username)
    let userdata=JSON.parse(user)
    const formData = await request.formData()
    if(userdata.token===formData.get("token")){
        const item={
            "id": formData.get("magnet"),
            "title":formData.get("title")||formData.get("magnet"),
            "url":formData.get("url"),
            "content_text":formData.get("content_text"),
            "date_published":(new Date).toISOString(),
            "attachments": [
                {
                    "url":formData.get("magnet")
                }
            ]
        }
        console.log(formData.get("magnet"))
        userdata.data.items.push(item)
        await env.SEE_ME_DOWNLOAD.put(params.username,JSON.stringify(userdata))
        return new Response(JSON.stringify(userdata,null,2),{
          headers: {
            ...corsHeaders,
            //   'content-type': 'text/html;charset=UTF-8',
          }
        })
    }
    return new Response("Hello, world!",{
        headers: {
            ...corsHeaders,          
            'content-type': 'text/html;charset=UTF-8',
        }
    })
}
export async function onRequestGet({request, env, params}) {
    return new Response(content_html,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'text/html;charset=UTF-8',
        }
    })
}
const content_html=`<!DOCTYPE html>
<html>
<body>
<style>
  html,body{height: 100%;}
  body{display: flex;justify-content: center;align-items: center;}
  label,button{display: block;}
</style>
  <form action="add" method="post"> 
    <label for="token">Token *</label>
    <input name="token" id="token">
    <label for="magnet">Magnet URL *</label>
    <input name="magnet" id="magnet">
    <label for="url">Page URL</label>
    <input name="url" id="url">
    <label for="title">Title</label>
    <input name="title" id="title">
    <label for="content_text">Description</label>
    <textarea name="content_text" id="content_text"></textarea>
    <button>Submit</button>
  </form>
</body>
</html>`