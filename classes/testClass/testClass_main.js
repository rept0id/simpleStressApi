/**
 * 
 * Here we print HTML
 */
module.exports.test1 =  function(appResObjPassed){ 

    appResObjPassed.set('Content-Type', 'text/html');
    appResObjPassed.send('<h2>Test String</h2>');

};

/**
 * 
 * Here we just wanted to test we can call our DB class from another class.
 */
module.exports.test2 =  function(appResObjPassed, dbClassObjPassed){ 

    let connection = dbClassObjPassed.dbConnCreate();

    connection.query("SELECT 1 + 1 AS solution", (err, SqlRes, fields) => {
      if (err) throw err;

      let resJson = SqlRes;
      appResObjPassed.json(resJson);
    });

    connection.end();

};

/**
 * 
 * Here we return the request parameters as html, so we can see in an easy way what got requested!
 * 
 */
module.exports.test3 =  function(appResObjPassed, appReqObjPassed){ 

    let appReqObjPassedString = JSON.stringify(appReqObjPassed);

    appResObjPassed.set('Content-Type', 'text/html');
    appResObjPassed.send(appReqObjPassedString);

};

/**
 * 
 * 
 * Its the same as above, just the above is for POST and here is for GET or the opposite, idk and i dont care.
 * 
 * 
 */
module.exports.test4 =  function(appResObjPassed, appReqObjPassed){ 

    let appReqObjPassedString = JSON.stringify(appReqObjPassed);

    appResObjPassed.set('Content-Type', 'text/html');
    appResObjPassed.send(appReqObjPassedString);

};

module.exports.test5 =  function(appResObjPassed, appReqObjPassed){ 

    let appReqObjPassedString = JSON.stringify(appReqObjPassed);

    appResObjPassed.set('Content-Type', 'text/html');
    appResObjPassed.send(appReqObjPassedString);

};

module.exports.test6 =  function(appResObjPassed, appReqObjPassed){ 

    let appReqObjPassedString = JSON.stringify(appReqObjPassed);

    appResObjPassed.set('Content-Type', 'text/html');
    appResObjPassed.send(appReqObjPassedString);

};