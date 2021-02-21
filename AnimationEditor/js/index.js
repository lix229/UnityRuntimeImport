// Load background
window.onload = function() {
	Particles.init({
	  selector: '.background',
	  connectParticles: true,
	  maxParticals: 150,
	  color: "#EEEAE9"
	});
};

// TODO Multiple object support
// TODO File IO support

// Function to insert item at index
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

function removeItem(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
	  arr.splice(index, 1);
	}
	return arr;
  }

// This no longer works on Chrome due to the CORS policies being enforced by Google.
const styleSheets = Array.from(document.styleSheets).filter(
	(styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
  ); 

var
    //   animSheet = document.styleSheets[1]
	// animSheet = styleSheets[1]
    // , rules = animSheet.cssRules
    // , i = rules.length
     ruleItems
    , keyframe
	, currentFrameTime = 0
	// [1 if instant 0 if not, transform data]
	, keyFrameList = [[0, "{transform: scale3D(1, 1, 1)} "]] // This should be empty after testing.
	, keyFrameTimes = ["0"]
	// There should be a keyframe at 0ms so that the animation plays correctly.
;




// _______________________________________________________________________________________
// A timer for displaying the playback time with start, stop, reset and getTime methods.

// class Timer {
// 	constructor () {
// 	  this.isRunning = false;
// 	  this.startTime = 0;
// 	  this.overallTime = 0;
// 	  }
  
// 	_getTimeElapsedSinceLastStart () {
// 	  if (!this.startTime) {
// 		return 0;
// 	  }
	
// 	  return Date.now() - this.startTime;
// 	  }
  
// 	start () {
// 	  if (this.isRunning) {
// 		return console.error('Timer is already running');
// 	  }
  
// 	  this.isRunning = true;
  
// 	  this.startTime = Date.now();
// 	  }
  
// 	stop () {
// 	  if (!this.isRunning) {
// 		return console.error('Timer is already stopped');
// 	  }
  
// 	  this.isRunning = false;
  
// 	  this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
// 	  }
  
// 	reset () {
// 	  this.overallTime = 0;
  
// 	  if (this.isRunning) {
// 		this.startTime = Date.now();
// 		return;
// 	  }
  
// 	  this.startTime = 0;
// 	  }
  
// 	getTime () {
// 	  if (!this.startTime) {
// 		return 0;
// 	  }
  
// 	  if (this.isRunning) {
// 		return this.overallTime + this._getTimeElapsedSinceLastStart();
// 	  }
  
// 	  return this.overallTime;
// 	  }
// }

// const timer = new Timer();
// // timer.start();
// setInterval(() => {
//   const currentPlayTime = timer.getTime();
//   document.getElementById('time').innerText = currentPlayTime;
// //   console.log(typeof(currentPlayTime)+currentPlayTime);
// //   console.log(document.querySelector(".cube").style.animationDuration)
//   document.querySelector(".cube").style.animationDuration = keyFrameTimes[keyFrameTimes.length-1] + 'ms'
//   if (checkTimer()) {
// 	timer = new Timer();  
// 	}
// }, 1)

// function checkTimer() {
	
// 	if (document.getElementById('time').innerHTML >= document.querySelector(".cube").style.animationDuration.slice(0,-2)) {
// 		return true;
// 	}
// 	return false;
// }
// _______________________________________________________________________________________

// A rough stopwatch
var currentTime = 0;
var stopwatchRunning = false;

function toggleStopWatch() {
	if (stopwatchRunning) {
		stopwatchRunning = false;
	}
	else {
		stopwatchRunning = true;
	}
}

function resetStopWatch() {
	currentTime = 0;
}

function updateStopWatch() {
	currentTime += 4.07;
	document.querySelector("#ft").value = currentTime;
	// document.querySelector("#time").innerHTML = currentTime;
	document.querySelector("#sliderFrame").value = currentTime;
	if (currentTime >= keyFrameTimes[keyFrameTimes.length-1]) {
		resetStopWatch();
	}
	checkFrameExistence();
}


var toggleAnimation = function(){
	//TODO Add frametime support
	var animObj = document.getElementsByClassName('cube')[0];
	if (animObj.style.animationPlayState !== 'running') { // Not the best, but set condition to == paused will only work from second click for some reason.
		animObj.style.animationPlayState = 'running';
		currentTime = parseInt(document.querySelector("#ft").value);
		// timer.start();
		stopwatch = window.setInterval('updateStopWatch()', 1);
		document.getElementById('playStatus').innerHTML = 'PAUSE'
	}
	else{
		animObj.style.animationPlayState = 'paused';
		window.clearInterval(stopwatch);
		// timer.stop();
		document.getElementById('playStatus').innerHTML = 'PLAY'
	}
}


var submitFrameData = function() {
	var 
	  frameData = fetchNewFrameData() // Maybe don't need to unpack?
	, currentFrameTime = frameData[0][0] // This is needed for updating keyframes.
	// , rotationData = frameData[1]
	// , scaleData = frameData[2]
	// , translateData = frameData[3]
	, validData = []
	, isInstant = document.querySelector('#isInstantCheckBox').checked;

	frameData.forEach(function(value, index) {
		if (!value.includes("")) {
			validData.push([index, value]);
		}
	});
	var frameString = createFrameString(validData);
	console.log(validData)
	if (frameData[0].includes("")) {
		alert("Frametime must be filled in.");
		return;
	}
	else if (validData.length === 1) {
		alert("A keyframe must have at least 1 transformation!");
		return;
	}
	
	else if (checkFrameExistence()){
		// Update frame
		alert("This is updated");
		var animObj = document.getElementsByClassName('cube')[0];
		console.log(keyFrameTimes);
		console.log(currentFrameTime);
		keyFrameList[keyFrameTimes.indexOf(currentFrameTime)] = [isInstant? 1:0, frameString];
		updateAnimation();
	}
	else {
		// A new frame
		keyFrameTimes.push(validData[0][1][0]);
		keyFrameTimes.sort(function(a, b){return a-b});
		var animObj = document.getElementsByClassName('cube')[0];
		animObj.style.animationDuration = keyFrameTimes[keyFrameTimes.length-1] + 'ms'; // Update duration to last frametime
		keyFrameList.insert(keyFrameTimes.indexOf(validData[0][1][0]), [isInstant? 1:0, frameString]);
		updateAnimation();
		checkFrameExistence();
	}
	
}


//TODO Sliders for options
//TODO Sliders for animation playback


function fetchNewFrameData() {
	var currentFrameTime = [document.getElementById('ft').value];
	var rotationData = [document.getElementById('rx').value, document.getElementById('ry').value, document.getElementById('rz').value, document.getElementById('rr').value];
	var scaleData = [document.getElementById('sx').value, document.getElementById('sy').value, document.getElementById('sz').value];
	var translateData = [document.getElementById('tlx').value, document.getElementById('tly').value, document.getElementById('tlz').value];
	return [currentFrameTime, rotationData, scaleData, translateData]
}

function createFrameString(validData) {
	alert('New frame added at ' + validData[0][1] + ' ms added.');
	// var frameString = (isInstant? "{animation-timing-function:steps(1, start);  transform: " : "{transform: ");
	var frameString = "{ transform: ";
	for (var i = 1; i < validData.length; i ++) {
		switch (validData[i][0]) {
			case 1:
				frameString += "rotate3D(" + validData[i][1] + "deg) ";
				break;
			case 2:
				frameString += "scale3D(" + validData[i][1] + ") ";
				break;
			case 3:
				var d = (validData[i][1]+'').split(",");
				for (var i = 0; i <= 2; i++){
					d[i] += "px";
				}
				var data = d.join(",");
				
				frameString += "translate3D(" + data + ") ";
				break;
		}
	};
	frameString += "} ";
	return frameString;
}

function fillInFrameData(frametime) { 
	var frameString = keyFrameList[keyFrameTimes.indexOf(frametime)];
	if (frameString[0]=== 1) {
		document.querySelector('#isInstantCheckBox').checked = true;
	}
	else {
		document.querySelector('#isInstantCheckBox').checked = false;
	}
	var transforms = frameString[1].split(')');
	for (const transform of transforms) {
		if (transform.includes("rotate3D")) {
			var values = transform.substring(transform.indexOf("rotate3D(") + 9).split(",");
			document.querySelector("#rx").value = values[0];
			document.querySelector("#ry").value = values[1];
			document.querySelector("#rz").value = values[2];
			document.querySelector("#rr").value = values[3].slice(0,-3);
		}
		if (transform.includes("scale3D")){
			var values = transform.substring(transform.indexOf("scale3D(") + 8).split(",");
			document.querySelector("#sx").value = values[0];
			document.querySelector("#sy").value = values[1];
			document.querySelector("#sz").value = values[2];
		}
		if (transform.includes("translate3D")) {
			var values = transform.substring(transform.indexOf("translate3D(") + 12).split(",");
			document.querySelector("#tlx").value = values[0].slice(0,-2);
			document.querySelector("#tly").value = values[1].slice(0,-2);
			document.querySelector("#tlz").value = values[2].slice(0,-2);
		}
	}
};


function checkFrameExistence() {
	if (document.querySelector("#ft").value <= keyFrameTimes[keyFrameTimes.length-1]) {
		document.querySelector("#sliderFrame").value = document.querySelector("#ft").value;
	}
	if (document.querySelector("#ft").value !== '') {
		toggleInputLock(1);
	}
	else {
		toggleInputLock(0);
		document.querySelector("#addFrameButton").innerHTML = "Add Keyframe";
		document.querySelector("#removeFrameButton").style.visibility = "hidden";
	}
	if (keyFrameTimes.includes(document.querySelector("#ft").value)) {
		// If keyframe exists at that frametime, fetch keyframe data and fill in the fields.
		fillInFrameData(document.querySelector("#ft").value);
		document.querySelector("#addFrameButton").innerHTML = "Update Keyframe";
		document.querySelector("#removeFrameButton").style.visibility = "visible";
		return true;
	}
	else {
		// Clear Previously filled fields
		document.querySelector("#addFrameButton").innerHTML = "Add Keyframe";
		document.querySelector("#removeFrameButton").style.visibility = "hidden";
		var inputs = document.querySelectorAll('.inputaxis');
		for (var i of inputs) {
			i.value = ""
		}
		document.querySelector('#isInstantCheckBox').checked = false;
		return false;
	}
	
}

function toggleInputLock(signal) {
	switch (signal) {
		case 1:
			for (var input of document.querySelectorAll(".inputaxis")) {
				input.disabled = false;
			}
			document.querySelector("#addFrameButton").disabled = false;
			document.querySelector("#isInstantCheckBox").disabled = false;
			break;
		case 0:
			for (var input of document.querySelectorAll(".inputaxis")) {
				input.disabled = true;
			}
			document.querySelector("#addFrameButton").disabled = true;
			document.querySelector("#isInstantCheckBox").disabled = true;
			break;
		default:
			alert("You should not see this.");
			break;
	}
}

function removeFrame() {
	var frameTime = document.querySelector("#ft").value;
	if (keyFrameTimes.includes(frameTime)) {
		// Remove framedata from the list
		const index = keyFrameTimes.indexOf(frameTime);
		keyFrameTimes = removeItem(keyFrameTimes, frameTime);
		keyFrameList = removeItem(keyFrameList, keyFrameList[index]);

		// Create new anim rule for obj
		updateAnimation();

		//Update interactivity.
		checkFrameExistence();
	}
}

function updateAnimation() {
	var animObj = document.getElementsByClassName('cube')[0];
	var newAnim = "@keyframes animPlaceHolder { ";
	var animList = [keyFrameList[0][1]]
	for (var i = 1; i < keyFrameList.length; i ++) {
		if(keyFrameList[i][0] === 1) {
			if (!animList[i-1].includes("animation-timing-function:")){
				animList[i-1] = "{ animation-timing-function: steps(1, end);" + animList[i-1].substring(1);
			};
			animList.push(keyFrameList[i][1]);
		}
		else {
			animList.push(keyFrameList[i][1]);
		}
	}
	console.log(animList);
	
	for (var i = 0; i < keyFrameTimes.length; i ++) {
		if (keyFrameTimes.length === 1){
			newAnim += "0% " + keyFrameList[i][1]; //FIXME Now using default first frame at 0.
		}
		else {
			newAnim += (keyFrameTimes[i]/keyFrameTimes[keyFrameTimes.length-1]*100).toFixed() + "% " + animList[i]; 
		}
	};
	newAnim += "}";
	// Update animation duration and slider maximum
	animObj.style.animationDuration = keyFrameTimes[keyFrameTimes.length-1] + 'ms';
	document.querySelector("#sliderFrame").max = keyFrameTimes[keyFrameTimes.length-1];
	var tagAnimObj = document.getElementsByTagName("STYLE")[0];
	tagAnimObj.innerHTML = newAnim;

	console.log(newAnim);
	// console.log(animObj.style.animationDuration);
}

// function toggleInstant(signal, indexToToggle) {
// 	if (signal) {
// 		// Change previous frame if is instant.
// 		keyFrameList[indexToToggle-1][1] = "{ animation-timing-function: steps(1, start);" + keyFrameList[indexToToggle-1][1].substring(1);
// 		console.log(keyFrameList[indexToToggle-1])
// 	}
// }


function sliderUpdateFrametime() {
	var frametime = document.querySelector("#ft");
	var slider = document.querySelector("#sliderFrame");
	frametime.value = slider.value;
	checkFrameExistence();
	//TODO Slider to preview anim
	// if (document.querySelector("#sliderFrame").value <= keyFrameTimes[keyFrameTimes.length-1]) {
	// 	document.querySelector(".cube").style.animationDelay = '-' + document.querySelector("#ft").value + 'ms';
	// }
}

// frametime.value = slider.value;
// var ft = slider.value;
// slider.oninput = function() {
//   output.innerHTML = this.value;
// }


// $("#sliderFrame").prop("value", currentPlayTime);