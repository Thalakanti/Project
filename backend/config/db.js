// This will handle my sql Connections
const mysql=require('mysql2') // npm install mysql2

// dotenv is used to export the hidden environtment variables from .env file into our project

require('dotenv').config()// npm i dotenv

// I need to connect my server to my sql database on my local machine

const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
// Write a init function to connect to the database using my configuration above
connection.connect((err)=>{
    if (err)    {
        console.error('Error in connecting to database'. err.message)
        return;
    } else {
        console.log("Connection established to the SQL database IMSSI successfully")
    }
})
module.exports = connection;