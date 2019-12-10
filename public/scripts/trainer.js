async function myClients() {
  showClientProfile(currUser);
  $.ajax({
    url: `/api/trainer/client/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      if (result.length > 0) {
        // console.log("success reached");
        $(`<h6>Current Clients</h6>`).appendTo("#potentialClients");
        for (i = 0; i < result.length; i++) {
          $(
            `<div class="col" style="display:flex">
            <button class="clients myBtn" style="width:${
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
          ).appendTo("#client_list");
        }
        // getPotentialClients();
      }
    }
  });
}

async function getPotentialClients() {
  $("#potentialClients").empty();
  $.ajax({
    url: `/api/trainer/potentials/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      if (result.length > 0) {
        $(`<h6>Potential Clients</h6>`).appendTo("#potentialClients");
        for (i = 0; i < result.length; i++) {
          console.log("Testing Potential");
          $(
            `<div class="col" style="display:flex">
            <button class="correspondent myBtn" style="width:${
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
    }
  });
}

async function showClientProfile(userId) {
  function setCheckboxState(boolVal) {
    if (boolVal) {
      return "checked";
    } else {
      return;
    }
  }

  $("#bioscreen").empty();
  $(`<div>
      <button class="clients myBtn" value="${currUser}" onclick="showClientProfile(${currUser})">
        My Bio
      </button>
    </div>
    <div id="clientBio"></div>
  `).appendTo("#bioscreen");
  $("#clientBio").empty();
  $.ajax({
    url: `/api/trainer/clientinfo/${userId}`,
    type: "GET",
    cache: false,
    success: function(result) {
      if (result.length == 0) {
        console.log("User is not a trainer.");
      } else if (
        result[0].istrainer != 1 &&
        Number(userId) == Number(currUser)
      ) {
        console.log("Phone is ");
        $(`<div class="trainerPanel" style="position:relative; top:0">
              <IFRAME style="display:none" name="hidden-form"></IFRAME>
              <form class="bioForm" action="/api/user/update/${currUser}"  method="POST" target="hidden-form">
                <div><span class="bioLabel">First Name: </span><input type="text" name="firstname" value="${
                  result[0].first_name
                }"></div>
                <div><span class="bioLabel">Last Name: </span><input type="text" name="lastname" value="${
                  result[0].last_name
                }"></div>
                <div><span class="bioLabel">Address: </span><input type="text" name="address_line1" placeholder="Address line 1" value="${
                  result[0].address_line1
                }"></div>
                <div><span class="bioLabel">City: </span><input type="text" name="city" value="${
                  result[0].city
                }"></div>
                <div><span class="bioLabel">Postal Code: </span><input type="text" name="postal_code" value="${
                  result[0].postal_code
                }"></div>
                <div><span class="bioLabel">Contact No.: </span><input type="tel" id="phone" name="cellphone" value="${
                  result[0].cellphone
                }"></div>
                <div><span class="bioLabel">Email: </span><input type="email" id="email" value="${
                  result[0].email
                }" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30"name="email"></div>
                <div class="hideBioLabel"><span class="bioLabel">Password: </span><input type="text" id="password" name="password"></div>
                <div><span class="bioLabel">Seeking Trainer: </span><input type="checkbox" name="seeking_trainer" value="${
                  result[0].seeking_trainer
                }" ${setCheckboxState(result[0].seeking_trainer)}></div>
                <div><span class="bioLabel">Personal Trainer: </span><input type="checkbox" id="istrainer" name="istrainer" onchange="toggleInfo('trainer', ${
                  result[0].istrainer
                })" value="${result[0].istrainer}"  ${setCheckboxState(
          result[0].istrainer
        )}></div>
                <div class="fullWidth"><span class="bioLabel">Fitness Goals: </span><textarea id="fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${
                  result[0].fitness_goals
                }"></textarea></div>
                <div class="fullWidth"><span class="bioLabel">Bio: </span><textarea id="trainer_bio" spellcheck="true" name="trainer_bio" rows="5" cols="33"></textarea></div>
                <div><input type="submit" value="Update"></div>
              </form>
            </div>`).appendTo("#clientBio");
      } else {
        // $("#client_list").css("display", "block");
        // $("#potentialClients").css("display", "block");
        // console.log($("#profile_header").text);
        if (Number(userId) !== Number(currUser)) {
          $(`<div style="position:relative; top: 0">
            <form class="bioForm" action="/api/users"  method="POST" target="hidden-form">
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
          $(`<div class="trainerPanel" style="position:relative; top:0">
              <IFRAME style="display:none" name="hidden-form"></IFRAME>
              <form class="bioForm" action="/api/user/update/${currUser}"  method="POST" target="hidden-form">
                <div><span class="bioLabel">First Name: </span><input type="text" name="firstname" value="${
                  result[0].first_name
                }"></div>
                <div><span class="bioLabel">Last Name: </span><input type="text" name="lastname" value="${
                  result[0].last_name
                }"></div>
                <div><span class="bioLabel">Address: </span><input type="text" name="address_line1" placeholder="Address line 1" value="${
                  result[0].address_line1
                }"></div>
                <div><span class="bioLabel">City: </span><input type="text" name="city" value="${
                  result[0].city
                }"></div>
                <div><span class="bioLabel">Postal Code: </span><input type="text" name="postal_code" value="${
                  result[0].postal_code
                }"></div>
                <div><span class="bioLabel">Contact No.: </span><input type="tel" id="phone" name="cellphone" value="${
                  result[0].cellphone
                }"></div>
                <div><span class="bioLabel">Email: </span><input type="email" id="email" value="${
                  result[0].email
                }" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30"name="email"></div>
                <div class="hideBioLabel"><span class="bioLabel">Password: </span><input type="text" id="password" name="password"></div>
                <div><span class="bioLabel">Seeking Trainer: </span><input type="checkbox" name="seeking_trainer" value="${
                  result[0].seeking_trainer
                }" ${setCheckboxState(result[0].seeking_trainer)}></div>
                <div><span class="bioLabel">Personal Trainer: </span><input type="checkbox" id="istrainer" name="istrainer" onchange="toggleInfo('trainer', ${
                  result[0].istrainer
                })" value="${result[0].istrainer}"  ${setCheckboxState(
            result[0].istrainer
          )}></div>
                <div class="fullWidth"><span class="bioLabel">Fitness Goals: </span><textarea id="fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${
                  result[0].fitness_goals
                }"></textarea></div>
                <div class="fullWidth"><span class="bioLabel">Bio: </span><textarea id="trainer_bio" spellcheck="true" name="trainer_bio" rows="5" cols="33"></textarea></div>
                <div><input type="submit" value="Update"></div>
              </form>
            </div>`).appendTo("#clientBio");
        }
      }
    }
  });
}

async function delClient(userId) {
  $("#client_list").empty();
  $(`<h6>Current Clients</h6>`).appendTo("#client_list");
  $.ajax({
    url: `/api/trainer/delclient/${userId}`,
    type: "POST",
    cache: false,
    success: function(result) {
      getPotentialClients();
      myClients();
      // getClient(currUser);
    }
  });
}

async function getClient(userId) {
  $("#client_list").empty();
  $(`<h6>Current Clients</h6>`).appendTo("#client_list");
  $.ajax({
    url: `/api/trainer/getclient/${currUser}/${userId}`,
    type: "POST",
    cache: false,
    success: function(result) {
      getPotentialClients();
      myClients();
      async function welcomeMessage(userId) {
        $.ajax({
          url: `/hubchat/chatter/save/${currUser}/${userId}/"Hi, as we start our fitness journey together I would like to express to you my commitment to helping you achieve the best you possible. I look forward to working with you."`,
          type: "POST",
          data: {},
          success: function(result) {
            // $(`<div class="msgBox ${setMessageJustify(
            //   currUser,
            //   result[0].sentbyid
            // )}" style="margin: 1em">
            // <span>${moment(result[0].createdat).format("LLLL")}</span>
            // <div style="background-color:white">${
            //   result[0].chatmessage
            // }</div></div>`).appendTo("#comm_thread");
            // $("#msg_editor").val("");
            // myMessages();
            // showStrangers();
          }
        });
      }
      welcomeMessage(userId);
    }
  });
}

async function toggleInfo(cb_value, ischecked) {
  if (cb_value === "seeking" && ischecked) {
    document.getElementById("istrainer").styledisplay = "none";
    document.getElementById("#fitness_goals").css("display", "block");
  } else if (cb_value === "trainer" && ischecked)
    document.getElementById("#fitness_goals").css("display", "none");
}

// <script>
// 	function toggleInfo(checkbox) {
// 		console.log("Trying to toggle " + checkbox.value);
// 		if (checkbox.checked == true) {
// 			document.getElementById("#fitness_goals").css("display", "none");
// 			document.getElementById("#trainer_bio").css("display", "block");
// 		} else {
// 			document.getElementById("#fitness_goals").css("display", "block");
// 			document.getElementById("#trainer_bio").css("display", "none");
// 		}
// 	}
// </script>

$(document).ready(myClients);
