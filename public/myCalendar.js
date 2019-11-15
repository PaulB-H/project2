let selDate = moment(Date()).format("YYYY-MM-DD");
localStorage.setItem("currentUser", 1);

// Defining Variables

function today() {
  let dspTime;
  $.ajax({
    url: `/calendar/load/${selDate}/${localStorage.get("currentUser")}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      console.log(result);
      var keyNames = Object.keys(result[0]);
      let time_slots = new Date();
      let slot_cntr = -1;
      let calDate = moment(selDate).format("LL");

      $(
        `<div class = "col-12" style="display:flex; justify-content:space-between">
                
        <div id="calendar_date">${calDate}</div>
                <div><button id="save_btn" class="saveBtn col" value="${
                  result[0]["userid"]
                }" onclick="save_event()">Save</button></div>
              </div>`
      ).appendTo("#day-view");
      keyNames.forEach(element => {
        time_slots.setHours(slot_cntr, 0, 0, 0);
        dspTime = time_slots.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        if (element !== "myDate" && element != "userid") {
          $(
            `<div class="col-12 card" id="time-block">
                    <div class="col" style="display:flex">
                      <div class="col-sm-1">
                        <p class="inline_time"> ${dspTime} </p>
                      </div>
                      <div class = "col-10 event_style">
                        <textarea spellcheck="true" class="card time-block col" id="event${element}" value="" placeholder="Free Time Slot">${
              result[0][element]
            }</textarea>
                      </div>
                      <div>
                        <button id="save_btn" class="saveBtn col" value="${
                          result[0]["userid"]
                        }" onclick="save_event()">Save</button>
                      </div>
                    </div>
            </div>`
          ).appendTo("#day-view");
        }
        slot_cntr++;
      });
    },
    error: function(err) {
      console.log(err);
    },
    complete: function() {
      console.log("Got here");
    }
  });
}

async function save_event() {
  event.preventDefault();
  let calDay = [
    moment($("#calendar_date")[0].innerText).format("YYYY-MM-DD"),
    event.target.value
  ];
  console.log("saving day information");
  for (i = 2; i < 26; i++) {
    calDay[i] = $(`#eventhr${i}`).val();
  }
  $.ajax({
    url: `/calendar/save`,
    type: "POST",
    data: { calDay },
    success: function(data) {
      console.log("Committed", data);
    }
  });
}

$(document).ready(today);
