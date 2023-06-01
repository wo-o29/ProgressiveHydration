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

**SCRLL DOWN**

<img src='assets/hydratiolist.png'>

**CLICKING ON AVATOR**

<img src='assets/clickingonhydrat.png'>

## Server Side
In server side, once the server start it start building the the bundle (intial content) 
* Run the SSR functions to create the bundler
* Create the HTML File
* Link the bundler
* Return it as response

```js
app.get('/', async (request, response) => {
  try {
    const stream = await ssr({
      url: request.url
    });
    .
    .
    .
  }
}
```
Wait until data starts flowing to send a 200 OK,
so errors don't trigger "headers already sent"
```js
    .
    .
    .
    stream.on('data', function handleData() {
      stream.off('data', handleData);
      response.writeHead(200, {
        'content-type': 'text/html',
        'content-transfer-encoding': 'chunked',
        'x-content-type-options': 'nosniff'
      });
      response.write(`<!DOCTYPE html><html><head>`);
      response.write(`<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/style.css">
      <script type="module" defer src="/build/client.js"></script></head>`);
      response.write(`<body><div id="approot">`);
      response.flushHeaders();
    });
    .
    .
    .
```
