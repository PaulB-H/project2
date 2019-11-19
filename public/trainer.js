async function myClients() {
  showClientProfile(currUser);
  $("#myClients").empty();
  $(
    `<div>
      <button class="clients myBtn col" value="${currUser}" onclick="showClientProfile(${currUser})">
        My Profile
      </button>
    </div>`
  ).appendTo("#bioscreen");
  $.ajax({
    url: `/api/trainer/client/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      $(
        `<button id="newclient_btn" class="newchatBtn" onclick="">List of Potential Clients</button>`
      ).appendTo("#potentialClients");
      for (i = 0; i < result.length; i++) {
        $(
          `<div class="col">
            <button><button class=delBtn value="${result[i].id}" onclick="delClient(${result[i].id})">X</button>
            <button class="clients saveBtn" style="width:${result[i].username.length}" value="${result[i].id}" onclick="showClientProfile(${result[i].id})">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#bioscreen");
      }
      getPotentialClients();
    }
  });
}

async function getPotentialClients() {
  $("#potentialClients").empty();
  $.ajax({
    url: `/api/trainer/potentials`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      $(
        `<button id="newclient_btn" class="newchatBtn" onclick="showStrangers()">List of Potential Clients</button>`
      ).appendTo("#potentialClients");
      for (i = 0; i < result.length; i++) {
        $(
          `<div class="col">
            <button class=addBtn value="${result[i].id}" onclick="getClient(${result[i].id})">A</button>
            <button class="correspondent saveBtn" style="width:${result[i].username.length}" value="${result[i].id}" onclick="showClientProfile(${result[i].id})">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#potentialClients");
      }
    }
  });
}

async function showClientProfile(userId) {
  $("#clientBio").empty();
  $.ajax({
    url: `/api/trainer/clientinfo/${userId}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log(result);
      if (userId !== currUser) {
        $(`<div style="position:relative; top: 0">
            <form action="/api/users"  method="POST" target="hidden-form">
              First name: <input type="text" name="firstname" value="${result[0].first_name}" readonly><br/>
              Last name:  <input type="text" name="lastname" value="${result[0].last_name}" readonly><br/>
              Address:<br/>
              <input type="text" name="address_line1" placeholder="Address line 1" value="${result[0].address_line1}" readonly><br/>
              <input type="text" name="address_line2" placeholder="Address line 2" value="${result[0].address_line2}" readonly><br/>
              City: <input type="text" name="city" value="${result[0].city}" readonly><br/>
              Postal Code: <input type="text" name="postal_code" value="${result[0].postal_code}" readonly><br/>
              Contact No.: <input type="tel" id="rd_only_rd_only_phone" name="cellphone" value="${result[0].cellphone}" readonly><br/>
              Email: <input type="email" id="rd_only_email" value="${result[0].email}" readonly><br/>
              Fitness Goals:<br/>
              <textarea id="rd_only_fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${result[0].fitness_goals}" readonly></textarea><br/>
            </form>
          </div>`).appendTo("#clientBio");
      } else {
        $(`<div style="position:relative; top:0">
            <form action="/api/users"  method="POST" target="hidden-form">
              First Name: <input type="text" name="firstname" value="${result[0].first_name}"><br/>
              Last Name: <input type="text" name="lastname" value="${result[0].last_name}"><br/>
              Address:<br/>
              <input type="text" name="address_line1" placeholder="Address line 1" value="${result[0].address_line1}"><br/>
              <input type="text" name="address_line2" placeholder="Address line 2" value="${result[0].address_line2}"><br/>
              City: <input type="text" name="city" value="${result[0].city}"><br/>
              Postal Code: <input type="text" name="postal_code" value="${result[0].postal_code}"><br/>
              Contact No.: <input type="tel" id="rd_only_rd_only_phone" name="cellphone" value="${result[0].cellphone}"><br/>
              Email: <input type="email" id="rd_only_email" value="${result[0].email}"><br/>
              Fitness Goals:<br/>
              <textarea id="rd_only_fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${result[0].fitness_goals}"></textarea>
            </form>
          </div>`).appendTo("#clientBio");
      }
    }
  });
}

async function delClient(userId) {
  $.ajax({
    url: `/api/trainer/delclient/${userId}`,
    type: "POST",
    cache: false,
    success: function(result) {
      getPotentialClients();
      showClientProfile(currUser);
    }
  });
}

async function getClient(userId) {
  $.ajax({
    url: `/api/trainer/getclient/${currUser}/${userId}`,
    type: "POST",
    cache: false,
    success: function(result) {
      getPotentialClients();
      showClientProfile(currUser);
    }
  });
}

// function setMessageJustify(currUser, correspondent) {
//   if (currUser == correspondent) {
//     return "fromMe";
//   } else {
//     return "toMe";
//   }
// }

// async function showStrangers() {
//   $.ajax({
//     url: `/trainer/chatter/strangers/${currUser}`,
//     type: "GET",
//     cache: false,
//     success: function(result) {
//       console.log(result);
//       for (i = 0; i < result.length; i++) {
//         $(`<div class="msgBox" style="margin: 1em">
//             <span>${result[i].username}</span>
//            </div>`).appendTo(".content_plate2");
//       }
//     }
//   });
// }

// async function saveMessage() {
//   if (
//     $("#msg_editor")
//       .val()
//       .trim().length > 0
//   ) {
//     $.ajax({
//       url: `/hubchat/chatter/save/${currUser}/${$("#chatWith").text()}/${$(
//         "#msg_editor"
//       ).val()}`,
//       type: "POST",
//       data: {},
//       success: function(result) {
//         $(`<div class="msgBox ${setMessageJustify(
//           currUser,
//           result[0].sentbyid
//         )}" style="margin: 1em">
//               <span>${moment(result[0].createdat).format("LLLL")}</span>
//               <div style="background-color:white">${
//                 result[0].chatmessage
//               }</div></div>`).appendTo("#comm_thread");
//         $("#msg_editor").val("");
//         myMessages();
//         showStrangers();
//       }
//     });
//   }
// }

// const currUser = localStorage.getItem("currentUser");
$(document).ready(myClients);
