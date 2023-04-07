var express = require('express')
var router = express.Router();
const { poolPromise, sql } = require('../db')
/* 
* TEST API 
*  
* */
 router.get('/', function (req, res) {    
            res.end("API RUNNING");
});

//=================================================================
// USERS TABLE
// POST / GET
//===================================================================

router.get('/user', async (req, res, next) => {
var objectid = req.query.OBJECTID;
        
if (objectid != null) {
             
     try {
          const pool = await poolPromise
          const queryResult = await pool.request()
               .input('OBJECTID', sql.NVarChar, objectid)
               .query('SELECT * FROM [Users] where OBJECTID=@OBJECTID')                
          if (queryResult.recordset.length > 0) {
                    res.send(JSON.stringify({ success: true, result: queryResult.recordset }));                
                    }                
          else {                    
              res.send(JSON.stringify({ success: false, message: "Empty" })); 
                }            
		}            
    catch (err) {                
        res.status(500) //Internal Server Error
        res.send(JSON.stringify({ success: false, message: err.message }));
            }
}        
else {            
      res.end(JSON.stringify({ success: false, message: "Missing OBJECTID in query" }));
        }
    })

router.post('/user', async (req, res, next) => {
    var user_surname = req.body.Surname;
    var user_name = req.body.Name;
    var user_email = req.body.Email;
    var objectid = req.body.OBJECTID;
        if (objectid != null) {
            try {
                const pool = await poolPromise
                const queryResult = await pool.request()
                    .input('Surname', sql.NVarChar, user_surname)
                    .input('Name', sql.NVarChar, user_name)
                    .input('Email', sql.NVarChar, user_email)
                    .input('OBJECTID', sql.NVarChar, objectid)
                    .query('IF EXISTS(SELECT * FROM [Users] WHERE OBJECTID=@OBJECTID)'
                        + ' UPDATE [Users] SET Surname=@Surname, Name=@Name, Email=@Email WHERE OBJECTID=@OBJECTID'
                        + ' ELSE'
                        + ' INSERT INTO [Users](OBJECTID,Surname,Name,Email) OUTPUT Inserted.OBJECTID,Inserted.Surname,Inserted.Name,Inserted.Email'
                        + ' VALUES(@OBJECTID,@Surname,@Name,@Email)'
                );

                console.log(queryResult);  //Debug To See

                if (queryResult.rowsAffected != null) {
                    res.send(JSON.stringify({ success: true, message: "Success"}))
                }

            }
            catch (err) {
                res.status(500) //Internal Server Error
                res.send(JSON.stringify({ success: false, message: err.message }));
            }
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing OBJECTID in body of POST request" }));
			}	
})