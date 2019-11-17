let selDate = $("#selDate");
// let dateControl = document.querySelector("#selDate");
selDate.value = new Date();
$("#selDate").val(new Date());
$("#selDate").innerText = new Date();
console.log("Testing " + selDate);

// Defining Variables

function today() {
  let dspTime;
  console.log(selDate.value);
  $.ajax({
    url: `/calendar/load/${selDate.value}/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      var keyNames = Object.keys(result[0]);
      let time_slots = new Date();
      let slot_cntr = -1;
      let calDate = moment(selDate).format("LL");

      // $(
      //   `<div class = "col-12" style="display:flex; justify-content:space-between">

      //   <div id="calendar_date">${calDate}</div>
      //           <div><button id="save_btn" class="saveBtn col" value="${
      //             result[0]["userid"]
      //           }" onclick="save_event()">Save</button></div>
      //         </div>`
      // ).appendTo("#day-view");
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
