# Progressive Hydration
This repo for duscuss about the Progressive Hydration.The Progressive Hydration Is a technique used in react to improve performance and user experience. By load the static UI First and the delay the js untill the main content loaded. **Learn More**  ( [PDF](https://github.com/AhmadEleiwa/ProgressiveHydration/blob/main/Progressive%20Hydration.pdf) , [GOOGLE SLIDE](https://docs.google.com/presentation/d/1FOeAmbPSOx_Jf8_dQxY4c3dWZ_C6eP-A_3g0t-mzSrw/edit#slide=id.gd1bf8d60a4_0_0) )



## Example : react progressive hydration 
In this example, we have header and hero-section(intro) and list of users. The point we need to 
hydrate the page progressively. The header and the intro hydrate it at the beginning. 
The list of users hydrate when we scroll down.

The the allow hydrate button is for let use to test before/after the allow the hydration operation.

<img src='assets/HomePage.png' alt='Home page screen shot'>

### How To Run
The exmple use Webpack to generate the bunlders. You notice that we have Server.js witch is an express 
app. And the app directory is our react app (fronend). You can run the app with using this command in the terminal 
```bash
npm i 
npm start 
```
<p>
After Run this command the server start building the bundles
</p>



<img src='assets/building.png'>

### How it works
To enable the hydration to our list we have to click on the button 'allow hydration'
let's try witout clicking the button and scroll down into the list. So What you notice ? actually nothing change let's try to click on the user avator image and watch our console in the browser.

Still !! nothing happen.

Now lets refersh the site and try again with clicking on the button to enable the hydration to the list

### SCRLL DOWN
Once the scroll reach the content the hydration operation start working

<img src='assets/hydratiolist.png'>

### CLICKING ON AVATAR
So Let's try to click on the avatar. We notice that the action of clicking on avator is working. onClick action write on the console as you see in figure below.

So the hydrtion working well !!

<img src='assets/clickingonhydrat.png'>

## Server Side
Once the server start running the creation of the inital content will start. This operation Follow 4 septs ash shown:
* Generate Bundlers through webpack 
* Create the HTML File
* Link the bundler
* Return it as response

### ssr function
ssr function is the function that used for creation of html and send it to the client side.

```js
app.get('/', async (request, response) => {
  try {
    const stream = await ssr({
      url: request.url
    });
...
  }
}
```
Right now, the server start write the inital content (HTML). Notice that the bundler script are added in the page with defer. That's mean the entire html node has been created the script will be running.
```js
app.get('/', async (request, response) => {
...
    stream.on('data', function handleData() {
      stream.off('data', handleData);
      response.writeHead(200, {
        'content-type': 'text/html',
        'content-transfer-encoding': 'chunked',
        'x-content-type-options': 'nosniff'
      });
      response.write(`<!DOCTYPE html><html><head>`);
      response.write(`<meta name="viewport" content="width=device-width, 
      initial-scale=1"><link rel="stylesheet" href="/style.css">
      <script type="module" defer src="/build/client.js"></script></head>`);
      response.write(`<body><div id="approot">`);
      response.flushHeaders();
    });
...
```
After Creation the inital content and link the bundler, it have to return the response as HTML Document
```js
...
    await new Promise((resolve, reject) => {
      stream.on('error', err => {
        stream.unpipe(response);
        reject(err);
      });
      stream.on('end', () => {
        response.write('</div></body></html>');
        resolve();
      });
      stream.pipe(response);
    });
```


### Client Side
In client side, instead of creation new node of elements we **hydrate** it. So what we mean with **Hydrate** ? 

React allow you to create  virtual DOM or hydrate app. The hydration mean the UI is shown but the handlers and the it's own logic not working yet. Like pizza, the operaton of put the pizza inside the furnace and wait untill the pizza is ready. This operation called hydrate the pizza. In other words, the hydrate function it just enable the logic of node bu reusing it instead of create it from beginning.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';

ReactDOM.hydrate(<App />, window.approot);
```