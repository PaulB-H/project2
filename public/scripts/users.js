async function getTrainers() {
  $(".find_trainers").empty();
  $.ajax({
    url: `/api/users/`,
    type: "GET",
    cache: false,
    success: function(result) {
      console.log("success reached");
      for (i = 0; i < result.length; i++) {
        $(
          `<div>
            <button class="trainer saveBtn col" value="${result[i].id}" onclick="showBio(${result[i].id}, '${result[i].username}')">
             ${result[i].username}
            </button>
          </div>`
        ).appendTo(".find_trainers");
      }
      getStrangers();
    }
  });
}
