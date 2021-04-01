// Load background
window.onload = function() {
	Particles.init({
	  selector: '.background',
	  connectParticles: true,
	  maxParticals: 150,
	  color: "#EEEAE9"
	});
};



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
	, keyFrameList = [[0, "{transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} "]] // This should be empty after testing.
    , keyFrameTimes = ["0"]
	, outputStr = ''
	, inputFile
	, fileLines = []

	// There should be a keyframe at 0ms so that the animation plays correctly.
;
// function import_object(){
// 	const inputElement = document.getElementById("file");
// 	inputElement.addEventListener("change", handleFiles, false);
// 	function handleFiles() {
//   				const file = this.files[0]; /* now you can work with the file list */
                
              
//                 var reader = new FileReader();
//                 reader.onload = function(progressEvent){
//                     // Entire file
//                 //console.log(this.result);

//                 // By lines
//                 var lines = this.result.split('\n');
//                 //var content = lines[0].split(',');
//                 var content = [];
//                 var content_list = [];
//                 var str1=str2=str3 = "";
//                 var kt = [];
// 				outputStr = lines[0];
//                 for(var line = 1; line < lines.length; line++){
//                     //console.log(lines[line]);
//                     //lines[0] = lines[0].split(',');
//                     lines[line] = lines[line].split(',');

//                     // just check for importing
//                     //"{transform: scale3D(1, 1, 1)} "
//                     if(line == 1 && lines[line].length == 15){
//                         //console.log(1);
//                         content.push(lines[line][4]);
//                         str1 = "{transform: rotate3D(" + lines[line][6] + "," + lines[line][7] + "," + lines[line][8] + ")} ";
//                         str2 = "{transform: scale3D(" + lines[line][9] + "," + lines[line][10] + "," + lines[line][11] + ")} ";
//                         str3 = "{transform: translate3D(" + lines[line][12] + "," + lines[line][13] + "," + lines[line][14] + ")} ";
//                         content.push(str1);
//                         content.push(str2);
//                         content.push(str3);
// 						//console.log(content);
//                         content_list.push(content);
//                         kt.push((lines[line][3]).toString());
//                         content = [];
//                         //console.log(content);

//                     }else if(line != 1 && lines[line].length == 13){
//                         content.push(lines[line][3]);
//                         str1 = "{transform: rotate3D(" + lines[line][4] + "," + lines[line][5] + "," + lines[line][6] + ")} ";
//                         str2 = "{transform: scale3D(" + lines[line][7] + "," + lines[line][8] + "," + lines[line][9] + ")} ";
//                         str3 = "{transform: translate3D(" + lines[line][10] + "," + lines[line][11] + "," + lines[line][12] + ")} ";
//                         content.push(str1);
//                         content.push(str2);
//                         content.push(str3);
//                         content_list.push(content);
//                         //console.log(content);
//                         content = [];
//                         kt.push((lines[line][2]).toString());
//                         //console.log(kt);

//                     }
                    
                    
                
//                 }
// 					console.log(content_list[1]);
// 					keyFrameList = content_list;
// 					keyFrameTimes = kt;
// 					updateAnimation();

                    
//                 };
//                 reader.readAsText(file);
                
//             }

// 	   toggleFileMenu();
// }




var toggleAnimation = function(){
	//TODO Add frametime support
	var animObj = document.getElementsByClassName('cube')[0];
	if (animObj.style.animationPlayState !== 'running') { // Not the best, but set condition to == paused will only work from second click for some reason.
		animObj.style.animationPlayState = 'running';
		currentTime = parseInt(document.querySelector("#ft").value);
		// timer.start();
		document.getElementById('playStatus').innerHTML = 'PAUSE'
	}
	else{
		animObj.style.animationPlayState = 'paused';
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
		alert("Keyframe generation failed, at least one transformation needs to be fully filled in.");
		return;
	}
	
	else if (checkFrameExistence()){
		// Update frame
		var animObj = document.getElementsByClassName('cube')[0];
		keyFrameList[keyFrameTimes.indexOf(currentFrameTime)] = [isInstant? 1:0, frameString];
		updateAnimation();
		checkFrameExistence();
		alert('Existing keyframe at ' + validData[0][1][0] + ' ms updated.');
	}
	else {
		// A new frame
		
		// check if data  is out of range before inserting the frame
		// for(i = 1; i < frameData.length; i++){
		// 	for(j = 0; j < frameData[i].length;j++){
		// 		if(Math.abs(frameData[i][j]) >= 2,147,483,647){
					
		// 			alert('input data ' + frameData[i][j] +' is out of range');
		// 			return;
		// 		}
		// 	}
		// }
		keyFrameTimes.push(validData[0][1][0]);
		keyFrameTimes.sort(function(a, b){return a-b});
		var animObj = document.getElementsByClassName('cube')[0];
		animObj.style.animationDuration = keyFrameTimes[keyFrameTimes.length-1] + 'ms'; // Update duration to last frametime
		keyFrameList.insert(keyFrameTimes.indexOf(validData[0][1][0]), [isInstant? 1:0, frameString]);
		updateAnimation();
		checkFrameExistence();
		alert('New frame added at ' + validData[0][1][0] + ' ms added.');
	}
	
}


function fetchNewFrameData() {
	var currentFrameTime = [document.getElementById('ft').value];
	// var rotationData = [document.getElementById('rx').value, document.getElementById('ry').value, document.getElementById('rz').value, document.getElementById('rr').value];
	var rotationData = [document.getElementById('rx').value, document.getElementById('ry').value, document.getElementById('rz').value];
	var scaleData = [document.getElementById('sx').value, document.getElementById('sy').value, document.getElementById('sz').value];
	var translateData = [document.getElementById('tlx').value, document.getElementById('tly').value, document.getElementById('tlz').value];
	return [currentFrameTime, rotationData, scaleData, translateData]
}

function createFrameString(validData) {
	console.log(validData)
	// alert('New frame added at ' + validData[0][1] + ' ms added.');
	// var frameString = (isInstant? "{animation-timing-function:steps(1, start);  transform: " : "{transform: ");
	var frameString = "{ transform: ";
	for (var i = 1; i < validData.length; i ++) {
		switch (validData[i][0]) {
			case 1:
				console.log('called')
				for (var j = 0; j < validData[i][1].length; j ++) {
					switch (j) {
						case 0:
							frameString += "rotateX(" + validData[i][1][j] + "deg) ";
							break;
						case 1:
							frameString += "rotateY(" + validData[i][1][j] + "deg) ";
							break;
						case 2:
							frameString += "rotateZ(" + validData[i][1][j] + "deg) ";
							break;
					}
				}
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
	console.log(frameString)
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
		// if (transform.includes("rotate3D")) {
		// 	var values = transform.substring(transform.indexOf("rotate3D(") + 9).split(",");
		// 	console.log(values)
		// 	document.querySelector("#rx").value = values[0];
		// 	document.querySelector("#ry").value = values[1];
		// 	document.querySelector("#rz").value = values[2];
		// 	document.querySelector("#rr").value = values[3].slice(0,-3);
		// }
		if (transform.includes("rotateX")) {
			var values = transform.substring(transform.indexOf("rotateX(") + 8, transform.indexOf("deg"))
			document.querySelector("#rx").value = values;
		}
		if (transform.includes("rotateY")) {
			var values = transform.substring(transform.indexOf("rotateY(") + 8, transform.indexOf("deg"))
			document.querySelector("#ry").value = values;
		}
		if (transform.includes("rotateZ")) {
			var values = transform.substring(transform.indexOf("rotateZ(") + 8, transform.indexOf("deg"))
			document.querySelector("#rz").value = values;
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
	// console.log(animList);
	
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
	var tagAnimObj = document.getElementsByTagName("STYLE")[0];
	tagAnimObj.innerHTML = newAnim;

	console.log(newAnim);
	// console.log(animObj.style.animationDuration);
}

function export_file(){
	if(outputStr != ""){
		outputStr += "\n";
	}else{
		 outputStr = "Default,1,NA";
		 outputStr += "\n"
	}
	//var str1 = "";
	var num = 1;
	for(var i = 0; i < keyFrameList.length; i++){
		outputStr += num.toString();
		if(i == 0){
			outputStr += ",Object,Default,";
		}else{
			outputStr += ",Default,"
		}
		outputStr += keyFrameTimes[i];
		outputStr += ","+keyFrameList[i][0];
		if(i == 0){
			//TODO get the real slotName of imported Objects
			var slot = 0
			outputStr += ","+ slot.toString();
		}
		for(var k = 1; k < keyFrameList[i].length ; k++){
			var thenum = keyFrameList[i][k].replace( /{tr.*\(/, '');
			thenum = thenum.replace(/\)}/,'');
			thenum = thenum.replace(/ /, '');
			outputStr +=","+ thenum;
			//console.log(outputStr);
		}
		outputStr += "\n";
		


	}
	var link = document.createElement('a');
	link.href = 'data:text/plain;charset=UTF-8,' + escape(outputStr);
	link.download = 'output.txt';
	link.click();
}


function updateLabel() {
	var path = document.querySelector("#file-input").value;
	//ori_page = document.querySelector(".custom-file-upload").innerHTML;
	// inputFile = document.querySelector("#file-input").files[0]
	// console.log(inputFile)
	if (path) {
		var startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
		var filename = path.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
		// document.querySelector(".custom-file-upload").innerHTML = `<input type='file' id='file-input' class='file' accept='.txt' oninput='updateLabel()'>${filename}`;
		document.querySelector(".file-name").innerHTML = `Currently Selected: ${filename}`;
	}

	// ele.addEventListener("change", handleFiles, false);
	// function handleFiles() {
  	// 			const file = this.files[0]; /* now you can work with the file list */
    //             //console.log("work on file right now")
	// 			console.log(file)
              
    //             var reader = new FileReader();
    //             reader.onload = function(progressEvent){
    //                 // Entire file
    //             //console.log(this.result);

    //             // By lines
    //             var lines = this.result.split('\n');
    //             //var content = lines[0].split(',');
    //             var content = [];
    //             var content_list = [];
    //             var str1=str2=str3 = "";
    //             var kt = [];
	// 			outputStr = lines[0];
    //             for(var line = 1; line < lines.length; line++){
    //                 //console.log(lines[line]);
    //                 //lines[0] = lines[0].split(',');
    //                 lines[line] = lines[line].split(',');

    //                 // just check for importing
    //                 //"{transform: scale3D(1, 1, 1)} "
    //                 if(line == 1 && lines[line].length == 15){
    //                     //console.log(1);
    //                     content.push(lines[line][4]);
    //                     str1 = "{transform: rotate3D(" + lines[line][6] + "," + lines[line][7] + "," + lines[line][8] + ")} ";
    //                     str2 = "{transform: scale3D(" + lines[line][9] + "," + lines[line][10] + "," + lines[line][11] + ")} ";
    //                     str3 = "{transform: translate3D(" + lines[line][12] + "," + lines[line][13] + "," + lines[line][14] + ")} ";
    //                     content.push(str1);
    //                     content.push(str2);
    //                     content.push(str3);
	// 					//console.log(content);
    //                     content_list.push(content);
    //                     kt.push((lines[line][3]).toString());
    //                     content = [];
    //                     //console.log(content);

    //                 }else if(line != 1 && lines[line].length == 13){
    //                     content.push(lines[line][3]);
    //                     str1 = "{transform: rotate3D(" + lines[line][4] + "," + lines[line][5] + "," + lines[line][6] + ")} ";
    //                     str2 = "{transform: scale3D(" + lines[line][7] + "," + lines[line][8] + "," + lines[line][9] + ")} ";
    //                     str3 = "{transform: translate3D(" + lines[line][10] + "," + lines[line][11] + "," + lines[line][12] + ")} ";
    //                     content.push(str1);
    //                     content.push(str2);
    //                     content.push(str3);
    //                     content_list.push(content);
    //                     //console.log(content);
    //                     content = [];
    //                     kt.push((lines[line][2]).toString());
    //                     //console.log(kt);

    //                 }
                    
                    
                
    //             }
	// 				//console.log(content_list[1]);
	// 				keyFrameList = content_list;
	// 				keyFrameTimes = kt;
	// 				updateAnimation();

                    
    //             };
    //             reader.readAsText(file);
                
    //         }

}

function toggleFileMenu() {
	var menuVisibility = document.querySelector(".file-menu-wrapper").style.display
	if (menuVisibility == "none") {
		document.querySelector(".file-menu-wrapper").style.display = "block";
	}
	else {
		document.querySelector(".file-menu-wrapper").style.display = "none";
	}
}

function abortFile() {
	// Toggles file menu and reset input queue
	toggleFileMenu();
	document.querySelector(".file-name").innerHTML = `Currently Selected: None`;
	inputFile = undefined
}

function handleInput() {
	if (!inputFile) {
		alert("No file selected.")
		return
	}
	if (checkFormat()) {
		alert("File loaded successfully.")
		// TODO Multi animation support
		var inputFrameData = []
		fileLines.slice(1).forEach((line) => {
			inputFrameData.push(line.split(',').slice(2))
		}) // Remove first line, and first 2 entries of all the lines
		inputFrameData[0] = inputFrameData[0].slice(2) // Remove the third and forth entry of second line
		console.log(inputFrameData)
		// TODO Finish input frame data generation
		keyFrameTimes = []
		keyFrameList = []
		inputFrameData.forEach((frame) => {
			keyFrameTimes.push(frame[0])
			var validData = [[0, [frame[0]]], [1, [frame[5], frame[6], frame[7]]], [2, [frame[8], frame[9], frame[10]]], [3, [frame[2], frame[3], frame[4]]]]
			// console.log(createFrameString(validData))
			keyFrameList.push([frame[1], createFrameString(validData)])
		})
		toggleFileMenu();
	};
	updateAnimation();
}


  function checkFormat() {
	  function terminateInput() {
		document.querySelector(".file-name").innerHTML = `Currently Selected: None`;
		alert("Incorrect format.")
		inputFile = undefined
		fileLines = []
		return false
	  }
	  var rawFrames = []
	  fileLines.forEach((line) => {
		  rawFrames.push(line.split(','))
	  });
	  console.log(rawFrames[0])
	  if (rawFrames[0].length != 3 | rawFrames[1].length != 15 | rawFrames.length < 2 | rawFrames[1][2] != rawFrames[0][0]) {
		// Check if length of line 1 and 2 are correct
		return terminateInput()
	  }
	  for(var i = 1; i < rawFrames.length; i ++) {
		  // Check any invalid inputs from line 2
		  if (i != 1){
			// Line 3 and forward
			if (rawFrames[i].length != 13) { // Check length
				return terminateInput()
			  }
			  else if(rawFrames[i][1] != rawFrames[0][0] | rawFrames[i][0] != rawFrames[0][1]) {
				return terminateInput()
			  }
			  var transData = rawFrames[i].slice(2)
			  transData.forEach((entry) => {
				  if (isNaN(entry)){// Check if transactions are all numbers
					  return terminateInput()
				  }
			  })
		  }
		  else {
			if (rawFrames[i].length != 15) { // Check length
				return terminateInput()
			}
			else if(rawFrames[i][2] != rawFrames[0][0] | rawFrames[i][0] != rawFrames[0][1]) {
				return terminateInput()
			  }
			  var transData = rawFrames[i].slice(3)
			  transData.forEach((entry) => {
				  if (isNaN(entry)){ // Check if transactions are all numbers
					  return terminateInput()
				  }
			  })
		  }
	  }
	return true
  }	

document.getElementById('file-input').onclick = function() {
	this.value= null;
}

document.getElementById('file-input').onchange = function(){
	console.log('This is called')
	inputFile = this.files[0];
	updateLabel();
	var reader = new FileReader();
	reader.onload = function(progressEvent){
		// Read file line by line split by line break
		var lines = this.result.split(/\r\n|\n/);
		for(var line = 0; line < lines.length; line++){
		if (lines[line]) {
			fileLines.push(lines[line])
		}
		}
	};
	reader.readAsText(inputFile);
};

