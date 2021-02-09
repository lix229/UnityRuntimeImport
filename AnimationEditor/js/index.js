window.onload = function() {
	Particles.init({
	  selector: '.background',
	  connectParticles: true,
	  maxParticals: 150,
	  color: "#EEEAE9"
	});
};

var
      animSheet = document.styleSheets[1] // replace 0 with the number of the animSheet that you want to modify
    , rules = animSheet.cssRules
    , i = rules.length
    , ruleItems
    , keyframe
	, currentFrameTime = 0
	, maxFrameTime = 0
	, keyframeCount = 1
	, keyFrameList = [["{transform: rotate3d(0, 0, 0, 0);}"], ["{transform: scale3d(1, 1, 1) rotate3D(10, 20, 1, 70deg);}"]]
	, keyFrameTimes = [0,10000]
;

var toggleAnimation = function(){
	var animObj = document.getElementsByClassName('cube')[0];
	animObj.style.animationDuration = keyFrameTimes[keyFrameTimes.length-1] + 'ms';
	if (animObj.style.animationPlayState === 'paused') {
		animObj.style.animationPlayState = 'running';
		document.getElementById('playStatus').innerHTML = 'PAUSE'
	}
	else{
		animObj.style.animationPlayState = 'paused';
		document.getElementById('playStatus').innerHTML = 'PLAY'
	}
}



// while (i--) {
//     ruleItems = rules.item(i);
// 	// console.log(ruleItems);
//     if (
//         (
//                ruleItems.type === ruleItems.KEYFRAMES_RULE
//             || ruleItems.type === ruleItems.WEBKIT_KEYFRAMES_RULE
//         )
//         && ruleItems.name === "animBody"
//     ) {
//         rules = ruleItems.cssRules;
// 		console.log(rules);
//         i = rules.length;
//         while (i--) {
//             keyframe = rules.item(i);
//             if (
//                 (
//                        keyframe.type === keyframe.KEYFRAME_RULE
//                     || keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE
//                 )
//                 && keyframe.keyText === "100%"
//             ) {
//                 keyframe.style.webkitTransform =
//                 keyframe.style.transform =
//                     "translate3d(0, " + "1000" + "px, 0)";
//                 break;
//             }
//         }
//         break;
//     }
// }

    ruleItems = rules.item(i);
	animSheet.removeRule(0);
	var newAnim = "@keyframes animBody { "
		+ "0%" + keyFrameList[0] +
		"100%" + keyFrameList[1] +
	  "}";
	animSheet.insertRule(newAnim, 0)


var submitFrameData = function() {
	var 
	  frameData = fetchNewFrameData() // Maybe don't need to unpack?
	// , currentFrameTime = frameData[0]
	// , rotationData = frameData[1]
	// , scaleData = frameData[2]
	// , translateData = frameData[3]
	, validData = [];
	frameData.forEach(function(value, index) {
		if (!value.includes("")) {
			// console.log([index, value]);
			validData.push([index, value]);
		}
	});
	// console.log(frameData);
	console.log(validData);
	console.log(createFrameString(validData));
	if (frameData[0].includes("")) {
		alert("Frametime must be filled in.");
		return;
	}
	else if (validData.length === 1) {
		alert("A keyframe must have at least 1 transformation!");
		return;
	}
	else if (keyFrameTimes.includes(currentFrameTime)){
		//TODO modify existing frame
	}
	else { // A new frame
		keyFrameTimes.push(currentFrameTime[0]);
		keyFrameTimes.sort(function(a, b){return a-b});
		// console.log(frameString);
	}
	
}

var fetchNewFrameData = function() {
	var currentFrameTime = [document.getElementById('ft').value];
	var rotationData = [document.getElementById('rx').value, document.getElementById('ry').value, document.getElementById('rz').value, document.getElementById('rr').value];
	var scaleData = [document.getElementById('sx').value, document.getElementById('sy').value, document.getElementById('sz').value];
	var translateData = [document.getElementById('tlx').value, document.getElementById('tly').value, document.getElementById('tlz').value];
	return [currentFrameTime, rotationData, scaleData, translateData]
}

var createFrameString = function(validData) {
	alert('called');
	var frameString = "{transform: ";
	for (var i = 1; i < validData.length; i ++) {
		switch (validData[i][0]) {
			case 1:
				frameString += "rotate3D(" + validData[i][1] + "deg) ";
				break;
			case 2:
				frameString += "scale3d(" + validData[i][1] + ") ";
				break;
			case 3:
				frameString += "translate3d(" + validData[i][1] + ") ";
				break;
		}
	};
	frameString += "}";
	console.log(frameString);
	return frameString;
}