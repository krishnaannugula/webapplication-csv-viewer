# Overview

The **Web CSV Viewer** is a simple online web application which displays the contents of CSV file located in Azure Cloud. 

## Architecture
The web application is built using [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) framework.

The web application is hosted on [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/#overview). The source CSV file is located in [Azure blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/#overview).

Continuous Integration and Deployments are enabled using [Azure DevOps CI/CD pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/). The deployment notifications are sent to InlineMarket's Teams channel `Playground`.

## Detailed desing

![image info](https://github.com/krishnaannugula/webapplication-csv-viewer/blob/master/Desing_Daigram.png)


## Running Locally

### Installation Prerequisites
1. Make sure you have  and [Node.js](http://nodejs.org/) installed.
2. You can use your preferred development environment for developing [Node.js](https://nodejs.org/en/) applications, but I recommend using [Visual Studio Code](https://code.visualstudio.com/download) because of it's simplicity, robustness and availability of community license.
  * Install [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension in Visual Studio Code.


```sh
git clone git@github.com:krishnaannugula/webapplication-csv-viewer.git # or clone your own fork
cd WebApplication
npm install
npm start dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploying to Azure

```
Deployment pipeline CI & CD was taken care by Azure Devops
Once application is build and deployed 
login into azure portal
browse the webbrowser url and verify the data 

```
