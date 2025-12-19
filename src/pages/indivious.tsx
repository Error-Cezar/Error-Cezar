
export const IndiviousApp = async (props: { data: { title: string; url: string; author_name: string; thumbnail_url: string; video: string } }) => {
  return (
    <html>
      <head>
        <title>{props.data.title} - Indivious Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={props.data.title} />
        <meta property="og:author" content={props.data.author_name} />
        <meta property="og:image" content={props.data.thumbnail_url} />
        <meta property="og:video" content={props.data.video} />
        <meta property="og:url" content={props.data.url} />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
      </head>
      <body>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #121212; color: white; font-family: Arial, sans-serif;">
          <h1 style="margin-bottom: 20px;">bleh.</h1>
        </div>
      </body>
    </html>
  )
}
