async function myClients() {
  $("#myClients").empty();
  $.ajax({
    url: `/api/trainer/client/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      for (i = 0; i < result.length; i++) {
        $(
          `<div>
            <button class="clients saveBtn col" value="${result[i].id}" onclick="showClientList(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#myClients");
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
        `<button id="newclient_btn" class="newchatBtn col" onclick="showStrangers()">List of Potential Clients</button>`
      ).appendTo("#potentialClients");
      for (i = 0; i < result.length; i++) {
        $(
          `<div>
            <button class="correspondents saveBtn col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#potentialClients");
      }
    }
  });
}

// async function showClientList(correspondent, correspondentName) {
//   $.ajax({
//     url: `/hubchat/chatter/${currUser}/${correspondent}`,
//     type: "GET",
//     cache: false,
//     success: function(result) {
//       $("#comm_thread").empty();
//       $("#chatWith").empty();
//       $(
//         `<span><h5 id="chatWith" style="text-align: center">${correspondentName}</h5></span>`
//       ).prependTo("#chat-window");

//       // function writeMessages() {
//       for (i = 0; i < result.length; i++) {
//         $(`<div class="msgBox ${setMessageJustify(
//           currUser,
//           result[i].sentbyid
//         )}" style="margin: 1em">
//             <span>${moment(result[i].createdat).format("LLLL")}</span>
//             <div style="background-color:white">${
//               result[i].chatmessage
//             }</div></div>`).appendTo("#comm_thread");
//       }
//       // };
//       // let hndler = await writeMessages();

//       $(`<div style="position:absolute; bottom: -40; right: 0">
// 								<textarea
// 								rows="4"
// 								cols="50"
// 								spellcheck="true"
// 								class="card time-block col"
// 								style="background-color:lemonchiffon"
// 								id="msg_editor"
// 								value=""
// 								>
// 								</textarea>
// 								<div><button id="save_btn" class="saveBtn col" value="" onclick=saveMessage()>Save Message</button></div>
// 							</div>`).appendTo("#chat-window");
//     }
//   });
// }

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
