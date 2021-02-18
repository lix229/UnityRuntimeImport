// Load background
window.onload = function() {
	Particles.init({
	  selector: '.background',
	  connectParticles: true,
	  maxParticals: 150,
	  color: "#EEEAE9"
	});
};

// TODO use query selector instead.

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
}; // Function to insert item at index

const styleSheets = Array.from(document.styleSheets).filter(
	(styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
  ); // This no longer works on Chrome due to the CORS policies being enforced by Google.

var
    //   animSheet = document.styleSheets[1]
	// animSheet = styleSheets[1]
    // , rules = animSheet.cssRules
    // , i = rules.length
     ruleItems
    , keyframe
	, currentFrameTime = 0
	, keyFrameList = ["{transform: scale3D(1, 1, 1)}"] // This should be empty after testing.
	, keyFrameTimes = ["0"]
	// There should be a keyframe at 0ms so that the animation plays correctly.
;


var toggleAnimation = function(){
	//TODO Add frametime support
	var animObj = document.getElementsByClassName('cube')[0];
	if (animObj.style.animationPlayState !== 'running') { // Not the best, but set condition to == paused will only work from second click for some reason.
		animObj.style.animationPlayState = 'running';
		document.getElementById('playStatus').innerHTML = 'PAUSE'
	}
	else{
		animObj.style.animationPlayState = 'paused';
		document.getElementById('playStatus').innerHTML = 'PLAY'
	}
}


var submitFrameData = function() {
	var 
	  frameData = fetchNewFrameData() // Maybe don't need to unpack?
	, currentFrameTime = frameData[0] // This is needed for updating keyframes.
	// , rotationData = frameData[1]
	// , scaleData = frameData[2]
	// , translateData = frameData[3]
	, validData = [];
	frameData.forEach(function(value, index) {
		if (!value.includes("")) {
			validData.push([index, value]);
		}
	});
	var frameString = createFrameString(validData);
	if (frameData[0].includes("")) {
		alert("Frametime must be filled in.");
		return;
	}
	else if (validData.length === 1) {
		alert("A keyframe must have at least 1 transformation!");
		return;
	}
	else if (checkFrameExistence()){
		alert("This is called");
		var animObj = document.getElementsByClassName('cube')[0];
		keyFrameList[[keyFrameTimes.indexOf(currentFrameTime)] == -1 ? keyFrameTimes.length-1 : [keyFrameTimes.indexOf(currentFrameTime)]] = frameString;
		var newAnim = "@keyframes animPlaceHolder { ";
		for (var i = 0; i < keyFrameTimes.length; i ++) {
			if (keyFrameTimes.length === 1){
				newAnim += "0% " + keyFrameList[i]; //FIXME auto detect not first frame?
			}
			else {
				newAnim += (keyFrameTimes[i]/keyFrameTimes[keyFrameTimes.length-1]*100).toFixed() + "% " + keyFrameList[i]; 
			}
		};
		newAnim += "}";
		console.log(newAnim)
		tagAnimObj = document.getElementsByTagName("STYLE")[0];
		tagAnimObj.innerHTML = newAnim;
	}
	else {
		 // A new frame
		keyFrameTimes.push(validData[0][1][0]);
		keyFrameTimes.sort(function(a, b){return a-b});
		var animObj = document.getElementsByClassName('cube')[0];
		animObj.style.animationDuration = keyFrameTimes[keyFrameTimes.length-1] + 'ms'; // Update duration to last frametime
		var timePer = (validData[0][1][0]/keyFrameTimes[keyFrameTimes.length-1]*100).toFixed() + "% ";
		keyFrameList.insert(keyFrameTimes.indexOf(validData[0][1][0]), frameString);
		// console.log(keyFrameList) // Log the animation

		var newAnim = "@keyframes animPlaceHolder { ";
		for (var i = 0; i < keyFrameTimes.length; i ++) {
			if (keyFrameTimes.length === 1){
				newAnim += "0% " + keyFrameList[i]; //FIXME auto detect not first frame?
			}
			else {
				newAnim += (keyFrameTimes[i]/keyFrameTimes[keyFrameTimes.length-1]*100).toFixed() + "% " + keyFrameList[i]; 
			}
		};
		newAnim += "}";
		tagAnimObj = document.getElementsByTagName("STYLE")[0];
		tagAnimObj.innerHTML = newAnim;
		// console.log(tagAnimObj.innerHTML);
	}
	
}

//TODO remove keyframes
//TODO Sliders for options
//TODO Sliders for animation playback
//TODO Instant animation?

var fetchNewFrameData = function() {
	var currentFrameTime = [document.getElementById('ft').value];
	var rotationData = [document.getElementById('rx').value, document.getElementById('ry').value, document.getElementById('rz').value, document.getElementById('rr').value];
	var scaleData = [document.getElementById('sx').value, document.getElementById('sy').value, document.getElementById('sz').value];
	var translateData = [document.getElementById('tlx').value, document.getElementById('tly').value, document.getElementById('tlz').value];
	return [currentFrameTime, rotationData, scaleData, translateData]
}

var createFrameString = function(validData) {
	alert('New frame added at ' + validData[0][1] + ' ms added.');
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
	frameString += "}";
	return frameString;
}

function fillInFrameData(frametime) {
	//TODO remove previously filled spaces
	var frameString = keyFrameList[keyFrameTimes.indexOf(frametime)];
	console.log(frameString)
	if (frameString.includes("rotate3D")) {
		var values = frameString.substring(frameString.indexOf("rotate3D(") + 9, frameString.indexOf(")")-3).split(",");
		document.querySelector("#rx").value = values[0];
		document.querySelector("#ry").value = values[1];
		document.querySelector("#rz").value = values[2];
		document.querySelector("#rr").value = values[3];
	}
	else if (frameString.includes("scale3D")){
		var values = frameString.substring(frameString.indexOf("scale3D(") + 8, frameString.indexOf(")")).split(",");
		document.querySelector("#sx").value = values[0];
		document.querySelector("#sy").value = values[1];
		document.querySelector("#sz").value = values[2];
	}
	else if (frameString.includes("translate3D")) {
		var values = frameString.substring(frameString.indexOf("translate3D(") + 12, frameString.indexOf(")")).split(",");
		document.querySelector("#tlx").value = values[0].slice(0,-2);
		document.querySelector("#tly").value = values[1].slice(0,-2);
		document.querySelector("#tlz").value = values[2].slice(0,-2);
	}
	
	else {
		return;
	}
	
};


var checkFrameExistence = function() {
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
		var inputs = document.querySelectorAll('.inputaxis');
		for (var i of inputs) {
			i.value = ""
		}
		return false;
	}
}

var toggleInputLock = function (signal) {
	switch (signal) {
		case 1:
			for (var input of document.querySelectorAll(".inputaxis")) {
				input.disabled = false;
			}
			document.querySelector("#addFrameButton").disabled = false;
			break;
		case 0:
			for (var input of document.querySelectorAll(".inputaxis")) {
				input.disabled = true;
			}
			document.querySelector("#addFrameButton").disabled = true;
			break;
		default:
			alert("You should not see this.");
			break;
	}
}