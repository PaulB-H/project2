console.log('hi');


const fh = {};



fh.data = {};

fh.data.exercises = {};
fh.data.exercises.biceps    = [];
fh.data.exercises.shoulders = [];
fh.data.exercises.obliques  = [];
fh.data.exercises.chest     = [];
fh.data.exercises.quads     = [];
fh.data.exercises.abs       = [];
fh.data.exercises.lowerNeck = [];
fh.data.exercises.triceps   = [];
fh.data.exercises.outerBack = [];
fh.data.exercises.butt      = [];
fh.data.exercises.hamstring = [];
fh.data.exercises.calves    = [];


fh.flag = {};
fh.flag.bicepsFetchDone = false;


fh.interval = {};
fh.interval.check_exercisesFetchDone = null;



// Functions
//==========
fh.func = {};


fh.func.apiCall_exercises = function(){

	/* Muscle Groups Accessed by ID given by API */

	/* Front Muscles */
	let id_biceps    = 1;
	let id_shoulders = 2;
	let id_obliques  = 14
	let id_chest     = 4;
	let id_quads     = 10;
	let id_abs       = 6;
	
	/* Rear Muscles */
	let id_lowerNeck = 9;
	let id_triceps   = 5;
	let id_outerBack = 12;
	let id_butt      = 8;
	let id_hamstring = 11;
	let id_calves    = 7;



	/* Urls use IDs that the API expects */
	let url_biceps    = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_biceps}&status=2`;
	let url_shoulders = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_shoulders}&status=2`;
	let url_obliques  = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_obliques}&status=2`;
	let url_chest     = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_chest}&status=2`;
	let url_quads     = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_quads}&status=2`;
	let url_abs       = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_abs}&status=2`;

	let url_lowerNeck = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_lowerNeck}&status=2`;
	let url_triceps   = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_triceps}&status=2`;
	let url_outerBack = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_outerBack}&status=2`;
	let url_butt      = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_butt}&status=2`;
	let url_hamstring = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_hamstring}&status=2`;
	let url_calves    = `https://wger.de/api/v2/exercise/?language=2&muscles=${id_calves}&status=2`;



	/* Fetches */

	Promise.all([
	
		/* Biceps */
		fh.func.createObj_exercise(url_biceps,		fh.data.exercises.biceps, 	true),
	
		/* Shoulders */
		fh.func.createObj_exercise(url_shoulders, 	fh.data.exercises.shoulders),

		/* Obliques */
		fh.func.createObj_exercise(url_obliques, 	fh.data.exercises.obliques),

		/* Chest */
		fh.func.createObj_exercise(url_chest, 		fh.data.exercises.chest),

		/* Quads */
		fh.func.createObj_exercise(url_quads, 		fh.data.exercises.quads),

		/* Abs */
		fh.func.createObj_exercise(url_abs, 		fh.data.exercises.abs),

		/* Lower Neck */
		fh.func.createObj_exercise(url_lowerNeck, 	fh.data.exercises.lowerNeck),

		/* Triceps */
		fh.func.createObj_exercise(url_triceps, 	fh.data.exercises.triceps),

		/* OuterBack */
		fh.func.createObj_exercise(url_outerBack, 	fh.data.exercises.outerBack),

		/* Butt */
		fh.func.createObj_exercise(url_butt, 		fh.data.exercises.butt),

		/* Hamstring */
		fh.func.createObj_exercise(url_hamstring, 	fh.data.exercises.hamstring),

		/* Calves */
		fh.func.createObj_exercise(url_calves, 		fh.data.exercises.calves)
	])
	.then((v)=>{

		console.log(v, 'v');
	})
	

};



fh.func.createObj_exercise = (url, myArray, flag)=>{
	
	return new Promise((resolve, reject)=>{

		fetch(url)
		.then((resp)=>resp.json())
		.then((data)=>{

			// console.log(data, 'data');

			for(let i = 0; i < data.results.length; i++){

				let obj = {};
					obj.name = data.results[i].name;
					obj.desc = data.results[i].description;
					obj.img  = [];


				let url_forImage = `https://wger.de/api/v2/exerciseimage/?exercise=${data.results[i].id}`;


				if(i == data.results.length -1 ){

					return resolution = fh.func.fetch_exerciseImages(url_forImage, obj, myArray);
				}
				else{

					fh.func.fetch_exerciseImages(url_forImage, obj, myArray);
				};
			};
		})
		.then((v)=>{

			// console.log(v, 'v');

			/*
			Flag when Biceps fetch is done.
			This is what I want earliest so as to start displaying on screen
			*/
			if(flag == true){

				fh.flag.bicepsFetchDone = true;
			};


			resolve(v);
		})
	});
};



fh.func.fetch_exerciseImages = function(url_forImage, obj, myArray){

	return new Promise((resolve, reject)=>{

		fetch(url_forImage)
		.then((resp)=>resp.json())
		.then((data)=>{

			let arr = data.results;

			if(arr.length == 1){

				obj.img.push(arr[0].image);
			}
			else
			if(arr.length == 2){

				obj.img.push(arr[0].image);
				obj.img.push(arr[1].image);
			};


			myArray.push(obj);

			
			resolve(true);

		})
		.catch(function(err){
			throw err;
			reject();
		});
	});	
};



fh.func.addListener_click_dropdownFindExercise = function(){

	let dropdownButton = document.querySelector('.dropdown_findbar');
		dropdownButton.addEventListener('click', function(){


			let menu = document.querySelector('.wrap_dropdown_findbar .dropdownMenu');			
			
			if(menu.classList.contains('displayNone')){

				menu.classList.add('displayBlock');
				menu.classList.remove('displayNone');
			}
			else
			if(menu.classList.contains('displayBlock')){

				menu.classList.add('displayNone');
				menu.classList.remove('displayBlock');
			};
		});
};



fh.func.addListener_click_eachItemInExercisesDropdownMenu = function(){

	let items = document.querySelectorAll('.drop_exercises > div');


	for(let i = 0; i < items.length; i++){

		let item = items[i];


		item.addEventListener('click', function(){

			/* Remove items currently inside findables_exercises */			
			let currentItems = document.querySelector('.findables_exercises').children;

			/* Reverse traversal to remove old items */
			for(let a = currentItems.length - 1; a > -1; a--){

				let oldItem = currentItems[a];
				oldItem.remove();
			};


			/*  Access proper bucket,
			create and append new items inside findables_exercises
			====================================================== */

			/* Get name from innerHTML of item in dropdown */
			let item_name_preserved = this.children[0].innerHTML;
			let item_name = item_name_preserved.toLowerCase();
			
			/* Handle 2 Words: Lower Neck & Outer Back => lowerNeck & outerBack */
			if(item_name.includes(' ')){

				let arr = item_name.split(' ');

				arr[1] = arr[1].charAt(0).toUpperCase() + arr[1].substring(1);

				item_name = arr[0] + arr[1];
			}

			/* Access Proper Bucket */
			let exerciseBucket = fh.data.exercises[item_name];

			/* Create and append new items according to exercise selected in dropdown */
			fh.func.createAppend_selectedExerciseGroup(exerciseBucket);


			/* displayNone dropdown menu */
			let drop_exercises = document.querySelector('.drop_exercises');
				drop_exercises.classList.add('displayNone');
				drop_exercises.classList.remove('displayBlock');

			let dropdownButtonTitle = document.querySelector('.dropdown_findbar > span:nth-of-type(1)');
				dropdownButtonTitle.innerHTML = item_name_preserved;

		});
	};
};



fh.func.addListener_click_body = function(){

	let docBody = document.querySelector('body');
		docBody.addEventListener('click', function(e){

			let x      = e.clientX;
			let y      = e.clientY;
			let coords = [x, y];

			let dropdown_findbar = document.querySelector('.dropdown_findbar');
			let dropdownMenu     = document.querySelector('.wrap_dropdown_findbar .dropdownMenu');

			if(isWithin(coords, dropdown_findbar) == false
			&& isWithin(coords, dropdownMenu)     == false){

				dropdownMenu.classList.add('displayNone');
				dropdownMenu.classList.remove('displayBlock');
			};
		});
};



function isWithin(coords, elem){

	let x = coords[0];
	let y = coords[1];

	let elem_left   = elem.getBoundingClientRect().left;
	let elem_right  = elem.getBoundingClientRect().right;
	let elem_top    = elem.getBoundingClientRect().top;
	let elem_bottom = elem.getBoundingClientRect().bottom;


	if(x > elem_left
	&& x < elem_right
	&& y > elem_top
	&& y < elem_bottom){

		return true;
	}
	else{

		return false;
	};
};



fh.func.init_routinesBicepsInFindbar = function(){

	fh.interval.check_exercisesFetchDone = setInterval(function(){

		if(fh.flag.bicepsFetchDone == true){ // HARD CODE the amount of Biceps Exercises Fetched in order to wait for them all before appending

			clearInterval(fh.interval.check_exercisesFetchDone);


			let findables_exercises = document.querySelector('.findables_exercises');


			for(let i = 0; i < fh.data.exercises.biceps.length; i++){

				let obj = fh.data.exercises.biceps[i];

				let findable           = document.createElement('div');
					findable.className = 'findable';
					findable.addEventListener('click', function(){

						fh.func.click_findableExercise(this);
					});

				let name           = document.createElement('p');
					name.innerHTML = obj.name;

				findable.appendChild(name);
				findables_exercises.appendChild(findable);
			};
		};

	},10);
};



fh.func.createAppend_selectedExerciseGroup = function(exerciseBucket){

	let findables_exercises = document.querySelector('.findables_exercises');


	for(let i = 0; i < exerciseBucket.length; i++){

		let obj = exerciseBucket[i];

		let findable           = document.createElement('div')
			findable.className = 'findable';
			findable.addEventListener('click', function(){

				fh.func.click_findableExercise(this);
			});

		let name           = document.createElement('p');
			name.innerHTML = obj.name;

		findable.appendChild(name)
		findables_exercises.appendChild(findable);
	};
};



fh.func.click_findableExercise = function(me){

	console.log('clicked findable');

	let findableName = me.children[0].innerHTML;


	/* Need to pull exercise category from dropdown text.
	This is used to access right exercise bucket in our data object */
	let exerciseCategory = document.querySelector('.dropdown_findbar > span').innerHTML;
		exerciseCategory = exerciseCategory.toLowerCase();

	/* Handle 2 words for category name:
	Split at space, capitalize second word in array, rejoin th string. */
	if(exerciseCategory.includes(' ')){

		exerciseCategory = exerciseCategory.split(' ');

		exerciseCategory[1] = exerciseCategory[1].charAt(0).toUpperCase() + exerciseCategory[1].substring(1);

		exerciseCategory = exerciseCategory[0] + exerciseCategory[1];
	}
	

	/* With exerciseCategory allowing getting to the right array,
	loop through array of exercise objects to find one
	that has a name property matching the name of the clicked findable. */
	
	let exerciseCategory_bucket = fh.data.exercises[exerciseCategory];

	// for(let i = 0; i < fh.data.exercises[exerciseCategory].length; i++){
	for(let i = 0; i < exerciseCategory_bucket.length; i++){

		let exercise = exerciseCategory_bucket[i];

		if(findableName == exercise.name){

			console.log(exercise, 'this is the one');

			/*
			CREATE & APPEND PLATE IN CENTER CONTEXT COLUMN
			*/
			let contentPlate           = document.createElement('div');
				contentPlate.className = 'content_plate';

			let exerciseName           = document.createElement('p');
				exerciseName.className = 'cplate_exerciseName';
				exerciseName.innerHTML = exercise.name;

			let exerciseDesc           = document.createElement('p');
				exerciseDesc.className = 'cplate_exerciseDesc';
				exerciseDesc.innerHTML = exercise.desc;

			// start appending pieces
			contentPlate.appendChild(exerciseName);
			contentPlate.appendChild(exerciseDesc);

			/* Conditional creation and append */ 
			// if images are present in the array, append them
			if(exercise.img.length > 0){

				let exerciseImagesFlex           = document.createElement('div');
					exerciseImagesFlex.className = 'exerciseImagesFlex';

				let exercise_image           = document.createElement('div');
					exercise_image.className = 'exercise_image';
					exercise_image.setAttribute('style', 
						`background-image: url("${exercise.img[0]}");`
					);

				let exercise_image_2           = document.createElement('div');
					exercise_image_2.className = 'exercise_image_2';
					exercise_image_2.setAttribute('style', 
						`background-image: url("${exercise.img[1]}");`
					);


				contentPlate.appendChild(exerciseImagesFlex);	
					exerciseImagesFlex.appendChild(exercise_image);
					exerciseImagesFlex.appendChild(exercise_image_2);

				

			};


			// append to DOM
			let wrap_context = document.querySelector('.wrap_context');
			wrap_context.insertBefore(contentPlate, wrap_context.children[0])

		};
	};
};






window.addEventListener('DOMContentLoaded', (event) => {

    // console.log('DOM fully loaded and parsed');

	fh.func.apiCall_exercises();

	fh.func.addListener_click_dropdownFindExercise();
	fh.func.addListener_click_eachItemInExercisesDropdownMenu();
	fh.func.addListener_click_body();

	fh.func.init_routinesBicepsInFindbar();
});


/*

userMuscle is following id

Front Muscles
-------------
Shoulders 2
Obliques 14
Chest 4
Quads 10
Abs 6

Rear Muscles
------------
Lower Neck 9
Triceps 5
Outer-Back 12
Butt 8
Hamstring 11
Calves 7

*/