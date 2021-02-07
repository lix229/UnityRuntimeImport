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
	if (animObj.style.animationPlayState === 'paused') {
		animObj.style.animationPlayState = 'running';
	}
	else {
		animObj.style.animationPlayState = 'paused';
	}
}
