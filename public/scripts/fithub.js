/*
  Table of Contents
  =================


  Main Object
  ===========
  const fh = {};


  Main Objects
  ============
  fh.data = {};
  fh.flag = {};
  fh.interval = {};
  fh.func = {};


  Functions
  =========
  fh.func.apiCall_exercises = function() {

  fh.func.addListener_click_body = function() {
  fh.func.addListener_click_backToLoginButton = function(){
  fh.func.addListener_click_dropdownFindExercise = function() {
  fh.func.addListener_click_eachItemInExercisesDropdownMenu = function() {
  fh.func.addListener_click_initCreateAccountButton = function() {
  fh.func.addListener_click_isTrainerToggle = ()=>{
  fh.func.addListener_click_loginButtonProper = function(){
  fh.func.addListener_click_profileButton = ()=>{
  fh.func.addListener_click_registerButton = ()=>{
  fh.func.addListener_click_routinesButton = ()=>{
  fh.func.addListener_click_saveButtonStagedRoutine = function(){
  fh.func.addListener_click_userTile = ()=>{
  
  fh.func.centerPanelScrollTop = ()=>{
  fh.func.clearContext = ()=>{
  fh.func.click_findableExercise = function(me) {
  fh.func.createAppend_selectedExerciseGroup = function(exerciseBucket) {
  fh.func.createObj_exercise = (url, myArray, flag) => {
  
  fh.func.dbCall_routines = ()=>{
  fh.func.deleteRoutine = (me)=>{

  fh.func.fetch_exerciseImages = function(url_forImage, obj, myArray) {

  fh.func.init_routinesBicepsInFindbar = function() {
  fh.func.init_panel = ()=>{
  fh.func.isWithin = function(coords, elem){

  fh.func.populateRoutineDetails = (me)=>{


  Initialization
  ==============
  window.addEventListener("DOMContentLoaded", event => {

*/

/**********
Main Object
***********/
const fh = {};

/***
Data
****/
fh.data = {};
fh.data.exercises = {};
fh.data.exercises.biceps = [];
fh.data.exercises.shoulders = [];
fh.data.exercises.obliques = [];
fh.data.exercises.chest = [];
fh.data.exercises.quads = [];
fh.data.exercises.abs = [];
fh.data.exercises.lowerNeck = [];
fh.data.exercises.triceps = [];
fh.data.exercises.outerBack = [];
fh.data.exercises.butt = [];
fh.data.exercises.hamstring = [];
fh.data.exercises.calves = [];

/****
Flags
*****/
fh.flag = {};
fh.flag.bicepsFetchDone = false;
fh.flag.lastRightPanelShowing = null;

/********
Intervals
*********/
fh.interval = {};
fh.interval.check_exercisesFetchDone = null;

/***
User
***/
fh.user = {};
fh.user.routines = [];
fh.user.routines_staged = [];

/********
Functions
*********/
fh.func = {};

fh.func.apiCall_exercises = function () {
  /* Muscle Groups Accessed by ID given by API */

  /* Front Muscles */
  let id_biceps = 1;
  let id_shoulders = 2;
  let id_obliques = 14;
  let id_chest = 4;
  let id_quads = 10;
  let id_abs = 6;

  /* Rear Muscles */
  let id_lowerNeck = 9;
  let id_triceps = 5;
  let id_outerBack = 12;
  let id_butt = 8;
  let id_hamstring = 11;
  let id_calves = 7;

  /* Urls use IDs that the API expects */
  let url_biceps = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_biceps}&status=2`;
  let url_shoulders = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_shoulders}&status=2`;
  let url_obliques = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_obliques}&status=2`;
  let url_chest = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_chest}&status=2`;
  let url_quads = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_quads}&status=2`;
  let url_abs = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_abs}&status=2`;

  let url_lowerNeck = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_lowerNeck}&status=2`;
  let url_triceps = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_triceps}&status=2`;
  let url_outerBack = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_outerBack}&status=2`;
  let url_butt = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_butt}&status=2`;
  let url_hamstring = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_hamstring}&status=2`;
  let url_calves = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_calves}&status=2`;

  /* Fetches */

  Promise.all([
    /* Biceps */
    fh.func.createObj_exercise(url_biceps, fh.data.exercises.biceps, true),

    /* Shoulders */
    fh.func.createObj_exercise(url_shoulders, fh.data.exercises.shoulders),

    /* Obliques */
    fh.func.createObj_exercise(url_obliques, fh.data.exercises.obliques),

    /* Chest */
    fh.func.createObj_exercise(url_chest, fh.data.exercises.chest),

    /* Quads */
    fh.func.createObj_exercise(url_quads, fh.data.exercises.quads),

    /* Abs */
    fh.func.createObj_exercise(url_abs, fh.data.exercises.abs),

    /* Lower Neck */
    fh.func.createObj_exercise(url_lowerNeck, fh.data.exercises.lowerNeck),

    /* Triceps */
    fh.func.createObj_exercise(url_triceps, fh.data.exercises.triceps),

    /* OuterBack */
    fh.func.createObj_exercise(url_outerBack, fh.data.exercises.outerBack),

    /* Butt */
    fh.func.createObj_exercise(url_butt, fh.data.exercises.butt),

    /* Hamstring */
    fh.func.createObj_exercise(url_hamstring, fh.data.exercises.hamstring),

    /* Calves */
    fh.func.createObj_exercise(url_calves, fh.data.exercises.calves)
  ]).then(v => {
    console.log(v, "v");
  });
};

fh.func.addListener_click_body = function () {
  let docBody = document.querySelector("body");
  docBody.addEventListener("click", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    let coords = [x, y];

    let dropdown_findbar = document.querySelector(".dropdown_findbar");
    let dropdownMenu = document.querySelector(
      ".wrap_dropdown_findbar .dropdownMenu"
    );

    if (
      fh.func.isWithin(coords, dropdown_findbar) == false &&
      fh.func.isWithin(coords, dropdownMenu) == false
    ) {
      dropdownMenu.classList.add("displayNone");
      dropdownMenu.classList.remove("displayBlock");
    }
  });
};


fh.func.addListener_click_backToLoginButton = function () {

  let backToLoginButton = document.querySelector('.backToLoginButton');

  backToLoginButton.addEventListener('click', () => {

    /* Hide registration form, show login form */
    let wrap_register = document.querySelector('.wrap_register');
    wrap_register.classList.add('displayNone');
    wrap_register.classList.remove('displayBlock');

    let wrap_login = document.querySelector('.wrap_login');
    wrap_login.classList.add('displayBlock');
    wrap_login.classList.remove('displayNone');


    /* Wipe fields on registration form */
    let reg_firstName = document.querySelector('.reg_firstName');
    reg_firstName.value = '';

    let reg_lastName = document.querySelector('.reg_lastName');
    reg_lastName.value = '';

    let reg_email = document.querySelector('.reg_email');
    reg_email.value = '';

    let reg_password = document.querySelector('.reg_password');
    reg_password.value = '';

    let toggleBalls = document.querySelectorAll('.trainerToggleRow .toggleBall');
    for (toggleBall of toggleBalls) {
      toggleBall.classList.add('toggle_off');
      toggleBall.classList.remove('toggle_on');
    };
  });
};


fh.func.addListener_click_close_stageRoutineBlock = () => {

  let closeButton = document.querySelector('.close_stageRoutineBlock');
  closeButton.addEventListener('click', function () {

    /* Remove the stageRoutineBlock panel */
    let parentMenu = this.parentNode;
    parentMenu.classList.add('displayNone');
    parentMenu.classList.remove('displayBlock');

    /* Clear name field for routine */
    let name_stagedRoutine = document.querySelector('.name_stagedRoutine');
    name_stagedRoutine.value = '';

    /* Remove exercise item elements */
    let exerciseItems = document.querySelectorAll('.pasteExercises > div');
    for (item of exerciseItems) {
      item.remove();
    };

    /* Clear staged array */
    fh.user.routines_staged = [];


    /* Show user_wrap_catbar */
    let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
    user_wrap_catbar.classList.add('displayBlock');
    user_wrap_catbar.classList.remove('displayNone');

    /* Show the lastRightPanelShowing */
    if(fh.flag.lastRightPanelShowing == 'profile'){
      let userblock = document.querySelector('.userblock');
      userblock.classList.add('displayBlock');
      userblock.classList.remove('displayNone');
    }
    else{
      let routinesBlock = document.querySelector('.routinesBlock');
      routinesBlock.classList.add('displayBlock');
      routinesBlock.classList.remove('displayNone');
    };
  });
};


fh.func.addListener_click_dropdownFindExercise = function () {
  let dropdownButton = document.querySelector(".dropdown_findbar");
  dropdownButton.addEventListener("click", function () {
    let menu = document.querySelector(".wrap_dropdown_findbar .dropdownMenu");

    if (menu.classList.contains("displayNone")) {
      menu.classList.add("displayBlock");
      menu.classList.remove("displayNone");
    } else if (menu.classList.contains("displayBlock")) {
      menu.classList.add("displayNone");
      menu.classList.remove("displayBlock");
    }
  });
};

fh.func.addListener_click_eachItemInExercisesDropdownMenu = function () {
  let items = document.querySelectorAll(".drop_exercises > div");

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    item.addEventListener("click", function () {
      /* Remove items currently inside findables_exercises */

      let currentItems = document.querySelector(".findables_exercises")
        .children;

      /* Reverse traversal to remove old items */
      for (let a = currentItems.length - 1; a > -1; a--) {
        let oldItem = currentItems[a];
        oldItem.remove();
      }

      /*  Access proper bucket,
      create and append new items inside findables_exercises
      ====================================================== */

      /* Get name from innerHTML of item in dropdown */
      let item_name_preserved = this.children[0].innerHTML;
      let item_name = item_name_preserved.toLowerCase();

      /* Handle 2 Words: Lower Neck & Outer Back => lowerNeck & outerBack */
      if (item_name.includes(" ")) {
        let arr = item_name.split(" ");

        arr[1] = arr[1].charAt(0).toUpperCase() + arr[1].substring(1);

        item_name = arr[0] + arr[1];
      }

      /* Access Proper Bucket */
      let exerciseBucket = fh.data.exercises[item_name];

      /* Create and append new items according to exercise selected in dropdown */
      fh.func.createAppend_selectedExerciseGroup(exerciseBucket);

      /* displayNone dropdown menu */
      let drop_exercises = document.querySelector(".drop_exercises");
      drop_exercises.classList.add("displayNone");
      drop_exercises.classList.remove("displayBlock");

      let dropdownButtonTitle = document.querySelector(
        ".dropdown_findbar > span:nth-of-type(1)"
      );
      dropdownButtonTitle.innerHTML = item_name_preserved;
    });
  }
};

/*
DONT NEED BELOW, THIS WAS TO CHANGE LOGIN PANEL TO REGISTRATION PANEL
*/
fh.func.addListener_click_initCreateAccountButton = function () {

  let init_createAccountButton = document.querySelector(".init_createAccountButton");

  init_createAccountButton.addEventListener("click", function () {

    /* Hide wrap_login, show wrap_registration */
    let wrap_login = document.querySelector('.wrap_login');
    wrap_login.classList.add('displayNone');
    wrap_login.classList.remove('displayBlock');

    let wrap_register = document.querySelector('.wrap_register');
    wrap_register.classList.add('displayBlock');
    wrap_register.classList.remove('displayNone');


    /* Wipe fields on login form */
    let loginEmail = document.querySelector('.loginEmail');
    loginEmail.value = '';

    let loginPass = document.querySelector('.loginPass');
    loginPass.value = '';
  });
};

fh.func.addListener_click_trainerToggles = () => {

  let toggles = document.querySelectorAll('.trainerToggleRow .toggle');

  for (let i = 0; i < toggles.length; i++) {

    let toggle = toggles[i];

    toggle.addEventListener('click', function (e) {

      e.preventDefault();
      e.stopPropagation();

      let toggleBall = toggle.children[0];

      if (toggleBall.classList.contains('toggle_off')) {
        toggleBall.classList.add('toggle_on');
        toggleBall.classList.remove('toggle_off');
      }
      else
        if (toggleBall.classList.contains('toggle_on')) {
          toggleBall.classList.add('toggle_off');
          toggleBall.classList.remove('toggle_on');
        };
    });
  };
};

fh.func.addListener_click_loginButtonProper = function () {

  let loginButton = document.querySelector(".loginButton");
  
  loginButton.addEventListener("click", function() {

    let obj = {};
    obj.email = document.querySelector(".loginEmail").value;
    obj.user_password = document.querySelector(".loginPass").value;

    let url = `api/users/${obj.email}/${obj.user_password}`;

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {

      let id = data[0].id;

      window.localStorage.setItem('currentUser', id);

      $.ajax({
        url: `/api/trainer/clientinfo/${id}`,
        type: "GET",
        cache: false,
        success: function (result) {
            
          if (result.length == 0) {
            console.log("User is not a trainer.");
          }
          else
          if( result[0].istrainer != 1 && Number(id) == Number(currUser) ){
            $("#client_list").css("display", "none");
            $("#potentialClients").css("display", "none");
            // console.log($("#profile_header"));
            $("#profile_header").text() = result[0].first_name + " " + result[0].last_name;
            $(`<div class="trainerPanel" style="position:relative; top:0">
                <IFRAME style="display:none" name="hidden-form"></IFRAME>
                <form action="/api/user/update/${currUser}"  method="POST" target="hidden-form">
                  First Name: <input type="text" name="firstname" value="${result[0].first_name}"><br/>
                  Last Name: <input type="text" name="lastname" value="${result[0].last_name}"><br/>
                  Address:<br/>
                  <input type="text" name="address_line1" placeholder="Address line 1" value="${result[0].address_line1}"><br/>
                  <input type="text" name="address_line2" placeholder="Address line 2" value="${result[0].address_line2}"><br/>
                  City: <input type="text" name="city" value="${result[0].city}"><br/>
                  Postal Code: <input type="text" name="postal_code" value="${result[0].postal_code}"><br/>
                  Contact No.: <input type="tel" id="phone" name="cellphone" value="${result[0].cellphone}"><br/>
                  Email: <input type="email" id="email" value="${result[0].email}"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30"
                  name="email"><br/>
                  Password: <input type="text" id="password" name="password"><br />
                  Seeking Trainer: <input type="checkbox" name="seeking_trnr" onchange="toggleInfo('seeking', ${result[0].seeking_trainer})" value="${result[0].seeking_trainer}"><br />
                  Personal Trainer: <input type="checkbox" id="istrainer" name="istrainer" onchange="toggleInfo('trainer', ${result[0].istrainer})" value="${result[0].istrainer}"><br />
                  Fitness Goals:<br/>
                  <textarea id="fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${result[0].fitness_goals}"></textarea><br/>
                  Bio:<br />
                  <textarea id="trainer_bio" spellcheck="true" name="trainer_bio" rows="5" cols="33"></textarea>
                  <input type="submit" value="Submit">
                </form>
              </div>`
            ).appendTo("#clientBio");
          }else {
            $("#client_list").css("display", "block");
            $("#potentialClients").css("display", "block");
            // console.log($("#profile_header").text);
            if (Number(id) !== Number(currUser)) {
              $("#profile_header").innerHTML = result[0].first_name + " " + result[0].last_name;
              $(`<div style="position:relative; top: 0">
                  <form action="/api/users"  method="POST" target="hidden-form">
                    First name: <input type="text" name="firstname" value="${result[0].first_name}" readonly><br/>
                    Last name:  <input type="text" name="lastname" value="${result[0].last_name}" readonly><br/>
                    Address:<br/>
                    <input type="text" name="address_line1" placeholder="Address line 1" value="${result[0].address_line1}" readonly><br/>
                    <input type="text" name="address_line2" placeholder="Address line 2" value="${result[0].address_line2}" readonly><br/>
                    City: <input type="text" name="city" value="${result[0].city}" readonly><br/>
                    Postal Code: <input type="text" name="postal_code" value="${result[0].postal_code}" readonly><br/>
                    Contact No.: <input type="tel" id="rd_only_rd_only_phone" name="cellphone" value="${result[0].cellphone}" readonly><br/>
                    Email: <input type="email" id="rd_only_email" value="${result[0].email}" readonly><br/>
                    Fitness Goals:<br/>
                    <textarea id="rd_only_fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${result[0].fitness_goals}" readonly></textarea><br/>
                  </form>
                </div>`
              ).appendTo("#clientBio");
            }else {
              $("#profile_header").innerHTML = result[0].first_name + " " + result[0].last_name;
              $(`<div class="trainerPanel" style="position:relative; top:0">
                  <IFRAME style="display:none" name="hidden-form"></IFRAME>
                  <form action="/api/user/update/${currUser}"  method="POST" target="hidden-form">
                    First Name: <input type="text" name="firstname" value="${result[0].first_name}"><br/>
                    Last Name: <input type="text" name="lastname" value="${result[0].last_name}"><br/>
                    Address:<br/>
                    <input type="text" name="address_line1" placeholder="Address line 1" value="${result[0].address_line1}"><br/>
                    <input type="text" name="address_line2" placeholder="Address line 2" value="${result[0].address_line2}"><br/>
                    City: <input type="text" name="city" value="${result[0].city}"><br/>
                    Postal Code: <input type="text" name="postal_code" value="${result[0].postal_code}"><br/>
                    Contact No.: <input type="tel" id="phone" name="cellphone" value="${result[0].cellphone}"><br/>
                    Email: <input type="email" id="email" value="${result[0].email}"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30"
                    name="email"><br/>
                    Password: <input type="text" id="password" name="password"><br />
                    Seeking Trainer: <input type="checkbox" name="seeking_trnr" onchange="toggleInfo('seeking', ${result[0].seeking_trainer})" value="${result[0].seeking_trainer}"><br />
                    Personal Trainer: <input type="checkbox" id="istrainer" name="istrainer" onchange="toggleInfo('trainer', ${result[0].istrainer})" value="${result[0].istrainer}"><br />
                    Fitness Goals:<br/>
                    <textarea id="fitness_goals" spellcheck="true" name="fitness_goals" rows="5" cols="33" value="${result[0].fitness_goals}"></textarea><br/>
                    Bio:<br />
                    <textarea id="trainer_bio" spellcheck="true" name="trainer_bio" rows="5" cols="33"></textarea>
                    <input type="submit" value="Submit">
                  </form>
                </div>`
              ).appendTo("#clientBio");
            }
          }
        } /* END success */
      });/* END Kevin's NESTED AJAX */
    }) /* LAST THEN of OFIGINAL FETCH */
    .then((v) => {

        /* Hide wrap_login */
        let wrap_login = document.querySelector('.wrap_login');
        wrap_login.classList.add('displayNone');
        wrap_login.classList.remove('displayBlock');

        /* Show user catbar */
        let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
        user_wrap_catbar.classList.add('displayBlock');
        user_wrap_catbar.classList.remove('displayNone');

        /* Show userBlock */
        let userblock = document.querySelector('.userblock');
        userblock.classList.add('displayBlock');
        userblock.classList.remove('displayNone');

        /* Flag 'profile' as lastRightPanelShowing */
        fh.flag.lastRightPanelShowing = 'profile';
        window.localStorage.setItem('fh_lastRightPanelShowing', fh.flag.lastRightPanelShowing);
    }); /* END original fetch */
  }); /* END loginButton.addEventListener */
}; /* END fh.func.addListener_click_loginButtonProper */


fh.func.addListener_click_profileButton = () => {

  let profileButton = document.querySelector('.catbox_profile');

  profileButton.addEventListener('click', function () {

    let userblock = document.querySelector('.userblock');
    userblock.classList.add('displayBlock');
    userblock.classList.remove('displayNone');

    let routinesBlock = document.querySelector('.routinesBlock');
    routinesBlock.classList.add('displayNone');
    routinesBlock.classList.remove('displayBlock');

    /* Flag 'profile' as lastRightPanelShowing */
    fh.flag.lastRightPanelShowing = 'profile';
    window.localStorage.setItem('fh_lastRightPanelShowing', fh.flag.lastRightPanelShowing);
  });
};


fh.func.addListener_click_registerButton = () => {

  let registerButton = document.querySelector('.registerButton');
  registerButton.addEventListener('click', () => {

    let obj = {};
    obj.firstname = document.querySelector('.reg_firstName').value.trim();
    obj.lastname = document.querySelector('.reg_lastName').value.trim();

    obj.istrainer = document.querySelector('.isTrainer');
    if (obj.istrainer.classList.contains('toggle_off')) { obj.istrainer = 0; }
    else if (obj.istrainer.classList.contains('toggle_on')) { obj.istrainer = 1; };

    obj.seeking_trnr = document.querySelector('.seekingTrainer');
    if (obj.seeking_trnr.classList.contains('toggle_off')) { obj.seeking_trnr = 0; }
    else if (obj.seeking_trnr.classList.contains('toggle_on')) { obj.seeking_trnr = 1; };

    obj.email = document.querySelector('.reg_email').value.trim();
    obj.user_password = document.querySelector('.reg_password').value.trim();


    let url = '/api/users';

    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Content-type": 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then((resp) => resp.json())
      .then((data) => {

        let insertId = data.id;

        window.localStorage.setItem('currentUser', insertId);

        /* Hide register */
        let wrap_register = document.querySelector('.wrap_register');
        wrap_register.classList.add('displayNone');
        wrap_register.classList.remove('displayBlock');

        /* Show user catbar */
        let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
        user_wrap_catbar.classList.add('displayBlock');
        user_wrap_catbar.classList.remove('displayNone');

        /* Show userblock */
        let userblock = document.querySelector('.userblock');
        userblock.classList.add('displayBlock');
        userblock.classList.remove('displayNone');

        /* Flag 'profile' as lastRightPanelShowing */
        fh.flag.lastRightPanelShowing = 'profile';
        window.localStorage.setItem('fh_lastRightPanelShowing', fh.flag.lastRightPanelShowing);
      });

  });
};


fh.func.addListener_click_routinesButton = () => {

  let routinesButton = document.querySelector('.catbox_routines');

  routinesButton.addEventListener('click', function () {

    let routinesBlock = document.querySelector('.routinesBlock');
    routinesBlock.classList.add('displayBlock');
    routinesBlock.classList.remove('displayNone');

    let userblock = document.querySelector('.userblock');
    userblock.classList.add('displayNone');
    userblock.classList.remove('displayBlock');

    /* Flag 'profile' as lastRightPanelShowing */
    fh.flag.lastRightPanelShowing = 'routines';
    window.localStorage.setItem('fh_lastRightPanelShowing', fh.flag.lastRightPanelShowing);
  });
};


fh.func.addListener_click_saveButtonStagedRoutine = function () {

  let saveButton_stagedRoutine = document.querySelector(".saveButton_stagedRoutine");

  saveButton_stagedRoutine.addEventListener("click", function () {

    let nameInput = document.querySelector(".name_stagedRoutine");
    let inputValue = nameInput.value.trim();

    /* Nothing in input, alert user (give inputFlash class, flash border red 3 times), return */
    if (inputValue.length == 0) {
      console.log("no name given, stop/cancel save");
      return;
    }
    else {
      /* else package and save to DB, hide stageRoutineBlock */
      let routineObj = {};
      routineObj.routineName = inputValue;
      routineObj.exercises = fh.user.routines_staged;

      let url = `/routine/save/${currUser}`;
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify(routineObj)
      })
      .then(resp => resp.json())
      .then(data => {

        /** Clear field for routine name */
        nameInput.value = '';
        
        /** Clear local data */
        fh.user.routines_staged = [];
        
        /** Delete staged routine items in stageRoutineBlock */
        let stagedItems = document.querySelectorAll('.exerciseItem_staged_wrap');
        for(i of stagedItems){
          i.remove();
        };
        
        /** Hide stageRoutineBlock */
        let stageRoutineBlock = document.querySelector('.stageRoutineBlock');          
        stageRoutineBlock.classList.add('displayNone');
        stageRoutineBlock.classList.remove('displayBlock');
        
        /* Show user_wrap_catbar */
        let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
        user_wrap_catbar.classList.add('displayBlock');
        user_wrap_catbar.classList.remove('displayNone');

        /** Show routinesBlock */
        let routinesBlock = document.querySelector('.routinesBlock');
        routinesBlock.classList.add('displayBlock');
        routinesBlock.classList.remove('displayNone');

        /* Set routinesBlock as fh.flag.lastRightPanelShowing */
        fh.flag.lastRightPanelShowing = 'routines';
        window.localStorage.setItem('fh_lastRightPanelShowing', fh.flag.lastRightPanelShowing);
        
        /** Set db assigned id onto routine object and add object to user's routine array (fh.user.routines) */
        routineObj.id = data.id;
        fh.user.routines.push(routineObj);
        
        /* Populate routinesBlock with routine item */
        let html_routineItem = `
          <div class="routineRow">
            <p id="${routineObj.id}" onclick="fh.func.populateRoutineDetails(this)">${routineObj.routineName}</p>
            <div class="deleteRoutineButton" onclick="fh.func.deleteRoutine(this)"></div>
          </div> 
        `;
        routinesBlock.innerHTML += html_routineItem;
      })
      .catch(err => {
        console.log(err, "err c");
      });
    }
  });
};


fh.func.addListener_click_userTile = () => {

  let userTiles = document.querySelectorAll('.userTile');

  for (i of userTiles) {

    i.addEventListener('click', function () {

      fh.func.clearContext();

      fh.func.centerPanelScrollTop();

      let userPlates = document.querySelectorAll('.userPlate');

      let shownUserPlate = null;

      for (i of userPlates) {

        if (i.classList.contains('displayBlock')) {

          shownUserPlate = i;
        };
      };

      /* Show relevent plate, hide the other two */
      if (this.classList.contains('bioTile')) {

        /* If tile clicked has it's plate up, remove it */
        if (shownUserPlate != null
          && shownUserPlate.classList.contains('bioPlate')) {

          shownUserPlate.classList.add('displayNone');
          shownUserPlate.classList.remove('displayBlock');
        }
        else {

          let bioPlate = document.querySelector('.bioPlate');
          bioPlate.classList.add('displayBlock');
          bioPlate.classList.remove('displayNone');

          let chatPlate = document.querySelector('.chatPlate');
          chatPlate.classList.add('displayNone');
          chatPlate.classList.remove('displayBlock');

          let calendarPlate = document.querySelector('.calendarPlate');
          calendarPlate.classList.add('displayNone');
          calendarPlate.classList.remove('displayBlock');
        };
      }
      else
        if (this.classList.contains('chatTile')) {

          if (shownUserPlate != null
            && shownUserPlate.classList.contains('chatPlate')) {

            shownUserPlate.classList.add('displayNone');
            shownUserPlate.classList.remove('displayBlock');
          }
          else {

            let chatPlate = document.querySelector('.chatPlate');
            chatPlate.classList.add('displayBlock');
            chatPlate.classList.remove('displayNone');

            let bioPlate = document.querySelector('.bioPlate');
            bioPlate.classList.add('displayNone');
            bioPlate.classList.remove('displayBlock');

            let calendarPlate = document.querySelector('.calendarPlate');
            calendarPlate.classList.add('displayNone');
            calendarPlate.classList.remove('displayBlock');
          };
        }
        else
          if (this.classList.contains('calendarTile')) {

            if (shownUserPlate != null
              && shownUserPlate.classList.contains('calendarPlate')) {

              shownUserPlate.classList.add('displayNone');
              shownUserPlate.classList.remove('displayBlock');
            }
            else {

              let calendarPlate = document.querySelector('.calendarPlate');
              calendarPlate.classList.add('displayBlock');
              calendarPlate.classList.remove('displayNone');

              let bioPlate = document.querySelector('.bioPlate');
              bioPlate.classList.add('displayNone');
              bioPlate.classList.remove('displayBlock');

              let chatPlate = document.querySelector('.chatPlate');
              chatPlate.classList.add('displayNone');
              chatPlate.classList.remove('displayBlock');
            };
          };
    });
  };
};


fh.func.centerPanelScrollTop = () => {

  let wrap_context = document.querySelector('.wrap_context');

  wrap_context.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


fh.func.clearContext = ()=>{
  let contentPlates = document.querySelectorAll('.content_plate:not(.userPlate)');
  for(plate of contentPlates){
    plate.remove();
  };
};


fh.func.clearContext_hideUserPlate = ()=>{
  let userPlates = document.querySelectorAll('.userPlate');
  for(plate of userPlates){
    plate.classList.add('displayNone');
    plate.classList.remove('displayBlock');
  };
};


fh.func.click_findableExercise = function(me) {

  fh.func.centerPanelScrollTop();

  /* If any userPlate(bioPlate, chatPlate, or calendarPlate) showing, hide them */
  let userPlates = document.querySelectorAll('.userPlate');
  for (i of userPlates) {

    if (i.classList.contains('displayBlock')) {
      i.classList.add('displayNone');
      i.classList.remove('displayBlock');
    };
  };


  /* If that exercise already in the center, remove it */
  let title_ofClickedFindable = me.children[0].innerHTML;

  let contentPlates = document.querySelectorAll('.content_plate');

  for (i of contentPlates) {
    if (i.children[0].innerHTML == title_ofClickedFindable) {
      i.remove();
    };
  };


  let findableName = me.children[0].innerHTML;

  /* Need to pull exercise category from dropdown text.
    This is used to access right exercise bucket in our data object */
  let exerciseCategory = document.querySelector(".dropdown_findbar > span")
    .innerHTML;
  exerciseCategory = exerciseCategory.toLowerCase();

  /* Handle 2 words for category name:
    Split at space, capitalize second word in array, rejoin th string. */
  if (exerciseCategory.includes(" ")) {
    exerciseCategory = exerciseCategory.split(" ");
    exerciseCategory[1] =
      exerciseCategory[1].charAt(0).toUpperCase() +
      exerciseCategory[1].substring(1);
    exerciseCategory = exerciseCategory[0] + exerciseCategory[1];
  }

  /* With exerciseCategory allowing getting to the right array,
    loop through array of exercise objects to find one
    that has a name property matching the name of the clicked findable. */

  let exerciseCategory_bucket = fh.data.exercises[exerciseCategory];

  for (let i = 0; i < exerciseCategory_bucket.length; i++) {
    let exercise = exerciseCategory_bucket[i];

    if (findableName == exercise.name) {

      /*********************************************
      CREATE & APPEND PLATE IN CENTER CONTEXT COLUMN
      **********************************************/
      let contentPlate = document.createElement("div");
      contentPlate.className = "content_plate";

      let exerciseName = document.createElement("p");
      exerciseName.className = "cplate_exerciseName";
      exerciseName.innerHTML = exercise.name;

      let exerciseDesc = document.createElement("p");
      exerciseDesc.className = "cplate_exerciseDesc";
      exerciseDesc.innerHTML = exercise.desc;


      /* start appending pieces */
      contentPlate.appendChild(exerciseName);
      contentPlate.appendChild(exerciseDesc);


      /* Conditional creation and append */

      /* if images are present in the array, append them */
      if (exercise.img.length > 0) {
        let exerciseImagesCont = document.createElement("div");
        exerciseImagesCont.className = "exerciseImagesCont";

        let exercise_image = document.createElement("div");
        exercise_image.className = "exercise_image";
        exercise_image.setAttribute(
          "style", `background-image: url("${exercise.img[0]}");`
        );

        let exercise_image_2 = document.createElement("div");
        exercise_image_2.className = "exercise_image_2";
        exercise_image_2.setAttribute(
          "style", `background-image: url("${exercise.img[1]}");`
        );

        /* Convenient Custom Attributes to store img paths */
        exercise_image.setAttribute("imgPath_1", exercise.img[0]);
        exercise_image_2.setAttribute("imgPath_2", exercise.img[1]);

        contentPlate.appendChild(exerciseImagesCont);
        exerciseImagesCont.appendChild(exercise_image);
        exerciseImagesCont.appendChild(exercise_image_2);
      };

      let wrap_routineAddControls = document.createElement("div");
      wrap_routineAddControls.className = "wrap_routineAddControls";

      let addToNewRoutineButton = document.createElement("div");
      addToNewRoutineButton.className = "addToNewRoutineButton";
      addToNewRoutineButton.innerHTML = "Add to New Routine";
      addToNewRoutineButton.addEventListener("click", function () {

        /* Hide catbar */
        let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
        user_wrap_catbar.classList.add('displayNone');
        user_wrap_catbar.classList.remove('displayBlock');
        
        /* Hide userBlock */
        let userblock = document.querySelector('.userblock');
        userblock.classList.add('displayNone');
        userblock.classList.remove('displayBlock');

        /* Hide routinesBlock */
        let routinesBlock = document.querySelector('.routinesBlock');
        routinesBlock.classList.add('displayNone');
        routinesBlock.classList.remove('displayBlock');
        
        /* Show stageRoutineBlock */
        let stageRoutineBlock = document.querySelector('.stageRoutineBlock');
        stageRoutineBlock.classList.add('displayBlock');
        stageRoutineBlock.classList.remove('displayNone');


        /* create routine object, pass to staged routine array */
        let exObj = {};
        exObj.name = this.parentNode.parentNode.children[0].innerHTML;
        exObj.desc = this.parentNode.parentNode.children[1].innerHTML;

        /* If image path not undefined, set in array  */
        if (this.parentNode.parentNode.children[2].children[0].getAttribute("imgPath_1") != undefined) {

          exObj.img = [
            this.parentNode.parentNode.children[2].children[0].getAttribute("imgPath_1"),
            this.parentNode.parentNode.children[2].children[1].getAttribute("imgPath_2")
          ];
        } else {
          /* If undefined, pass empty array. Avoids error in database. */
          exObj.img = [];
        };


        /********************************
         * Push to routines_staged array *
         *********************************/
        /* Check routines_staged array for duplicates. Return if find duplicate. */
        for (let i = 0; i < fh.user.routines_staged.length; i++) {
          let name_stagedRoutine = fh.user.routines_staged[i].name;
          if (exObj.name == name_stagedRoutine) {
            return;
          }
        }

        /* No above return from duplicate check, push to routines_staged array */
        fh.user.routines_staged.push(exObj);


        /*********************************************************
        Generate the exercise items in the right side routineBlock
        **********************************************************/
        /* Outer Wrap */
        let exerciseItem_staged_wrap = document.createElement("div");
        exerciseItem_staged_wrap.className = "exerciseItem_staged_wrap";

        /* p element = name */
        let exerciseItem_staged_p = document.createElement("p");
        exerciseItem_staged_p.className = "exerciseItem_staged_p";
        exerciseItem_staged_p.innerHTML = exObj.name;

        /* div element = deleteButton */
        let deleteButton_staged = document.createElement("div");
        deleteButton_staged.className = "deleteButton_staged";
        deleteButton_staged.addEventListener("click", function() {
          
          let deleteTarget_name = this.previousElementSibling.innerHTML;

          /* remove from staged array */
          for (let i = 0; i < fh.user.routines_staged.length; i++) {
            let stagedRoutineName = fh.user.routines_staged[i].name;

            if (deleteTarget_name == stagedRoutineName) {
              fh.user.routines_staged.splice(i, 1);
            }
          };

          /* remove element from panel */
          let exercisesInPanel = document.querySelectorAll(".exerciseItem_staged_wrap");
          for (let i = 0; i < exercisesInPanel.length; i++) {
            let exercise = exercisesInPanel[i];
            let exerciseName = exercise.children[0].innerHTML;

            if (deleteTarget_name == exerciseName) {
              exercise.remove();
            }
          };

          /* Hide stageRoutineBlock */
          let stageRoutineBlock = document.querySelector('.stageRoutineBlock');
          stageRoutineBlock.classList.add('displayNone');
          stageRoutineBlock.classList.remove('displayBlock');

          /* Show catbar */
          let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
          user_wrap_catbar.classList.add('displayBlock');
          user_wrap_catbar.classList.remove('displayNone');

          /* Show fh.flag.lastRightSidePanelShowing */
          if(fh.flag.lastRightPanelShowing == 'profile'){
            let userblock = document.querySelector('.userblock');
            userblock.classList.add('displayBlock');
            userblock.classList.remove('displayNone');
          }
          else{
            let routinesBlock = document.querySelector('.routinesBlock');
            routinesBlock.classList.add('displayBlock');
            routinesBlock.classList.remove('displayNone');
          };
        });

        // /************
        // Append Pieces
        // *************/
        exerciseItem_staged_wrap.appendChild(exerciseItem_staged_p);
        exerciseItem_staged_wrap.appendChild(deleteButton_staged);

        // /*********
        // Append DOM
        // **********/
        let pasteExercises = document.querySelector(".pasteExercises");
        pasteExercises.appendChild(exerciseItem_staged_wrap);
      });

      contentPlate.appendChild(wrap_routineAddControls);
      wrap_routineAddControls.appendChild(addToNewRoutineButton);

      // append to DOM
      let wrap_context = document.querySelector(".wrap_context");
      wrap_context.insertBefore(contentPlate, wrap_context.children[0]);
    }
  }
};

fh.func.createAppend_selectedExerciseGroup = function (exerciseBucket) {
  let findables_exercises = document.querySelector(".findables_exercises");

  for (let i = 0; i < exerciseBucket.length; i++) {
    let obj = exerciseBucket[i];

    let findable = document.createElement("div");
    findable.className = "findable";
    findable.addEventListener("click", function () {
      fh.func.click_findableExercise(this);
    });

    let name = document.createElement("p");
    name.innerHTML = obj.name;

    findable.appendChild(name);
    findables_exercises.appendChild(findable);
  }
};

fh.func.createObj_exercise = (url, myArray, flag) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data, 'data');

        for (let i = 0; i < data.results.length; i++) {
          let obj = {};
          obj.name = data.results[i].name;
          obj.desc = data.results[i].description;
          obj.img = [];


          /* If almost no description, continue */
          if (obj.desc.length < 10) {
            continue;
          };


          let url_forImage = `https://wger.de/api/v2/exerciseimage/?exercise=${data.results[i].id}`;

          if (i == data.results.length - 1) {
            return (resolution = fh.func.fetch_exerciseImages(
              url_forImage,
              obj,
              myArray
            ));
          } else {
            fh.func.fetch_exerciseImages(url_forImage, obj, myArray);
          }
        }
      })
      .then(v => {
        // console.log(v, 'v');

        /*
    Flag when Biceps fetch is done.
    This is what I want earliest so as to start displaying on screen
    */
        if (flag == true) {
          fh.flag.bicepsFetchDone = true;
        }

        resolve(v);
      });
  });
};


fh.func.dbCall_routines = ()=>{

  let currentUser = window.localStorage.getItem('currentUser');

  if(currentUser != undefined){

    let url = `/routine/${currentUser}`;
    
    fetch(url)
    .then((resp)=>resp.json())
    .then((data)=>{

      /* Store routines in local array (fh.user.routines) */
      fh.user.routines = data;

      /* Add routineRow elements onto routineBlock */
      let routines = data;
      let routinesBlock = document.querySelector('.routinesBlock');

      for(routine of routines){

        let html = `
          <div class="routineRow">
            <p id="${routine.id}" onclick="fh.func.populateRoutineDetails(this)">${routine.routine_name}</p>
            <div class="deleteRoutineButton" onclick="fh.func.deleteRoutine(this)"></div>
          </div>
        `;

        routinesBlock.innerHTML += html;
      };
    });
  };
};


fh.func.deleteRoutine = (me)=>{

  let routineRow = me.parentNode;
  let routineId = me.previousElementSibling.id;

  /* Delete from DB */
  let url = `/routine/delroutine/${routineId}`;
  fetch(url,{
    method: 'DELETE'
  })
  .then((resp)=>resp.json())
  .then((data)=>{

      /* Clear plates from center context */
      fh.func.clearContext();

      /* Remove routineRow from routinesBlock */
      let routineRows = document.querySelectorAll('.routineRow');
      for(routineRow of routineRows){
        if(routineRow.children[0].id == routineId){
          routineRow.remove();
        };
      };

      /* Remove from local routines array */
      for(let i = 0; i < fh.user.routines.length; i++){

        let user_routineId = fh.user.routines[i].id;

        if(routineId == user_routineId){
          fh.user.routines.splice(i, 1);
        };
      };
  });
};


fh.func.fetch_exerciseImages = function(url_forImage, obj, myArray) {
  return new Promise((resolve, reject) => {
    fetch(url_forImage)
      .then(resp => resp.json())
      .then(data => {
        let arr = data.results;

        if (arr.length == 1) {
          obj.img.push(arr[0].image);
        } else if (arr.length == 2) {
          obj.img.push(arr[0].image);
          obj.img.push(arr[1].image);
        }

        myArray.push(obj);

        resolve(true);
      })
      .catch(function (err) {
        throw err;
        reject();
      });
  });
};

fh.func.init_routinesBicepsInFindbar = function () {
  fh.interval.check_exercisesFetchDone = setInterval(function () {
    if (fh.flag.bicepsFetchDone == true) {
      // HARD CODE the amount of Biceps Exercises Fetched in order to wait for them all before appending

      clearInterval(fh.interval.check_exercisesFetchDone);

      let findables_exercises = document.querySelector(".findables_exercises");

      for (let i = 0; i < fh.data.exercises.biceps.length; i++) {
        let obj = fh.data.exercises.biceps[i];

        let findable = document.createElement("div");
        findable.className = "findable";
        findable.addEventListener("click", function () {
          fh.func.click_findableExercise(this);
        });

        let name = document.createElement("p");
        name.innerHTML = obj.name;

        findable.appendChild(name);
        findables_exercises.appendChild(findable);
      }
    }
  }, 10);
};


fh.func.init_panel = () => {

  let currentUser = window.localStorage.getItem('currentUser');

  /* There is a currentUser set in localStorage*/
  if(currentUser != undefined){

    /* Hide Login */
    let wrap_login = document.querySelector('.wrap_login');
    wrap_login.classList.add('displayNone');
    wrap_login.classList.remove('displayBlock');

    /* Show user catbar */
    let user_wrap_catbar = document.querySelector('.user_wrap_catbar');
    user_wrap_catbar.classList.add('displayBlock');
    user_wrap_catbar.classList.remove('displayNone');


    let lastRightPanel = window.localStorage.getItem("fh_lastRightPanelShowing");

    fh.flag.lastRightPanelShowing = lastRightPanel;

    if(lastRightPanel == 'routines'){

      /* Show routinesBlock */
      let routinesBlock = document.querySelector('.routinesBlock');
      routinesBlock.classList.add('displayBlock');
      routinesBlock.classList.remove('displayNone');
    }
    else{

      /* Show User Block */
      let userblock = document.querySelector('.userblock');
      userblock.classList.add('displayBlock');
      userblock.classList.remove('displayNone');
    }
  }
  /* NO currentUser set in localStorage */
  else{

    /* Show login */
    let wrap_login = document.querySelector('.wrap_login');
    wrap_login.classList.add('displayBlock');
    wrap_login.classList.remove('displayNone');
  };
};


fh.func.isWithin = function (coords, elem) {
  let x = coords[0];
  let y = coords[1];

  let elem_left = elem.getBoundingClientRect().left;
  let elem_right = elem.getBoundingClientRect().right;
  let elem_top = elem.getBoundingClientRect().top;
  let elem_bottom = elem.getBoundingClientRect().bottom;

  if (x > elem_left && x < elem_right && y > elem_top && y < elem_bottom) {
    return true;
  } else {
    return false;
  }
};


fh.func.populateRoutineDetails = (me)=>{

  let routineId = me.id;

  /* Fetch for routine details */
  let url = `/routine/details/${routineId}`;
  fetch(url)
  .then((resp)=>resp.json())
  .then((data)=>{

    /* Remove all content_plate except for the userPlates (chat, calendar, trainer) */
    fh.func.clearContext();
    fh.func.clearContext_hideUserPlate();
    
    /* Loop to create and append exercise plates for clicked routine */
    for(exercise of data){

      /*********************************************
      CREATE & APPEND PLATE IN CENTER CONTEXT COLUMN
      **********************************************/

      /* Start creating HTML. Not complete yet. */
      let html = `
        <div class="content_plate">
          <div class="cplate_exerciseName">${exercise.exercise_name}</div>
          <div class="cplate_exerciseDesc">${exercise.exercise_desc}</div>
      `;

      /* If images are present in the array, create and append them */
      if(exercise.front_img_src != undefined){

        html += `
          <div class="exerciseImagesCont">
            
            <div  class="exercise_image"
                  style="background-image: url(${exercise.front_img_src})"
                  imgPath_1="${exercise.front_img_src}"></div>
            
            <div  class="exercise_image_2" 
                  style="background-image: url(${exercise.rear_img_src})"
                  imgPath_2="${exercise.rear_img_src}"></div>
          </div>
        `;
      };

      /* Close HTML/ content_plate */
      html += `</div>`; 

      /* Append to DOM */
      let wrap_context = document.querySelector(".wrap_context");
      wrap_context.innerHTML += html;
    };
  });
};




/*************
Initialization
**************/
window.addEventListener("DOMContentLoaded", event => {

  /* Retrieve local storage token */
  const currUser = localStorage.getItem("currentUser");


  /********
  API Calls
  *********/
  /* Call exercises API, dropdown event, dropdownItem events, append biceps first */
  fh.func.apiCall_exercises();


  /*******
  DB Calls
  ********/
  fh.func.dbCall_routines();


  /*********
  Init Style
  **********/
  /* What right panel to start? */
  fh.func.init_panel();


  /*********************
  Attach Event Listeners
  **********************/
  /* Body General */
  fh.func.addListener_click_body();

  /* Left Side Events */
  fh.func.addListener_click_dropdownFindExercise();
  fh.func.addListener_click_eachItemInExercisesDropdownMenu();
  fh.func.init_routinesBicepsInFindbar();

  /* Right Side Events */
  fh.func.addListener_click_profileButton();
  fh.func.addListener_click_routinesButton();

  /* Login/Registration Panel Events */
  fh.func.addListener_click_initCreateAccountButton();
  fh.func.addListener_click_loginButtonProper();
  fh.func.addListener_click_registerButton();
  fh.func.addListener_click_backToLoginButton();
  fh.func.addListener_click_trainerToggles();

  /* Routine Content Plate Events */
  fh.func.addListener_click_saveButtonStagedRoutine();

  /* Save Routine Block Events */
  fh.func.addListener_click_close_stageRoutineBlock();

  /* User Block Events */
  fh.func.addListener_click_userTile();

  /* 
  Buttons for FitTips & SplashPage
  */
  document.querySelector("#generalTipsButton").addEventListener("click", function () {
    document.querySelector("#generalTipsContent").classList.remove("d-none");
    document.querySelector("#volumeAndrepsContent").classList.add("d-none");
    document.querySelector("#theBig3Content").classList.add("d-none");
  })
  document.querySelector("#volumeAndrepsButton").addEventListener("click", function () {
    document.querySelector("#volumeAndrepsContent").classList.remove("d-none");
    document.querySelector("#generalTipsContent").classList.add("d-none");
    document.querySelector("#theBig3Content").classList.add("d-none");
  })
  document.querySelector("#theBig3Button").addEventListener("click", function () {
    document.querySelector("#theBig3Content").classList.remove("d-none");
    document.querySelector("#volumeAndrepsContent").classList.add("d-none");
    document.querySelector("#generalTipsContent").classList.add("d-none");
  })

});

