async function myMessages() {
  $("#contacts").empty();
  $.ajax({
    url: `/hubchat/chatter/messengers/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      // $(
      //   `<button id="newchat_btn" class="newchatBtn col" onclick="showStrangers()">Start New Chat</button>`
      // ).appendTo("#strangers");
      for (i = 0; i < result.length; i++) {
        $(
          `<div>
            <button class="correspondents saveBtn col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#contacts");
      }
      getStrangers();
    }
  });
}

async function getStrangers() {
  $("#strangers").empty();
  $.ajax({
    url: `/hubchat/chatter/strangers/${currUser}`,
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
            <button class="correspondents saveBtn col" value="${result[i].id}" onclick="showConversation(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo("#strangers");
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
      $("#chatWith").empty();
      $(
        `<span><h5 id="chatWith" style="text-align: center">${correspondentName}</h5></span>`
      ).prependTo("#chat-window");

      // function writeMessages() {
      for (i = 0; i < result.length; i++) {
        $(`<div class="msgBox ${setMessageJustify(
          currUser,
          result[i].sentbyid
        )}" style="margin: 1em">
            <span>${moment(result[i].createdat).format("LLLL")}</span>
            <div style="background-color:white">${
              result[i].chatmessage
            }</div></div>`).appendTo("#comm_thread");
      }
      // };
      // let hndler = await writeMessages();

      $(`<div style="position:absolute; bottom: -40; right: 0">
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
								<div><button id="save_btn" class="saveBtn col" value="" onclick=saveMessage()>Save Message</button></div>
							</div>`).appendTo("#chat-window");
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

async function saveMessage() {
  console.log("Checking SAVE " + $("#msg_editor").val());
  if (
    $("#msg_editor")
      .val()
      .trim().length > 0
  ) {
    $.ajax({
      url: `/hubchat/chatter/save/${currUser}/${$("#chatWith").text()}/${$(
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

const currUser = localStorage.getItem("currentUser");
$(document).ready(myMessages);
