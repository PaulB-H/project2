const express = require("express");
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

var app = express();
var port = process.env.PORT || 3000;
var db;

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
  db = new Database(process.env.JAWSDB_URL);
} else {
  db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    // Kevins root password: "IamTheBoxGhost1971",
    // pauls root password: sqlrootpass
    // Stevens root password: steven123
    password: "sqlrootpass",
    database: "fitness_hub_db"
  });
}

app.get("/", async function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

async function validUserName(username) {
  result = await db.query(
    `select count(*) as exists from fh_users where username = ${username}`
  );

  if (result.exists > 0) {
    return false;
  }
}

// Trainer section
app.get(`/api/trainer/client/:currUser`, async function(req, res) {
  let result = await db.query(
    `select id, username, first_name, last_name from fh_users where trainerid = ? order by last_name, first_name asc`,
    [req.params.currUser]
  );
  res.send(result);
});

app.post(`/api/trainer/delclient/:userId`, async function(req, res) {
  console.log(req.params.userId);
  let result = await db.query(
    `update fh_users set trainerid = 0 where id = ?`,
    [req.params.userId]
  );
  res.send(result);
});

app.post(`/api/trainer/getclient/:currUser/:userId`, async function(req, res) {
  let result = await db.query(
    `update fh_users set trainerid = ? where id = ?`,
    [req.params.currUser, req.params.userId]
  );
  res.send(result);
});

app.get(`/api/trainer/potentials`, async function(req, res) {
  let result = await db.query(
    `select id, username, first_name, last_name from fh_users where not trainerid and email is not null and seeking_trainer order by last_name, first_name asc`
  );
  res.send(result);
});

app.get(`/api/trainer/clientinfo/:userId`, async function(req, res) {
  let result = await db.query(`select * from fh_users where id = ?`, [
    req.params.userId
  ]);
  res.send(result);
});

app.post(`/api/user/update/:currUser`, async function(req, res) {
  let result = await db.query(
    `update fh_users set username = ?,
    first_name = ?, 
    last_name = ?, 
    address_line1 = ?, 
    address_line2 = ?, 
    city = ?, 
    postal_code = ?, 
    cellphone = ?, 
    email = ?, 
    user_password = ?,
    fitness_goals = ?, 
    seeking_trainer = ?,
    istrainer = ?,
    trainer_bio = ?
    where id = ?`,
    [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      req.body.address_line1,
      req.body.address_line2,
      req.body.city,
      req.body.postal_code,
      req.body.cellphone,
      req.body.email,
      req.body.user_password,
      req.body.fitness_goals,
      req.body.seeking_trnr,
      req.body.istrainer,
      req.body.trainer_bio,
      req.params.currUser
    ]
  );
  res.send(result);
  // res.end();
});

app.get(`/api/users`, async function() {
  let result = await db.query(
    `select email, user_password from fh_users where email = ? AND user_password = ? `,
    [
      req.body.email,
      req.body.user_password
    ]
  );
  res.send(result);
});

app.post(`/api/users`, async function(req, res) {
  let result = await db.query(
    `insert into fh_users(username, first_name, last_name, address_line1, address_line2, city, postal_code, cellphone, email, user_password, fitness_goals, seeking_trainer, istrainer, trainer_bio)
    values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      req.body.address_line1,
      req.body.address_line2,
      req.body.city,
      req.body.postal_code,
      req.body.cellphone,
      req.body.email,
      req.body.user_password,
      req.body.fitness_goals,
      req.body.seeking_trnr,
      req.body.istrainer,
      req.body.trainer_bio
    ]
  );
  res.send({id: result.insertId});
});

app.get(`/api/users/trainers`, async function() {
  let result = await db.query(
    `select id, username from fh_users where istrainer = 1`
  );
  res.send(result);
});

//  Calendar Section
app.get(`/calendar/load/:inDate/:currUser`, async function(req, res) {
  res.setHeader("Last-Modified", new Date() - 1);
  let result = await db.query(
    `select userid, createdat as myDate, hr1, hr2, hr3, hr4, hr5, hr6, hr7, hr8, hr9, hr10, hr11, hr12, hr13, hr14, hr15, hr16, hr17, hr18, hr19, hr20, hr21, hr22, hr23, hr24 from fh_calendar where userid = ? and DATE(createdat) = DATE(?)`,
    [req.params.currUser, req.params.inDate]
  );
  res.send(result);
});

app.post("/calendar/save", async function(req, res) {
  let check_new = await db.query(
    `select count(*) as dayExists from fh_calendar where DATE(createdat) = ? and userid = ?`,
    [req.body.calDay[0], req.body.calDay[1]]
  );
  if (check_new[0].dayExists == 0) {
    result = await db.query(
      `insert into fh_calendar (createdat, userid, hr1, hr2, hr3, hr4, hr5, hr6, hr7, hr8, hr9, hr10, hr11, hr12, hr13, hr14, hr15, hr16, hr17, hr18, hr19, hr20, hr21, hr22, hr23, hr24)
       values("${req.body.calDay[0]}", 
       "${req.body.calDay[1]}", 
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
app.get(`/hubchat/chatter/messengers/:currUser`, async function(req, res) {
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

app.post(`/hubchat/chatter/save/:currUser/:userName/:msgText`, async function(
  req,
  res
) {
  let writeTo = await db.query(`select id from fh_users where username = ?`, [
    req.params.userName
  ]);

  let writeRec = await db.query(
    `insert into fh_hubchat(sendtoid, sentbyid, chatmessage, new_flg)
       values(?, ?, ?, ?)`,
    [writeTo[0].id, req.params.currUser, req.params.msgText, 1]
  );

  let result = await db.query(`select * from fh_hubchat where id = ?`, [
    writeRec.insertId
  ]);

  res.send(result);
});

// Routine Module section
app.get(`/routine/:currUser`, async function(req, res) {
  let result = await db.query(`select * from fh_routine_hdr where userid = ?`, [
    req.params.currUser
  ]);
  res.send(result);
});

app.get(`/routine/details/:routineId`, async function(req, res) {
  let result = await db.query(
    `select * from fh_routine_dtl where routine_id = ? order by createdat`,
    [req.params.routineId]
  );
  res.send(result);
});

app.post(`/routine/save/:currUser`, async function(req, res) {
  let writeHdr = await db.query(
    `insert into fh_routine_hdr(userid, routine_name) values(?, ?)`,
    [req.params.currUser, req.body.routineName]
  );
  let img_src1 = "";
  let img_src2 = "";
  let writeDtl = "";
  for (i = 0; i < req.body.exercises.length; i++) {
    if (req.body.exercises[i].img) {
      img_src1 = req.body.exercises[i].img[0];
    }

    if (req.body.exercises[i].img) {
      img_src2 = req.body.exercises[i].img[0];
    }
    writeDtl = await db.query(
      `insert into fh_routine_dtl(routine_id, exercise_name, exercise_desc, front_img_src, rear_img_src)
    values(?, ?, ?, ?, ?)`,
      [
        writeHdr.insertId,
        req.body.exercises[i].name,
        req.body.exercises[i].desc,
        img_src1,
        img_src2
      ]
    );
  }
  res.send({id: writeHdr.insertId});
});

app.get(`/routine/userroutines/:currUser`, async function(req, res) {
  let routines = [];
  let routinelist = [];
  let hdr_result = await db.query(
    `select hdr.id, hdr.routine_name from fh_routine_hdr as hdr where hdr.userid = ?`,
    [req.params.currUser]
  );

  for (i = 0; i < hdr_result.length; i++) {
    let rtn_element = {};
    let dtl_result = await db.query(
      `select dtl.exercise_name, dtl.exercise_desc, dtl.front_img_src, dtl.rear_img_src from fh_routine_dtl as dtl where dtl.routine_id = ?`,
      [hdr_result[i].id]
    );
    rtn_element.id = hdr_result[i].id;
    rtn_element.routine_name = hdr_result[i].routine_name;
    let exercises = [];
    for (j = 0; j < dtl_result.length; j++) {
      exercises.push({
        name: dtl_result[j].exercise_name,
        desc: dtl_result[j].exercise_desc,
        img: [dtl_result[j].front_img_src, dtl_result[j].rear_img_src]
      });
    }
    rtn_element.exercises = exercises;
    routines.push(rtn_element);
  }
  res.send(routines);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
