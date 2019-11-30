async function myClients() {
  showClientProfile(currUser);
  $("#bioscreen").empty();
  $(
    `<div>
      <button class="clients myBtn col" value="${currUser}" onclick="showClientProfile(${currUser})">
        My Profile
      </button>
    </div>
    <div class="col-sm-12" id="clientBio" style="background-color: white; overflow-y: auto; display: flex;flex-direction: column">
    </div>
`
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
          `<div class="col" style="display:flex">
            <button class="clients saveBtn" style="width:${
              result[i].username.length
            }" value="${result[i].id}" onclick="showClientProfile(${
            result[i].id
          })">
             ${result[i].last_name + ", " + result[i].first_name}
            </button>
             <button><button class=delBtn value="${
               result[i].id
             }" onclick="delClient(${result[i].id})">X</button>
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
          `<div class="col" style="display:flex">
            <button class="correspondent saveBtn" style="width:${
              result[i].username.length
            }" value="${result[i].id}" onclick="showClientProfile(${
            result[i].id
          })">
             ${result[i].last_name + ", " + result[i].first_name}
            </button>
            <button class=addBtn value="${result[i].id}" onclick="getClient(${
            result[i].id
          })">A</button>
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
      if (Number(userId) !== Number(currUser)) {
        $("#profile_header").innerText =
          result[0].first_name + " " + result[0].last_name + " - Trainer";
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
        $("#profile_header").innerText =
          result[0].first_name + " " + result[0].last_name + " - User";
        $(`<div style="position:relative; top:0">
            <IFRAME style="display:none" name="hidden-form"></IFRAME>
            <form action="/api/user/update/${currUser}"  method="POST" target="hidden-form">
              First Name: <input type="text" name="firstname" value="${result[0].first_name}"><br/>
              Last Name: <input type="text" name="lastname" value="${result[0].last_name}"><br/>
              Address:<br/>
              <input type="text" name="address_line1" placeholder="Address line 1" value="${result[0].address_line1}"><br/>
              <input type="text" name="address_line2" placeholder="Address line 2" value="${result[0].address_line2}"><br/>
              City: <input type="text" name="city" value="${result[0].city}"><br/>
              Postal Code: <input type="text" name="postal_code" value="${result[0].postal_code}"><br/>
              Contact No.: <input type="tel" id="phone" name="cellphone" value="${result[0].cellphone}"><br/>
              Email: <input type="email" id="email" value="${result[0].email}"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30"
							name="email"><br/>
              Password: <input type="text" id="password" name="password"><br />
              Seeking Trainer: <input type="checkbox" name="seeking_trnr" onchange="toggleInfo(this)" value="${result[0].seeking_trainer}"><br />
              Personal Trainer: <input type="checkbox" name="istrainer" onchange="toggleInfo(this)" value="${result[0].istrainer}"><br />
              Fitness Goals:<br/>
              <textarea id="rd_only_fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${result[0].fitness_goals}"></textarea><br/>
              Bio:<br />
              <textarea id="trainer_bio" spellcheck="true" name="trainer_bio" rows="5" cols="33"></textarea>
						  <input type="submit" value="Submit">
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
      myClients();
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
      myClients();
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
