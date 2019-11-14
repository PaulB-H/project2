const express = require("express");
const mysql = require("mysql");
const path = require("path");

var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

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

//adding JAWSDB connection if else
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

app.get("/", async function(req, res) {
  res.sendFile(path.join(__dirname + "/public/frontEnd/index.html"));
});

async function validUserName(username) {
  result = await db.query(
    `select count(*) as exists from fh_users where username = ${username}`
  );

  if (result.exists > 0) {
    return false;
  }
}

async function createUser(userObj) {
  result = await db.query(`insert into fh_users(username, first_name, last_name, address_line1, address_line2, city, postal_code, cellphone, email, fitness_goals, istrainer)
  values(${userObj.username}, ${userObj.first_name}, ${userObj.last_name}, ${userObj.address_line1}, ${userObj.address_line2}, ${userObj.city}, ${userObj.postal_code}, ${userObj.cellphone}, ${userObj.email}, ${userObj.fitness_goals}, ${userObj.istrainer})`);

  return await db.query(
    `select id from fh_users where username = ${userObj.username}`
  );
}

async function updateUser(userObj) {
  result = await db.query(`update fh_users set username = IFNULL(${
    userObj.username
  }, username),
    first_name = IFNULL(${userObj.first_name}, first_name), 
    last_name = IFNULL(${userObj.last_name}, last_name), 
    address_line1 = IFNULL(${userObj.address_line1}, address_line1), 
    address_line2 = IFNULL(${userObj.address_line2}, address_line2), 
    city = IFNULL(${userObj.city}, city), 
    postal_code = IFNULL(${userObj.postal_code}, postal_code), 
    cellphone = IFNULL(${userObj.cellphone}, cellphone), 
    email = IFNULL(${userObj.email}, email), 
    fitness_goals = IFNULL(${userObj.fitness_goals}, fitness_goals), 
    istrainer = IFNULL(${userObj.istrainer}, istrainer)i
    where id = ${localStorage.getItem("currentUser")}`);
}

async function showUserList(col_name, col_value) {
  return await db.query("select id, username from fh_users where ? = ?", [
    col_name,
    col_value
  ]);
}

//  Calendar Section
app.get("/calendar/load/:inDate/currUser", async function(req, res) {
  res.setHeader("Last-Modified", new Date() - 1);
  let result = await db.query(
    `select userid,  hr1, hr2, hr3, hr4, hr5, hr6, hr7, hr8, hr9, hr10, hr11, hr12, hr13, hr14, hr15, hr16, hr17, hr18, hr19, hr20, hr21, hr22, hr23, hr24 from fh_calendar where DATE(createdat) = DATE(?) and userid = ?
    union
     select 1, "" hr1, "" hr2, "" hr3, "" hr4, "" hr5, "" hr6, "" hr7, "" hr8, "" hr9, "" hr10, "" hr11, "" hr12, "" hr13, "" hr14, "" hr15, "" hr16, "" hr17, "" hr18, "" hr19, "" hr20, "" hr21, "" hr22, "" hr23, "" hr24 where 0 = (select count(*) from fh_calendar where DATE(createdat) = CURDATE())`,
    [req.params.inDate, currUser]
  );
  res.send(result);
});

app.post("/calendar/save", async function(req, res) {
  console.log(req.params.inDate);
  console.log(req.body.calDay[12]);
  let check_new = await db.query(
    `select count(*) as dayExists from fh_calendar where DATE(createdat) = ? and userid = ?`,
    [req.body.calDay[0], req.body.calDay[1]]
  );
  if (check_new[0].dayExists == 0) {
    console.log(req.body.calDay);
    result = await db.query(
      `insert into fh_calendar (userid, hr1, hr2, hr3, hr4, hr5, hr6, hr7, hr8, hr9, hr10, hr11, hr12, hr13, hr14, hr15, hr16, hr17, hr18, hr19, hr20, hr21, hr22, hr23, hr24)
       values("${req.body.calDay[1]}", 
       "${req.body.calDay[2]}", 
       "${req.body.calDay[3]}",
       "${req.body.calDay[4]}",
       "${req.body.calDay[5]}",
       "${req.body.calDay[6]}",
       "${req.body.calDay[7]}",
       "${req.body.calDay[8]}",
       "${req.body.calDay[9]}",
       "${req.body.calDay[10]}",
       "${req.body.calDay[11]}",
       "${req.body.calDay[12]}",
       "${req.body.calDay[13]}",
       "${req.body.calDay[14]}",
       "${req.body.calDay[15]}",
       "${req.body.calDay[16]}",
       "${req.body.calDay[17]}",
       "${req.body.calDay[18]}",
       "${req.body.calDay[19]}",
       "${req.body.calDay[20]}",
       "${req.body.calDay[21]}",
       "${req.body.calDay[22]}",
       "${req.body.calDay[23]}",
       "${req.body.calDay[24]}",
       "${req.body.calDay[25]}")`
    );
  } else {
    console.log("Update Record");
    result = await db.query(
      `update fh_calendar set hr1 = "${req.body.calDay[2]}", 
      hr2 = "${req.body.calDay[3]}", 
      hr3 = "${req.body.calDay[4]}", 
      hr4 = "${req.body.calDay[5]}", 
      hr5 = "${req.body.calDay[6]}", 
      hr6 = "${req.body.calDay[7]}", 
      hr7 = "${req.body.calDay[8]}", 
      hr8 = "${req.body.calDay[9]}", 
      hr9 = "${req.body.calDay[10]}", 
      hr10 = "${req.body.calDay[11]}", 
      hr11 = "${req.body.calDay[12]}", 
      hr12 = "${req.body.calDay[13]}", 
      hr13 = "${req.body.calDay[14]}", 
      hr14 = "${req.body.calDay[15]}", 
      hr15 = "${req.body.calDay[16]}", 
      hr16 = "${req.body.calDay[17]}", 
      hr17 = "${req.body.calDay[18]}", 
      hr18 = "${req.body.calDay[19]}", 
      hr19 = "${req.body.calDay[20]}", 
      hr20 = "${req.body.calDay[21]}", 
      hr21 = "${req.body.calDay[22]}", 
      hr22 = "${req.body.calDay[23]}", 
      hr23 = "${req.body.calDay[24]}", 
      hr24 = "${req.body.calDay[25]}" 
      where DATE(createdat) = DATE(?)
      and   id = ?`,
      [req.body.calDay[0], req.body.calDay[1]]
    );
  }
  res.send(result);
});

app.get(`/hubchat`, async function(rep, res) {
  res.sendFile(path.join(__dirname + "/public/chatterbox.html"));
});

// Messaging module section
app.get(`/hubchat/messengers/:currUser`, async function(req, res) {
  let result = await db.query(
    `select distinct chat.id, usr.username
       from
       (
        select sendtoid as id, createdat from fh_hubchat 
        where sentbyid = ?
        union
        select sentbyid as id, createdat from fh_hubchat 
        where sendtoid = ?
       ) as chat
       inner join fh_users usr on chat.id = usr.id
       order by chat.createdat desc`,
    [req.params.currUser, req.params.currUser]
  );
  res.send(result);
});

app.get(`/hubchat/chatter/:currUser/:correspondent`, async function(req, res) {
  let result = await db.query(
    `select * from fh_hubchat where (sentbyid = ? and sendtoid = ?) or (sentbyid = ? and sendtoid = ?)`,
    [
      req.params.currUser,
      req.params.correspondent,
      req.params.correspondent,
      req.params.currUser
    ]
  );
  res.send(result);
});

app.get(`/hubchat/chatter/strangers/:currUser`, async function(req, res) {
  let result = await db.query(
    `select distinct usr.id, usr.username
     from fh_users usr
     where usr.id not in
       (
        select sendtoid as id from fh_hubchat 
        where sentbyid = ?
        union
        select sentbyid as id from fh_hubchat 
        where sendtoid = ?
       )
       order by usr.username asc`,
    [req.params.currUser, req.params.currUser]
  );
  res.send(result);
});
// app.get(
//   `/hubchat/load/${sessionStorage.getItem("currentUser")}`,
//   async function(rep, res) {
//     let result = db.query(
//       `select sendtoid, sentbyid, createdat, chatmessage from fh_hubchat
//        where sentbyid = ${sessionStorage.getItem("currentUser")}
//        or sendtoid = ${sessionStorage.getItem("currentUser")}
//        order by createdat desc`
//     );
//   }
// );

async function showChatMessages(sender, target) {
  return await db.query(
    "select sendtoid, sentbyid, createdat, chatmessage from fh_hubchat where sentbyid = ? and sendtoid = ? order by createdat desc",
    [sender, target]
  );
}

async function myInbox(userid) {
  return await db.query(
    `select hc.sentbyid, usr.username from fh_hubchat hc inner join fh_users usr on sendtoid = usr.id where hc.sendtoid = ?`,
    [userid]
  );
  console.log(result);
}
async function myOutbox(userid) {
  return await db.query(
    `select hc.sendtoid, usr.username from fh_hubchat hc inner join fh_users usr on sentbyid = usr.id where hc.sentbyid = ?`,
    [userid]
  );
  console.log(result);
}

async function getDay(inDate) {
  result = await db.query(
    `select * from fh_calendar where DATE(createdat) = DATE(?)`[
      req.params.inDate
    ]
  );
}

async function updateCalendarEntry(userid, start_date, hour, newvalue) {
  await db.query(
    `update fh_calendar set hr${hour} = ${newvalue} where userid = ${userid} and  ${start_date +
      i})`,
    [userid]
  );
}

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
