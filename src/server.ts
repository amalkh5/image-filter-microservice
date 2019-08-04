import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles,getDirectories} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  app.get( "/filteredimage", async ( req, res ) => {
    let image_url  = req.query.image_url;
    if (!image_url) {
      return res.status(400).send({ message: 'Image url is required' });
    }
      const filteredImage =  await filterImageFromURL(image_url)

      res.sendFile( filteredImage);

      res.on('finish', function() {
          var files = getDirectories()
          deleteLocalFiles(files)
  });
  
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
