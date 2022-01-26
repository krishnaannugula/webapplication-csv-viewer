module.exports = {
  // A helper method used to read a Node.js readable stream into a Buffer.
  streamToBuffer: async function (readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => { // Capture the packets of incoming stream into a list.
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => { // Concatenate all the packets of received stream into a buffer that will later be parsed as a string.
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  },

  // Prepare HTML table content using the results obtained from CSV blob file. 
  generateHTMLTable: function (results, lastModifiedTime) {
    var html = "<title>Web CSV Viewer</title>"; // Add HTML title.
    html += "<b>Last updated: </b>" + lastModifiedTime + "</p>"; //Show the last modified time of CSV file in Azure blob storage.

    // Prepare the HTML table content by looping through the results.
    html += "<table border=1>";
    for (var i = 0; i < results.length; i++) {
      html += "<tr>";
      for (var j = 0; j < results[i].length; j++) {
        html += "<td>" + results[i][j] + "</td>";
      }
      html += "</tr>";
    }
    html += "</table>";

    return html;
  },
};
