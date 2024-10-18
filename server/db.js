import mysql from "mysql2"

// create connection to mysql db
export const db = mysql.createConnection({
  host:     process.env.HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
})

// establish connection with bd 
db.connect((err) => {
  if (err) {  // if error log err
    console.log("Error with connection to DB", err)
  } else {    // log name of db if connected
    console.log("Connected to DB: ", process.env.DB_NAME)
  }
})