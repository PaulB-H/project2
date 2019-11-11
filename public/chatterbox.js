async function myInbox(userid) {
  let result = await db.query(
    `select hc.sentbyid, usr.username from fh_hubchat hc inner join fh_users usr on sendtoid = usr.id where hc.sendtoid = ?`,
    [userid]
  );
  console.log(result);
}
async function myOutbox(userid) {
  let result = await db.query(
    `select hc.sendtoid, usr.username from fh_hubchat hc inner join fh_users usr on sentbyid = usr.id where hc.sentbyid = ?`,
    [userid]
  );
  console.log(result);
}

$(document).ready(myInbox);
