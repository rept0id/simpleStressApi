/* global process */

const mysql = require('mysql');
const fs = require('fs');

const { createHash } = require('crypto');

/**
 * 
 * Our DB CREATE object.
 * 
 * We give it from here and then a class that calls our class can use it, or can pass it to another class and the cyrcle never ends.
 * That'ls the point : our DB to be accessible to any part of our code.
 * 
 * Note that we pass a DB object and not a DB connection object.
 * Who ever uses this must writte code like : 
 *     
 *     let dbClassObj = classDbClassMain; //<-- call the class
 *     let dbConn = dbClassObj.dbConnCreate(); /<- use the class to connect
 *     
 *     dbConn.query("SELECT 1 + 1 AS solution", (err, sqlRes, fields) => {
 *          if (err) throw err;
 *     
 *          let resJson = sqlRes;
 *          appResObj.json(resJson);
 *     }); <-- our query, and handling of query's result
 *     
 *     dbConn.end(); //<-- use the class to disconnect
 * 
 * That means, he have himself to connect and disconnect from DB. <-- this is the cool part
 * 
 * That's the most cool part of reading those comments : 
 * 
 * Why we do that ? 
 * 
 * We do that because 
 * first of all I found it out after getting angry many times
 * We do that because if we provided an already connected object, 
 * since here we just provide, we wouldnt have a way of knowing when to disconnect to database.
 * 
 * And keeping many open connections that we dont need any more will lead to our app beeing down, 
 * but dont worry, only some-imes and just for some seconds. 
 * Still we would prefer to not have that.
 * 
 * So...
 * 
 * dbClassObj.dbConnCreate()
 * 
 * dbConn.query();
 * 
 * dbConn.end();
 * 
 * ;)
 * 
 */
module.exports.dbConnCreate = function() {
    let connectionCredsPath = process.cwd() + '/classes/dbClass/dbCreds.json';
    let connectionCreds = fs.readFileSync(connectionCredsPath);
    let connectionCredsString = connectionCreds.toString();
    let connectionCredsJson = JSON.parse(connectionCredsString);
    
    return mysql.createConnection(connectionCredsJson);
};

/**
 * 
 * Just a simple test to see our DB works. 
 * It doesnt touch any table and any, in general data in our DB, so it could be even an empty DB.
 * It just returns 2, after doing the 1 + 1 math.
 */

module.exports.testDb1 =  function(appResObjPassed){ 

    let connection = module.exports.dbConnCreate();

    connection.query("SELECT 1 + 1 AS solution", (err, SqlResObj, fields) => {
      if (err) throw err;

      let resJson = SqlResObj;
      appResObjPassed.json(resJson);
    });

    connection.end();

};

/**
 * 
 * Preperated statements START
 * 
 * Just because someone can writte SQL inside a text field and getting that SQL executed, since we pass it here to our SQL.
 * Just because of that, we created preperated statements.
 * 
 * Which means before puting user input (we should not trust user so much) to our SQL, 
 * we run some small tests  and we put the tested input and never the original.
 * 
 * userInput = X
 * userInputSafe = connection.escape(userInput);
 * userInput = userInputSafe;
 * 
 * Mostly, this works in the spirit of removing the special characters (like '), so user input always ends being a simple string.
 * That's why in some forums you cant have a username like rept0id', not even rept0id! at some.
 * 
 * Below are some ways of using preperated statements, use which ever you find cooler.
 * 
 */

module.exports.testDb3 =  function(appResObjPassed, appReqObjPassed, dbClassObjPassed){ 

    let connection = module.exports.dbConnCreate();

    let userInput = appReqObjPassed.name;

    connection.query("SELECT ? AS UserOutput; ", [userInput], (err, SqlResObj, fields) => {
      if (err) throw err;

      let resJson = SqlResObj;
      appResObjPassed.json(resJson);
    });

    connection.end();

};

module.exports.testDb4 =  function(appResObjPassed, appReqObjPassed, dbClassObjPassed){ 

    let connection = dbClassObjPassed.dbConnCreate();

    let userInputName = appReqObjPassed.name;
    let userInputSurname= appReqObjPassed.surname;

    connection.query("SELECT concat(?,' ',?) AS UserOutput; ", [userInputName, userInputSurname], (err, SqlResObj, fields) => {
      if (err) throw err;

      let resJson = SqlResObj;
      appResObjPassed.json(resJson);
    });

    connection.end();

};

module.exports.testDb5 =  function(appResObjPassed, appReqObjPassed, dbClassObjPassed){ 

    let connection = dbClassObjPassed.dbConnCreate();

    let userInput = appReqObjPassed.name;

    connection.query("SELECT " + connection.escape(userInput) + " AS UserOutput2; ", (err, SqlResObj, fields) => {
      if (err) throw err;

      let resJson = SqlResObj;
      appResObjPassed.json(resJson);
    });

    connection.end();

};

/**
 * 
 * Preperated statements END
 * 
 */

/**
 * 
 * Here we use crypto module to hash the input! Really cool and handy for passwords.
 * 
 */

module.exports.testDb6 =  function(appResObjPassed, appReqObjPassed, dbClassObjPassed){ 

    let connection = dbClassObjPassed.dbConnCreate();

    let userInput = appReqObjPassed.name;
    
    let userInputHashSha256 = createHash('sha256').update(userInput).digest('hex');

    connection.query("SELECT " + connection.escape(userInputHashSha256) + " AS hash", (err, SqlResObj, fields) => {
      if (err) throw err;

      let resJson = SqlResObj;
      appResObjPassed.json(resJson);
    });

    connection.end();

};