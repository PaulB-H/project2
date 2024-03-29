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
      console.log(result, "Calendar success reached");
      $("#day-view").empty();
      let time_slots = new Date();
      if (result.length == 0) {
        for (i = 0; i < 24; i++) {
          time_slots.setHours(i, 0, 0, 0);
          dspTime = time_slots.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          $(`<div class="" id="time-block">
              <p class="inline_time"> ${dspTime} </p>
              <div class="fieldRow_calendar">
                <textarea spellcheck="true" class="time-block timeField" id="eventhr${i +1}" value=""></textarea>
                <button class="saveBtn_calendar" value="${currUser}" onclick="save_event()">Save</button>
              </div>
            </div>`
          ).appendTo("#day-view");
        }
      } else {
        for (i = 0; i < 24; i++) {
          time_slots.setHours(i, 0, 0, 0);
          dspTime = time_slots.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          $(`<div class="" id="time-block">
              <p class="inline_time"> ${dspTime} </p>
              <div class="fieldRow_calendar">
                <textarea spellcheck="true" class="time-block timeField" id="eventhr${i +1}" value="">${result[0][`hr${i + 1}`]}</textarea>
                <button class="saveBtn_calendar" value="${currUser}" onclick="save_event()">Save</button>
              </div>
            </div>`
          ).appendTo("#day-view");
        }
      }
    },
    error: function(err) {
      console.log("Error found - ", err);
    },
    complete: function() {
      // console.log("Got here");
    }
  });
}

async function save_event() {
  event.preventDefault();
  let calDay = [];
  for (i = 0; i < 23; i++) {
    calDay[i] = $(`#eventhr${i + 1}`).val();
  }
  $.ajax({
    url: `/calendar/save/${event.target.value}/${$("#selDate").val()}`,
    type: "POST",
    data: { calDay },
    success: function(data) {
      // console.log("Committed", data);
    }
  });
}

$(document).ready(today);
