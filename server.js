const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.static("./public"));

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "IamTheBoxGhost1971",
    database: "fitness_hub_db"
  });
}

async function showUserList(col_name, col_value) {
  return await db.query("select id, username from fh_users where ? = ?", [
    col_name,
    col_value
  ]);
}

async function showChatSenders(target) {
  return await db.query(
    "select sentbyid, username from fh_hubchat inner join fh_users on sentbyid = fh_users.id where sendtoid = ?",
    [target]
  );
}

async function showChatMessages(sender, target) {
  return await db.query(
    "select sentbyid, createdAt, chatmessage from fh_hubchat where sentbyid = ? and sendtoid = ?",
    [sender, target]
  );
}

async function createCalendar(userid, start_date, daycount) {
  for (i = 0; i < daycount; i++) {
    await db.query(
      `insert into fh_calendar(userid, createdAt) values(?, ${start_date + i})`,
      [userid]
    );
  }
}

async function updateCalendarEntry(userid, start_date, hour, newvalue) {
  for (i = 0; i < daycount; i++) {
    await db.query(
      `update fh_calendar set hr${hour} = ${newvalue} where userid = ${userid} and  ${start_date +
        i})`,
      [userid]
    );
  }
}
