// Import the necessary third-party modules. 
const express = require("express");
const router = express.Router();
const app = express();
const { BlobServiceClient } = require("@azure/storage-blob");
const Papa = require("papaparse");

// Import the custom built modules.
const {streamToBuffer, generateHTMLTable}  = require("./js/helpers");

// Obtain the connection properties of Azure storage from environment variables
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER = process.env.AZURE_STORAGE_CONTAINER;
const CSV_BLOB_FILE = process.env.CSV_BLOB_FILE;

// Set up the connection handlers for Azure Storage.
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const blobContainerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER);
const blobClient = blobContainerClient.getBlobClient(CSV_BLOB_FILE);

// Handle the get request to the root path.
app.get("/", async function (req, res) {
  // Get the last modified time of the blob file.
  const properties = await blobClient.getProperties();
  const lastModifiedTime = await properties.lastModified;

  const downloadBlockBlobBuffer = await blobClient.download(); // Start downloading the CSV blob file to memory buffer.
  const csvString = (await streamToBuffer(downloadBlockBlobBuffer.readableStreamBody)).toString(); // Convert the memory buffer to human readable string.

  // Prepare the HTML content based on the content obtained from CSV blob file
  Papa.parse(csvString, {
    complete: function(results) {
      var html = generateHTMLTable(results.data, lastModifiedTime);
      res.send(html);
      res.end;
    }
  })
  
});

// Start the web application.
app.listen(process.env.PORT);
