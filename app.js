/* global await, process */

/**
 * 
 * Our basic libraries imports
 */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * 
 * 
 * 
 * 
 * 
 * TAKE 10 MINUTES AND READ ALL COMMENTS AND I PROMISE THERE IS A CRINGE EASTER EGG DOWN THERE
 * ITS MORE FUNNY THAN ALL DOCUMENTATIONS YOU HAVE EVER READ BUT STILL ITS NOT SILLY
 * 
 * AND YES THERE IS A WHOLE BOOK OF COMMENTS DOWN THERE. IS FOR YOU, TO UNDERSTAND BETTER.
 * I SPENT A NIGHT IN OFFICE WRITTING THEM.
 * 
 * 
 * Thank you !
 * 
 * 
 * ~ Rept0id <rad@simplecode.gr>
 * 
 * 
 */

/**
 * 
 * Some Express consts
 * app = Express object
 * port = the port our ap will use
 * 
 * Leave them for now. :))
 * 
 * P.S. app object const is explained really good bellow.
 * 
 */
const app = express();
const port = 80;

/**
 * 
 * Our classes imports.
 * 
 * Remember : just because we imported a class doesnt mean we called it.
 * 
 * If our class ex. 'testClassMain' contains a function called ex. 'test1'
 * we should call it later like testClassMain.test1();
 * Its a normal function then. We can return it's result, store it to a variable, serve it e.t.c.
 *      ex 1. return testClassMain.test1();
 *      ex 2. let result = testClassMain.test1();
 *      ex 3.
 *              let result = testClassMain.test1();
 *              appResObj.json( result );
 *              
 */
const classDbClassMain = require(process.cwd() + '/classes/dbClass/dbClass_main.js');
const testClassMain = require(process.cwd() + '/classes/testClass/testClass_main.js');


/**
 * 
 * Here we request body-parser objects (see libraries imports above).
 * This module allows us to handle POST requests wtih form/url-encoded or JSON data, respectively.
 */
let parserBodyObj = bodyParser.json();
let parserJsonObj = bodyParser.urlencoded({ extended: false });

/**
 * "app" is Express' library object,
 * we use it for every interaction with Express.
 * 
 * Examples :
 * app.use = load a module
 * app.get = handle a GET request
 * app.post = handle a POST request
 * app.all = handle ALL *types* of a specific request
 * 
 * Here, we use app.use() in order to load body-parser's modules. See comments above.
 */
app.use(parserBodyObj);
app.use(parserJsonObj);

/**
 * Here, we handle all requests that are pointing to our root.
 * Its our homepage.
 * When someone hits node-api-boilerplate.simplecode.gr/ -> this is the code that gets executed.
 * 
 * res.json()
 * This code below, generates an array and serves it as a JSON (JSON are just JS arrays/objects, so a JS object = JSON AND JSON = JS object), using res.json()
 * 
 * There is also a way to serve HTML : 
 * 
 *      resObj.set('Content-Type', 'text/html');
 *      resObj.send('<h2>Test String</h2>');
 */
/** && */
/**
 * @param appReqObj
 * is the object that contains our request
 * Imagine it like, someone hits our link : node-api-boilerplate.simplecode.gr?a=1
 * "a" is our parameter and "1" is our value
 * Express, will give us an appReqObj like : 
 * {
 *  "a" = "1"
 *  }
 *  Read next comment to understand better the way Express passes data around.
 * 
 * @param appResObj
 * is the object that contains our response
 * Instead of PHP, here there is not actually a command that "does the job".
 * Instead, Express passes us objects, we read them, we modify them and then Express takes our modified versions of objects and handles them.
 * 
 * Express -> our code -> Express -> user
 * 
 * Thats the reason, a 'result' object already exists.
 * This 'result' object we take it, we modify it and then Express reads it and generate content as we asked for.
 * 
 * So, here, we append a "json" obj with content X to our 'result' obj. This way, we say that we want to serve as result a json with content X.
 * 
 */
app.all('/', (appReqObj, appResObj) => {
    resArray = {  
            "welcome":  "Irina, Welcome to simpleStressApi !",
            "testNum":"1",
            "flower":"\
                                    ,            __ \/ __\
                    /\^/`\          /o \{}/ o\   If I had a flower for each time\
                    | \/   |         \   ()   /     I thought of you, my garden\
                    | |    |          `> /\ <`   ,,,     would be full...\
                    \ \    /  @@@@    (o/\/\o)  {{{}}                 _ _\
                    '\\//'  @@()@@  _ )    (    ~Y~       @@@@     _{ ' }_\
                    ||     @@@@ _(_)_   wWWWw .oOOo.   @@()@@   { `.!.` }\
                    ||     ,/  (_)@(_)  (___) OO()OO    @@@@  _ ',_/Y\_,'\
                    ||  ,\ | /)  (_)\     Y   'OOOO',,,(\|/ _(_)_ {_,_}\
                |\  ||  |\\|// vVVVv`|/@@@@    _ \/{{}}}\| (_)@(_)  |  ,,,\
                | | ||  | |;,,,(___) |@@()@@ _(_)_| ~Y~ wWWWw(_)\ (\| {{{}}\
                | | || / / {{}}} Y  \| @@@@ (_)#(_) \|  (___)   |  \| /~Y~\
                    \ \||/ /\\|~Y~ \|/  | \ \/  /(_) |/ |/   Y    \|/  |//\|/\
                jgs\ `\\//`,.\|/|//.|/\\|/\\|,\|/ //\|/\|.\\\| // \|\\ |/,\|/\
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\
            "
    };
    appResObj.json( resArray );
});

/**
 * Here are our tests
 */

/**
 * Test DB with ALL *types* of a request, for page /testDb1ALL.
 */
app.all('/testDb1ALL', (appReqObj, appResObj) => {

    classDbClassMain.testDb1(appResObj);
    
});

/**
 * Test DB. Only works with GET requests. For page /testDb1GET.
 * We wrotte 'GET' at the end of the page on purpose, for example's shake. The name could be anything, ex. 'searchDbForCuteCats'
 * 
 * Here, we have a class function that accepts a DB obj (appResObj) and does the job.
 */
app.get('/testDb1GET', (appReqObj, appResObj) => {

    classDbClassMain.testDb1(appResObj);
    
});

/**
 * Test DB. Only works with POST requests. For page /testDb1POST.
 * We wrotte 'POST' at the end of the page on purpose, for example's shake. The name could be anything, ex. 'searchDbForCuteCats'
 * 
 * Here, we dont call any class function, instead we do the job straight forward right here.
 */
app.post('/testDb2POST', (appReqObj, appResObj) => {
    
    let dbClassObj = classDbClassMain;
    
    let dbConn = dbClassObj.dbConnCreate();
    
    dbConn.query("SELECT 1 + 1 AS solution", (err, sqlRes, fields) => {
      if (err) throw err;

      let resJson = sqlRes;
      appResObj.json(resJson);
    });
    
    dbConn.end();
    
});

/**
 * Test DB.
 * 
 * Here, we call a class function that accepts our result object, our request object and our DB object and does the job.
 * What is cool here, is that we pass our request object as well. Propably we use some parameters form our request to perform a search to our database.
 * 
 * Like : 
 * find me all cute cats with name appReqObj.body.name
 * lets say that our request's name is 'Lulu'
 * =>
 * find me all cute cats with name Lulu
 * 
 * And then our class function writtes to response obj (appResObj), that we also passed, the cats.
 * And then Express reads the response obj.
 * And it serves the response as we asked for.
 * Because Express loves you and listens to you. cringe here (*_*)
 * 
 */
app.post('/testDb3', (appReqObj, appResObj) => {

    let dbClassObj = classDbClassMain;

    classDbClassMain.testDb3(appResObj, appReqObj.body, dbClassObj);
    
});

/**
 * 
 * OK, NOW TAKE A BREAK AND THEN 
 * 
 * CHECK COMMENTS HERE AT THE BOTTOM 
 * 
 * DONT MISS THEM,
 * 
 * THEY ARE NOT MANY AND THEY ARE IMPORTANT
 * 
 * THEN LATER, CHECK COMMENTS AT CLASSES
 * /classes/dbClass/main.js
 * AND
 * /classes/testClass
 * 
 * Thank you !
 * 
 */

app.post('/testDb4', (appReqObj, appResObj) => {

    let dbClassObj = classDbClassMain;

    classDbClassMain.testDb4(appResObj, appReqObj.body, dbClassObj);
    
});

app.post('/testDb5', (appReqObj, appResObj) => {

    let dbClassObj = classDbClassMain;

    classDbClassMain.testDb5(appResObj, appReqObj.body, dbClassObj);
    
});

app.post('/testDb6', (appReqObj, appResObj) => {

    let dbClassObj = classDbClassMain;

    classDbClassMain.testDb6(appResObj, appReqObj.body, dbClassObj);
    
});

app.all('/test1', (appReqObj, appResObj) => {
    
    testClassMain.test1(appResObj);
    
});

app.all('/test2', (appReqObj, appResObj) => {
    
    let dbClassObj = classDbClassMain;
    
    testClassMain.test2(appResObj, dbClassObj);
    
});

/*
 * We pass .query for GET
 */
app.get('/test3', (appReqObj, appResObj) => {
    
    testClassMain.test3(appResObj, appReqObj.query);
    
});

/*
 * We pass .body for POST
 */
app.post('/test4', (appReqObj, appResObj) => {
    
    testClassMain.test4(appResObj, appReqObj.body);
    
});

/**
 * Last for here, and really important.
 * 
 * When we have a GET request, our data are inside appReqObj.query
 * When we have a POST request, our data are inside appReqObj.body
 * 
 * So here, that we have a handler for all kind of requests ( app.all() ) for page /test5
 * we read appReqObj.method, that tells us what kind of request we deal with
 * 
 * and we pass our data to our class function, the right way, based on each case of request
 * 
 */

app.all('/test5', (appReqObj, appResObj) => {
    
    if (appReqObj.method === "GET") {
        testClassMain.test5(appResObj, appReqObj.query);
    } else if (appReqObj.method === "POST") {
        testClassMain.test5(appResObj, appReqObj.body);
    }
    
});

app.post('/test6', (appReqObj, appResObj) => {
    
        testClassMain.test6(appResObj, appReqObj.body);
    
});

app.listen(port, () => {
  console.log(`node-api-boilerplate listening on port ${port}`);
});

/**
 * OK, NOW CHECK COMMENTS, AS WE SAID ABOVE, AT CLASSES :
 * 
 * /classes/dbClass/main.js
 * AND
 * /classes/testClass
 * 
 * Thank you !
 * 
 */