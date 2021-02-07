window.onload = function() {
	Particles.init({
	  selector: '.background',
	  connectParticles: true,
	  maxParticals: 150,
	  color: "#EEEAE9"
	});
};


var toggleAnimation = function(){
	var animObj = document.getElementsByClassName('cube')[0];
	console.log(animObj.style.animationPlayState);
	if (animObj.style.animationPlayState === 'paused') {
		animObj.style.animationPlayState = 'running';
		document.getElementById('playStatus').innerHTML = 'PAUSE'
	}
	else{
		animObj.style.animationPlayState = 'paused';
		document.getElementById('playStatus').innerHTML = 'PLAY'
	}
}

var
      stylesheet = document.styleSheets[0] // replace 0 with the number of the stylesheet that you want to modify
    , rules = stylesheet.rules
    , i = rules.length
    , ruleItems
    , keyframe
	, currentFrameTime = 0
	,maxFrameTime = 0
	,keyframeCount = 1
	,keyFrameList = ["transform: rotate3d(0, 0, 0, 0);"]
	,keyFrameTimes = [0]
;

while (i--) {
    ruleItems = rules.item(i);
	// console.log(ruleItems);
    if (
        (
               ruleItems.type === ruleItems.KEYFRAMES_RULE
            || ruleItems.type === ruleItems.WEBKIT_KEYFRAMES_RULE
        )
        && ruleItems.name === "rotate"
    ) {
        rules = ruleItems.cssRules;
		console.log(rules);
        i = rules.length;
        while (i--) {
            keyframe = rules.item(i);
            if (
                (
                       keyframe.type === keyframe.KEYFRAME_RULE
                    || keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE
                )
                && keyframe.keyText === "100%"
            ) {
                keyframe.style.webkitTransform =
                keyframe.style.transform =
                    "translate3d(0, " + "1000" + "px, 0)";
                break;
            }
        }
        break;
    }
}


var submitFrameData = function() {
	currentFrameTime = document.getElementById('ft').value;
	console.log(currentFrameTime)
	if (!keyFrameTimes.includes(currentFrameTime)) {
		keyFrameTimes.push(currentFrameTime);
		keyFrameTimes.sort((a, b) => a - b);
	}
	console.log(keyFrameTimes)
	
}