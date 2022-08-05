export async function onRequest({env, params}) {
    const jsonfeedToRSS = require('jsonfeed-to-rss')
    const user = await env.SEE_ME_DOWNLOAD.get(params.username)
    if(user){
        const userdata=JSON.parse(user).data
        return new Response(jsonfeedToRSS(userdata),{
            headers: {
                // 'content-type': 'application/rss+xml',
            },
        })
    }
    return new Response("Hello, world!")

  }
  