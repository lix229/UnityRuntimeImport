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
	console.log(animSheet)
	animSheet.removeRule(0);
	var newAnim = "@keyframes animBody { "
		+ "0%" + keyFrameList[0] +
		"100%" + keyFrameList[1] +
	  "}";
	animSheet.insertRule(newAnim, 0)


var submitFrameData = function() {
	var 
	  frameData = fetchNewFrameData()
	, currentFrameTime = frameData[0]
	, rotationData = frameData[1]
	, scaleData = frameData[2]
	, translateData = frameData[3]
	
	if (currentFrameTime.includes("") || rotationData.includes("") || scaleData.includes("") || translateData.includes("")) {
		alert("Unfilled fields detected.")
	}
	else if (keyFrameTimes.includes(currentFrameTime)){
		//TODO modify existing frame
	}
	else {
		
	}
	
}

var fetchNewFrameData = function() {
	var currentFrameTime = [document.getElementById('ft').value];
	var rotationData = [document.getElementById('rx').value, document.getElementById('ry'), document.getElementById('rz'), document.getElementById('rr')];
	var scaleData = [document.getElementById('sx').value, document.getElementById('sy'), document.getElementById('sz')];
	var translateData = [document.getElementById('tlx').value, document.getElementById('tly'), document.getElementById('tlz')];
	return [currentFrameTime, rotationData, scaleData, translateData]
}