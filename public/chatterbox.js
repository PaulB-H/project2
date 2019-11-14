async function myMessages() {
  $.ajax({
    url: `/hubchat/messengers/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      $(
        `<span>
          <h5 style="text-align: right"><button id="newchat_btn" class="newchatBtn col" onclick="showStrangers()">Start New Chat</button></h5>
        </span>`
      ).appendTo("#comm_list");
      for (i = 0; i < result.length; i++) {
        console.log(result[i].username);
        $(
          `<div id="correspondents" style="margin:1em">
            <button id="comm_btn" class="commBtn col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#comm_list");
      }
    }
  });
}

async function showConversation(correspondent, correspondentName) {
  $.ajax({
    url: `/hubchat/chatter/${currUser}/${correspondent}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log(correspondentName);
      $("#comm_thread").empty();
      $(
        `<span><h5 style="text-align: center">${correspondentName}</h5></span>`
      ).appendTo("#comm_thread");
      for (i = 0; i < result.length; i++) {
        $(`<div class="msgBox ${setMessageJustify(
          currUser,
          result[i].sentbyid
        )}" style="margin: 1em">
            <span>${moment(result[i].createdAt).format("LLLL")}</span>
            <div style="background-color:white">${
              result[i].chatmessage
            }</div></div>`).appendTo("#comm_thread");
      }
    }
  });
}

function setMessageJustify(currUser, correspondent) {
  console.log(currUser + " - " + correspondent);
  if (currUser == correspondent) {
    return "fromMe";
  } else {
    return "toMe";
  }
}

async function showStrangers() {
  $.ajax({
    url: `/hubchat/chatter/strangers/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log(result);
      // for (i = 0; i < result.length; i++) {
      //   $(`<div class="msgBox ${setMessageJustify(
      //     currUser,
      //     result[i].sentbyid
      //   )}" style="margin: 1em">
      //       <span>${moment(result[i].createdAt).format("LLLL")}</span>
      //       <div style="background-color:white">${
      //         result[i].chatmessage
      //       }</div></div>`).appendTo("#comm_thread");
      // }
    }
  });
}

const currUser = localStorage.getItem("currentUser");
$(document).ready(myMessages);
