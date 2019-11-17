async function myRoutines() {
  $("#myRoutines").empty();
  // $(
  //   `<button id="newroutine_btn" class="saveBtn col" onclick="ignition()">New Routine</button>`
  // ).appendTo("#initRoutine");
  $.ajax({
    url: `/routine/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      for (i = 0; i < result.length; i++) {
        $(
          `<div>
            <button class="correspondents saveBtn col" value="${result[i].id}" onclick="showRoutineDetails(${result[i].id}, '${result[i].routine_name}')">
             ${result[i].routine_name}
            </button>
          </div>`
        ).appendTo("#myRoutines");
      }
    }
  });
}

async function showRoutineDetails(routineId, routineName) {
  $("#routine_hdr").empty();
  $("#routine_details").empty();
  $(
    `<span><h5 id="routine_hdr" style="text-align: center">${routineName}</h5></span>`
  ).prependTo("#routine-window");

  $.ajax({
    url: `/routine/details/${routineId}`,
    type: "GET",
    cache: false,
    success: function(result) {
      // function writeMessages() {
      for (i = 0; i < result.length; i++) {
        $(`<div class="routineBox" style="margin: 1em">
            <div style="background-color:white">${result[i].routine_details}</div>
            <div
          </div>`).appendTo("#routine_details");
      }
    }
  });
}

async function ignition() {
  $("#routine_hdr").empty();
  $.ajax({
    url: `/routine/newroutine/${currUser}`,
    type: "GET",
    cache: false,
    success: function(result) {
      $(
        `<span id="routine_hdr"><h5 style="text-align: center">${result[0].routine_name}</h5></span>`
      ).prependTo("#routine-window");
    }
  });
}

async function saveExercise() {
  // Get user, routine title and exercise text for ajax call
  let routineName = $("#routine_hdr > h5").html();
  let exercise = $("#exercise")
    .html()
    .trim();
  if (exercise.length > 0) {
    $.ajax({
      url: `/routine/save/${currUser}/${routineName}/${exercise}`,
      type: "POST",
      data: {},
      success: function(result) {
        $(`<div class="msgBox" style="margin: 1em">
              <div style="background-color:white">${result[0].title}</div></div>`).appendTo(
          "#myRoutines"
        );
        $(`<div class="msgBox" style="margin: 1em">
              <div style="background-color:white">${result[0].excercise}</div></div>`).appendTo(
          "#routine_details"
        );
      }
    });
  }
}

$(document).ready(myRoutines);
