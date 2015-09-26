export default function(reactString, seedData, webserver) {
    return (
          `<!doctype html>
          <html lang='en-us'>
            <head>
              <meta charset='utf-8'>
              <title>Hapi Universal Redux</title>
              <link rel='shortcut icon' href='/favicon.ico'>
            </head>
            <body>
              <div id='react-root'>${reactString}</div>
              <script>window.__reactTransmitPacket='${seedData}'</script>
              <script src="${webserver}/dist/client.js" type="text/javascript"></script>
            </body>
          </html>`
        );
}
