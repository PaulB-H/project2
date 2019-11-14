async function myMessages() {
  $.ajax({
    url: `/hubchat/messengers/2`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      for (i = 0; i < result.length; i++) {
        $(
          `<div style="margin:1em"><button id="comm_btn" class="commBtn col" value="${result[i].id}" onclick="showConversation(${result[i].id})">${result[i].username}</button></div>`
        ).appendTo("#comm_list");
      }
    }
  });
}

async function showConversation(currUser) {
  $.ajax({
    url: `/hubchat/chatter/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log(result);
      $("#comm_thread").empty();
      for (i = 0; i < result.length; i++) {
        $(`<div style="margin: 1em">
            <span>${moment(result[i].createdat).format("LLL")}</span><br/>
            <textarea>${result[i].chatmessage}</textarea></div>`).appendTo(
          "#comm_thread"
        );
      }
    }
  });
}

$(document).ready(myMessages);
