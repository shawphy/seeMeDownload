export async function onRequest({env, params}) {
    const user = await env.SEE_ME_DOWNLOAD.get(params.username)
    if(user){
        const userdata=JSON.parse(user).data
        return new Response(JSON.stringify(userdata,null,2),{
            headers: {
                'content-type': 'application/feed+json',
            },
        })
    }
    return new Response("Hello, world!")
  }
  