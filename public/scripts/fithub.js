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
  fh.func.addListener_click_createAccountProper = function() {
  fh.func.addListener_click_dropdownFindExercise = function() {
  fh.func.addListener_click_eachItemInExercisesDropdownMenu = function() {
  fh.func.addListener_click_initCreateAccountButton = function() {
  fh.func.addListener_click_loginButtonBack = function() {
  fh.func.addListener_click_loginButtonProper = function() {
  fh.func.addListener_click_saveButtonStagedRoutine = function(){
  
  fh.func.click_findableExercise = function(me) {
  fh.func.createAppend_selectedExerciseGroup = function(exerciseBucket) {
  fh.func.createObj_exercise = (url, myArray, flag) => {
  
  fh.func.fetch_exerciseImages = function(url_forImage, obj, myArray) {

  fh.func.init_routinesBicepsInFindbar = function() {
  fh.func.isWithin = function(coords, elem){


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

fh.func.apiCall_exercises = function() {
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

// RECIPE API START

// let userQuery = {queryInputVal}
// Need input box for queryInputVal
// let userExclusion = {exclusionInputVal}
// Need input box for exclusionInputVal

// let healthQuery = {healthInputVal}

// HTML for searchQuery Input
// <div class="excludeRow">
// 		<p>Terms to exclude: </p>
// 		<input class="userExclusion" type="text">
// </div>

// HTML for Exclusion Input
// <div class="excludeRow">
// 		<p>Terms to exclude: </p>
// 		<input class="userExclusion" type="text">
// </div>

// Dropdown for these options
// <div class="dropdownMenu healthQuery displayNone">
// 		<div><span>alcohol-free</span></div>
// 		<div><span>crustacean-free</span></div>
// 		<div><span>egg-free</span></div>
// 		<div><span>fish-free</span></div>
// 		<div><span>gluten-free</span></div>
// 		<div><span>kosher</span></div>
// 		<div><span>peanut-free</span></div>
// 		<div><span>pecatarian</span></div>
// 		<div><span>pork-free</span></div>
// 		<div><span>shellfish-free</span></div>
// 		<div><span>tree-nut-free</span></div>
// 		<div><span>vegetarian</span></div>
// 		<div><span>vegan</span></div>
// </div>
//

// fh.func.addListener_click_listRecepiesProper = function(){
//
// 	let findRecipesButton = document.querySelector('.findRecipesButton');
// 		findRecipesButton.addEventListener('click', function(){
//
// 			console.log('clicked findRecipesButton proper');
// 		});
// };

// const recipeURL = `https://api.edamam.com/search?q=${userQuery}&excluded=${userExclusion}&health=${userHealth}&app_id=${app_id}&app_key=${app_key}`;

//			SCRIPT SIDE TO SEND REQUEST TO ENDPOINT AND CREATE RECIPE OBJECT
// fh.func.createObj_recipe = (url, myArray, flag)=>{

// 	return new Promise((resolve, reject)=>{
//
// 		fetch(url)
// 		.then((resp)=>resp.json())
// 		.then((data)=>{
//
// 			// console.log(data, 'data');
//
// 			for(let i = 0; i < 10; i++){
//
// 				let obj = {};
// 					obj.name = data.hits[i].label;
//					obj.ingredients = data.hits[i].ingredientLines;
// 					obj.desc = data.results[i].description;
// 					obj.img  = [];
// 				let url_forImage = `${data.hits[i].image}`;
//
// 			};
// 		})
// 	});
// };

// Get the recipe title for the first recipe from the returned array:
// data.hits[i].label

// Picture of recipe:
// data.hits[i].image

// Ingredient list array
// data.hits[i].ingredientLines

// Servings
// data[i].yield

// Calories
// data[i].calories

// Time to make in minutes:
// data.[i].totalTime

// View recipe instructions on original website:
// (Users will have to click this if they want to be able to see the instructions, API does not include that)
// data.hits[1].url

// ENDPOINT TO PIN / SAVE RECIPE
// app.post(`api/pinned`, async function(req, res) {
// 	console.log(req);
// 	let newUser = await db.query(
// 	  `insert into fh_recipePins(username, first_name, last_name, address_line1, address_line2, city, postal_code, cellphone, email, fitness_goals, istrainer)
// 	values(? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
// 	  [
// 		req.params.recipeObj.username,
// 		req.params.recipeObj.first_name,
// 		req.params.recipeObj.last_name,
// 		req.params.recipeObj.address_line1,
// 		req.params.recipeObj.address_line2,
// 		req.params.recipeObj.city,
// 		req.params.recipeObj.postal_code,
// 		req.params.recipeObj.cellphone,
// 		req.params.recipeObj.email,
// 		req.params.recipeObj.fitness_goals,
// 		req.params.recipeObj.istrainer
// 	  ]
// 	);

// RECIPE API END

fh.func.addListener_click_body = function() {
  let docBody = document.querySelector("body");
  docBody.addEventListener("click", function(e) {
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

fh.func.addListener_click_createAccountProper = function() {
  let final_createAccountButton = document.querySelector(
    ".final_createAccountButton"
  );
  final_createAccountButton.addEventListener("click", function() {
    console.log("clicked create account button proper");

    let email = document.querySelector(".loginEmail").value;
    let pass = document.querySelector(".loginPass").value;

    let newUserObj = {};
    newUserObj.email = email;
    newUserObj.pwd = pass;
    newUserObj = JSON.stringify(newUserObj);

    // let url = 'http://localhost:3000/api/user';
    let url = "http://localhost:3000/api/users";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json"
      },
      body: newUserObj
    })
      .then(resp => resp.json())
      .then(function(data) {
        console.log(data, "DATA");
      });
  });
};

fh.func.addListener_click_dropdownFindExercise = function() {
  let dropdownButton = document.querySelector(".dropdown_findbar");
  dropdownButton.addEventListener("click", function() {
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

fh.func.addListener_click_eachItemInExercisesDropdownMenu = function() {
  let items = document.querySelectorAll(".drop_exercises > div");

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    item.addEventListener("click", function() {
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

fh.func.addListener_click_initCreateAccountButton = function() {
  let init_createAccountButton = document.querySelector(
    ".init_createAccountButton"
  );
  init_createAccountButton.addEventListener("click", function() {
    // Change color and text of login message and title
    let loginMessage = document.querySelector(".loginMessage");
    loginMessage.innerHTML = "You're on you way";
    loginMessage.classList.add("color_greenMain");
    loginMessage.classList.remove("color_greyBlue");

    let loginTitle = document.querySelector(".loginTitle");
    loginTitle.innerHTML = "Create Account";
    loginTitle.classList.add("color_greyBlue");
    loginTitle.classList.remove("color_greenMain");

    // displayNone the two buttons (loginButton and init_createAccountButton)
    let loginButton = document.querySelector(".loginButton");
    loginButton.classList.add("displayNone");
    loginButton.classList.remove("displayBlock");

    let init_createAccountButton = document.querySelector(
      ".init_createAccountButton"
    );
    init_createAccountButton.classList.add("displayNone");
    init_createAccountButton.classList.remove("displayBlock");

    // display the final_createAccountButton and back_loginButton
    let final_createAccountButton = document.querySelector(
      ".final_createAccountButton"
    );
    final_createAccountButton.classList.add("displayBlock");
    final_createAccountButton.classList.remove("displayNone");

    let back_loginButton = document.querySelector(".back_loginButton");
    back_loginButton.classList.add("displayBlock");
    back_loginButton.classList.remove("displayNone");
  });
};

fh.func.addListener_click_loginButtonBack = function() {
  let back_loginButton = document.querySelector(".back_loginButton");
  back_loginButton.addEventListener("click", function() {
    // Change color and text of login message and title
    let loginMessage = document.querySelector(".loginMessage");
    loginMessage.innerHTML = "Welcome to active wellness";
    loginMessage.classList.add("color_greyBlue");
    loginMessage.classList.remove("color_greenMain");

    let loginTitle = document.querySelector(".loginTitle");
    loginTitle.innerHTML = "Welcome to FitHub";
    loginTitle.classList.add("color_greenMain");
    loginTitle.classList.remove("color_greyBlue");

    // displayNone the two buttons (final_createAccountButton and back_loginButton)
    let final_createAccountButton = document.querySelector(
      ".final_createAccountButton"
    );
    final_createAccountButton.classList.add("displayNone");
    final_createAccountButton.classList.remove("displayBlock");

    let back_loginButton = document.querySelector(".back_loginButton");
    back_loginButton.classList.add("displayNone");
    back_loginButton.classList.remove("displayBlock");

    // display the loginButton button and init_createAccountButton
    let loginButton = document.querySelector(".loginButton");
    loginButton.classList.add("displayBlock");
    loginButton.classList.remove("displayNone");

    let init_createAccountButton = document.querySelector(
      ".init_createAccountButton"
    );
    init_createAccountButton.classList.add("displayBlock");
    init_createAccountButton.classList.remove("displayNone");
  });
};

fh.func.addListener_click_loginButtonProper = function() {
  let loginButton = document.querySelector(".loginButton");
  loginButton.addEventListener("click", function() {
    console.log("clicked login button proper");

    // get inputs from fields
    // create object
    // attempt to post
    let email = document.querySelector(".loginEmail").value;
    let pass = document.querySelector(".loginPass").value;

    let newUserObj = {};
    newUserObj.email = email;
    newUserObj.pass = pass;

    // let url = 'api/user';
    // let url = 'http://localhost:3000/api/user';

    // fetch(url)
    // .then((resp)=>resp.json())
    // .then((data)=>{

    //  console.log();
    // });
  });
};

fh.func.addListener_click_saveButtonStagedRoutine = function() {
  let saveButton_stagedRoutine = document.querySelector(
    ".saveButton_stagedRoutine"
  );

  fh.func.addListener_click_saveButtonStagedRoutine = function() {
    let saveButton_stagedRoutine = document.querySelector(
      ".saveButton_stagedRoutine"
    );

    saveButton_stagedRoutine.addEventListener("click", function() {
      let nameInput = document.querySelector(".name_stagedRoutine");
      let inputValue = nameInput.value.trim();

      /* Nothing in input, alert user (give inputFlash class, flash border red 3 times), return */
      if (inputValue.length == 0) {
        console.log("no name given, stop cancel save");

        return;
      } else {
        /* else package and save to DB, hide saveRoutineBlock */
        let routineObj = {};
        routineObj.routineName = inputValue;
        routineObj.exercises = fh.user.routines_staged;
        console.log(routineObj, "routineObj");

        let url = `/routine/save/:currUser/:${routineObj}`;

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
            console.log(data, "data");
          })
          .catch(err => {
            console.log(err, "err c");
          });
      }
    });
  };

  fh.func.click_findableExercise = function(me) {
    // console.log("clicked findable");

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
        // console.log(exercise, "this is the one");

        /*
        CREATE & APPEND PLATE IN CENTER CONTEXT COLUMN
        */
        let contentPlate = document.createElement("div");
        contentPlate.className = "content_plate";

        let exerciseName = document.createElement("p");
        exerciseName.className = "cplate_exerciseName";
        exerciseName.innerHTML = exercise.name;

        let exerciseDesc = document.createElement("p");
        exerciseDesc.className = "cplate_exerciseDesc";
        exerciseDesc.innerHTML = exercise.desc;

        // start appending pieces
        contentPlate.appendChild(exerciseName);
        contentPlate.appendChild(exerciseDesc);

        /* Conditional creation and append */

        // if images are present in the array, append them
        if (exercise.img.length > 0) {
          let exerciseImagesFlex = document.createElement("div");
          exerciseImagesFlex.className = "exerciseImagesFlex";

          let exercise_image = document.createElement("div");
          exercise_image.className = "exercise_image";
          exercise_image.setAttribute(
            "style",
            `background-image: url("${exercise.img[0]}");`
          );

          let exercise_image_2 = document.createElement("div");
          exercise_image_2.className = "exercise_image_2";
          exercise_image_2.setAttribute(
            "style",
            `background-image: url("${exercise.img[1]}");`
          );

          /* Convenient Custom Attributes to store img paths */
          exercise_image.setAttribute("imgPath_1", exercise.img[0]);
          exercise_image_2.setAttribute("imgPath_2", exercise.img[1]);

          contentPlate.appendChild(exerciseImagesFlex);
          exerciseImagesFlex.appendChild(exercise_image);
          exerciseImagesFlex.appendChild(exercise_image_2);
        }

        let wrap_routineAddControls = document.createElement("div");
        wrap_routineAddControls.className = "wrap_routineAddControls";

        let addToNewRoutineButton = document.createElement("div");
        addToNewRoutineButton.className = "addToNewRoutineButton";
        addToNewRoutineButton.innerHTML = "Add to New Routine";
        addToNewRoutineButton.addEventListener("click", function() {
          // console.log('click add to new routine button');

          // create routine object, pass to staged routine array
          let exObj = {};
          exObj.name = this.parentNode.parentNode.children[0].innerHTML;
          exObj.desc = this.parentNode.parentNode.children[1].innerHTML;

          if (
            this.parentNode.parentNode.children[2].children[0].getAttribute(
              "imgPath_1"
            ) != undefined
          ) {
            exObj.img = [
              this.parentNode.parentNode.children[2].children[0].getAttribute(
                "imgPath_1"
              ),
              this.parentNode.parentNode.children[2].children[1].getAttribute(
                "imgPath_2"
              )
            ];
          }

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

          /*************************************************************
           * Generate the exercise items in the right side routineBlock *
           **************************************************************/

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
            }

            /* remove element from panel */
            let exercisesInPanel = document.querySelectorAll(
              ".exerciseItem_staged_wrap"
            );

            for (let i = 0; i < exercisesInPanel.length; i++) {
              let exercise = exercisesInPanel[i];
              let exerciseName = exercise.children[0].innerHTML;

              if (deleteTarget_name == exerciseName) {
                exercise.remove();
              }
            }
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

  fh.func.createAppend_selectedExerciseGroup = function(exerciseBucket) {
    let findables_exercises = document.querySelector(".findables_exercises");

    for (let i = 0; i < exerciseBucket.length; i++) {
      let obj = exerciseBucket[i];

      let findable = document.createElement("div");
      findable.className = "findable";
      findable.addEventListener("click", function() {
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
        .catch(function(err) {
          throw err;
          reject();
        });
    });
  };

  fh.func.init_routinesBicepsInFindbar = function() {
    fh.interval.check_exercisesFetchDone = setInterval(function() {
      if (fh.flag.bicepsFetchDone == true) {
        // HARD CODE the amount of Biceps Exercises Fetched in order to wait for them all before appending

        clearInterval(fh.interval.check_exercisesFetchDone);

        let findables_exercises = document.querySelector(
          ".findables_exercises"
        );

        for (let i = 0; i < fh.data.exercises.biceps.length; i++) {
          let obj = fh.data.exercises.biceps[i];

          let findable = document.createElement("div");
          findable.className = "findable";
          findable.addEventListener("click", function() {
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

  fh.func.isWithin = function(coords, elem) {
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

  /*************
  Initialization
  **************/
  window.addEventListener("DOMContentLoaded", event => {
    const currUser = localStorage.getItem("currentUser");

    // console.log('DOM fully loaded and parsed');

    // Exercises call, dropdown event, dropdownItem events, append biceps first
    fh.func.apiCall_exercises();
    fh.func.addListener_click_dropdownFindExercise();
    fh.func.addListener_click_eachItemInExercisesDropdownMenu();
    fh.func.init_routinesBicepsInFindbar();

    // Login/Registration Panel Events
    fh.func.addListener_click_initCreateAccountButton();
    fh.func.addListener_click_loginButtonProper();
    fh.func.addListener_click_createAccountProper();
    fh.func.addListener_click_loginButtonBack();
    fh.func.addListener_click_saveButtonStagedRoutine();

    fh.func.addListener_click_body();
  });
};
