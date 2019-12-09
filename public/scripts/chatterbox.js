async function myMessages() {
  $("#contacts").empty();
  $(`<h6>Conversations:</h6>`).appendTo("#contacts");

  $.ajax({
    url: `/hubchat/chatter/messengers/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
          $(
            `<div>
            <button class="correspondents col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].last_name}, ${result[i].first_name}
            </button>
          </div>`
          ).appendTo("#contacts");
        }
        getStrangers();
      }
    }
  });
}

async function getStrangers() {
  $("#strangers").empty();
  $(`<h6>Users:</h6>`).appendTo("#strangers");
  $.ajax({
    url: `/hubchat/chatter/strangers/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
          $(
            `<div>
            <button class="correspondents col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].last_name}, ${result[i].first_name}
            </button>
          </div>`
          ).appendTo("#strangers");
        }
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
      $("#chat-header").empty();
      $("#msg_holder").empty();
      if (result.length > 0) {
        $(
          `<h5 id="chat-header" ><span><span>Chat to: ${result[0].last_name}, ${result[0].first_name} (</span><span id="chatWith" style="text-align: left">${correspondentName}</span>)</span></h5>`
        ).prependTo("#chat-window");
        console.log(
          moment(result[i].createdat).format("LL"),
          moment(result[i].createdat).format("LTS"),
          result
        );
        // function writeMessages() {
        for (i = 0; i < result.length; i++) {
          $(`<div class="msgBox ${setMessageJustify(
            currUser,
            result[i].sentbyid
          )}" style="margin: 1em">
            <span>${moment(result[i].createdat).format("LL")}</span>
            <span>${moment(result[i].createdat).format("LTS")}</span>
            <div class = "msgBox" style="background-color:white">${
              result[i].chatmessage
            }</div></div>`).appendTo("#comm_thread");
        }
      }

      $(`<span id="msg_holder" ><div style="position:absolute; bottom: -40; right: 0">
								<textarea
								rows="4"
								cols="50"
								spellcheck="true"
								class="card time-block col"
								style="background-color:lemonchiffon"
								id="msg_editor"
								value=""
								>
								</textarea>
								<div><button id="save_btn" class="saveBtn" value="" onclick=saveMessage(${correspondent})>Save Message</button></div>
							</div></span>`).appendTo("#chat-window");
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
      for (i = 0; i < result.length; i++) {
        $(`<div class="msgBox" style="margin: 1em">
            <span>${result[i].last_name}, ${result[i].first_name}</span>
           </div>`).appendTo(".content_plate2");
      }
    }
  });
}

async function saveMessage(msgTo) {
  console.log("Checking results", msgTo);
  console.log(
    "Checking results",
    $("#msg_editor")
      .val()
      .trim()
  );
  if (
    $("#msg_editor")
      .val()
      .trim().length > 0
  ) {
    $.ajax({
      url: `/hubchat/chatter/save/${currUser}/${msgTo}/${$(
        "#msg_editor"
      ).val()}`,
      type: "POST",
      data: {},
      success: function(result) {
        $(`<div class="msgBox ${setMessageJustify(
          currUser,
          result[0].sentbyid
        )}" style="margin: 1em">
              <span>${moment(result[0].createdat).format("LLLL")}</span>
              <div style="background-color:white">${
                result[0].chatmessage
              }</div></div>`).appendTo("#comm_thread");
        $("#msg_editor").val("");
        myMessages();
        showStrangers();
      }
    });
  }
}

var currUser = localStorage.getItem("currentUser");
$(document).ready(myMessages);
