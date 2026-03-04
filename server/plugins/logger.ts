export default defineNitroPlugin((nitroApp) => {

  nitroApp.hooks.hook("request", (event) => {

    const url = getRequestURL(event)

    console.log(JSON.stringify({
      type: "request",
      path: url.pathname,
      method: event.node.req.method,
      time: new Date().toISOString()
    }))

  })

})