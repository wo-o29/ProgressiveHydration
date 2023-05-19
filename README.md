# Progressive Hydration
About Progressive hydration and examples on it


## react progressive hydration 
In this example, we have header and hero-section(intro) and list of users. The point we need to 
hydrate the page progressively. The header and the intro hydrate it at the beginning. 
The list of users hydrate when we scroll down.

The the allow hydrate button is for let use to test before/after the allow the hydration operation.

<img src='assets/HomePage.png' alt='Home page screen shot'>

### How To Run
The exmple use Webpack to generate the bunlders. You notice that we have Server.js witch is an express 
app. And the app directory is our react app (fronend). You can run the app with using this command in the terminal 
```bash
npm start 
```