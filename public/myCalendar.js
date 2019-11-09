// Defining Vriables

planner_page = new Array();
page_to_write = new Array();

function today() {
  let myTime = new Date();
  let dspTime;

  if (!localStorage.myDay) {
    var newPage = true;
  } else {
    var newPage = false;
    planner_page = JSON.parse(localStorage.getItem("myDay"));
    page_to_write = JSON.parse(localStorage.getItem("myDay"));
  }

  $("#day-view").empty();
  for (i = 0; i < 24; i++) {
    let currentTime = new Date();
    let act_hour = i + 1;
    myTime.setHours(i, 0, 0, 0);
    dspTime = myTime.toLocaleString([], { hour: "2-digit", minute: "2-digit" });

    if (newPage) {
      $(
        `<div class="col-12 card ${setTimeBlockColour(
          currentTime.getHours(),
          i
        )}" id="time-block"><div class="row"><p class="inline_time"> ${dspTime} </p><textarea class="card time-block col" id="event" name="${i}" type="text" value="" placeholder="Free Time Slot" onchange="post_event()"></textarea><div id="btn_box"><div><button id="save_btn" class="saveBtn col" value="${i}" onclick="save_event()">Save</button></div><div><button id="delete_btn" class="saveBtn col" value="${i}" onclick="delete_event()">Delete</button></div></div>`
      ).appendTo("#day-view");
      planner_page[i] = {
        hour: i,
        event: $("#event input[name=time-slot]").val()
      };
      page_to_write[i] = {
        hour: i,
        event: $("#event input[name=time-slot]").val()
      };
    } else {
      if (planner_page[i].event) {
        $(
          `<div class="card ${setTimeBlockColour(
            currentTime.getHours(),
            i
          )}" style="font-style:italic" id="time-block">${dspTime}<textarea class="card time-block" id="event" name="${i}" type="text" value="${
            planner_page[i].event
          }" placeholder="Free Time Slot" onchange="post_event()"></textarea><button id="save_btn" class="saveBtn" value="${i}" onclick="save_event()">Save Entry</button></div>`
        ).appendTo("#day-view");
      } else {
        $(
          `<div class="card ${setTimeBlockColour(
            currentTime.getHours(),
            i
          )}" id="time-block">${dspTime}<textarea class="card time-block" id="event" name="${i}" type="text" value="" placeholder="Free Time Slot" onchange="post_event()"></textarea><button id="save_btn" class="saveBtn" value="${i}" onclick="save_event()">Save Entry</button></div>`
        ).appendTo("#day-view");
      }
    }
  }
  rightNow = setInterval(showCurrentDate, 1000);
}

function setTimeBlockColour(currentHour, timeBlockHour) {
  if (
    currentHour > timeBlockHour &&
    (timeBlockHour >= 9 && timeBlockHour <= 17)
  ) {
    return "past";
  } else if (timeBlockHour < 9) {
    return "nonworkhour";
  } else if (currentHour == timeBlockHour) {
    return "present";
  } else if (currentHour < timeBlockHour && timeBlockHour <= 17) {
    return "future";
  } else if (timeBlockHour > 17) {
    return "nonworkhour";
  }
}

function showCurrentDate() {
  $("#calendar-header").html(moment().format("MMMM Do YYYY, h:mm:ss a"));
}

function post_event() {
  event.preventDefault();
  planner_page[event.target.name].event = event.target.value;
}

function save_event() {
  event.preventDefault();
  page_to_write[event.target.value].event =
    planner_page[event.target.value].event;
  localStorage.setItem("myDay", JSON.stringify(page_to_write));

  planner_page = JSON.parse(localStorage.getItem("myDay"));
  page_to_write = JSON.parse(localStorage.getItem("myDay"));
}

$(document).ready(today);
