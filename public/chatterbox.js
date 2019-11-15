async function myMessages() {
  $.ajax({
    url: `/hubchat/messengers/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      $(
        `<button id="newchat_btn" class="newchatBtn col" onclick="showStrangers()">Start New Chat</button>`
      ).appendTo("#strangers");
      for (i = 0; i < result.length; i++) {
        $(
          `<div>
            <button id="comm_btn" class="correspondents commBtn col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#contacts");
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
      for (i = 0; i < result.length; i++) {
        $(`<div class="msgBox" style="margin: 1em">
            <span>${result[i].username}</span>
           </div>`).appendTo(".content_plate2");
      }
    }
  });
}

// Listeners
$("#msg_editor").on("onkeydown", function() {
  if (event.which == 13) {
    console.log("Enter pressed ");
    $.ajax({
      url: `/hubchat/chatter/save/${currUser}`,
      type: "POST",
      success: function(result) {
        console.log(result);
      }
    });
  }
});

const currUser = localStorage.getItem("currentUser");
$(document).ready(myMessages);
