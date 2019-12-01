let selDate = $("#selDate");
selDate.value = new Date();
$("#selDate").val(moment(new Date()).format("YYYY-MM-DD"));

// document.getElementsByName("istrainer").addEventListener("change", function() {
//   if (document.getElementsByName("istrainer").checked) {
//     document.getElementsByName("trainer_bio").style.display = "block";
//     document.getElementsByName("fitness_goals").style.display = "none";
//   }
// });

// isTrainer.addEventListener;
// Defining Variables

selDate.on("change", function() {
  selDate.value = moment($("#selDate").val()).format("YYYY-MM-DD");
  today();
});

function today() {
  let dspTime;
  $.ajax({
    url: `/calendar/load/${moment($("#selDate").val()).format(
      "YYYY-MM-DD"
    )}/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      $("#day-view").empty();
      let time_slots = new Date();
      if (result.length == 0) {
        for (i = 0; i < 24; i++) {
          time_slots.setHours(i + 1, 0, 0, 0);
          dspTime = time_slots.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          $(
            `<div class="col-12 card" id="time-block"  style="width:100%">
                      <div class="col" style="display:flex">
                        <div class="col-sm-2">
                          <p class="inline_time"> ${dspTime} </p>
                        </div>
                        <div class = "col-8 event_style">
                          <textarea spellcheck="true" class="card time-block col" id="eventhr${i}" value="" placeholder="Free Time Slot"></textarea>
                        </div>
                        <div>
                          <button id="save_btn" class="saveBtn col" value="${currUser}" onclick="save_event()">Save</button>
                        </div>
                      </div>
              </div>`
          ).appendTo("#day-view");
        }
      } else {
        var keyNames = Object.keys(result[0]);
        // let time_slots = new Date();
        let slot_cntr = -1;
        let calDate = moment(selDate).format("LL");

        keyNames.forEach(element => {
          time_slots.setHours(slot_cntr, 0, 0, 0);
          dspTime = time_slots.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          if (element !== "myDate" && element != "userid") {
            $(
              `<div class="col-12 card" id="time-block"  style="width:100%">
                      <div class="col" style="display:flex">
                        <div class="col-sm-2">
                          <p class="inline_time"> ${dspTime} </p>
                        </div>
                        <div class = "col-8 event_style">
                          <textarea spellcheck="true" class="card time-block col" id="event${element}" value="" placeholder="Free Time Slot">${result[0][element]}</textarea>
                        </div>
                        <div>
                          <button id="save_btn" class="saveBtn col" value="${currUser}" onclick="save_event()">Save</button>
                        </div>
                      </div>
              </div>`
            ).appendTo("#day-view");
          }
          slot_cntr++;
        });
      }
    },
    error: function(err) {
      console.log("Error found - ", err);
    },
    complete: function() {
      console.log("Got here");
    }
  });
}

async function save_event() {
  event.preventDefault();
  let calDay = [$("#selDate").val(), event.target.value];
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
