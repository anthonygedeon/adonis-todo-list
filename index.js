/*
- keypress event represents a character being typed that can be used for input, such as 'a', 'D', '£', '©', and so on.  
- keydown and keyup events represent ANY keys being typed, which includes things like backspace, tab, up, down, home, end, and so on.
*/

const MAP = {
	Alt: 'alt',
	Control: 'ctrl',
	Shift: 'shift',
};

function trackKeysPressed(keys) {
	const whatIsPressed = {};

	for (let key of keys) {
		whatIsPressed[key] = false;
	}

	return function (keyPressed) {
		whatIsPressed[keyPressed] = true;

		return whatIsPressed;
	};
}

function combo(combination, callback) {

	const keys = combination.split('+');

	const track = trackKeysPressed(keys);

	window.addEventListener('keydown', (event) => {

		const isAllKeysPressed = track(MAP[event.key]);

		let pressedTracker = Object.values(isAllKeysPressed).filter(
			(pressed) => !pressed
        );
        
		if (pressedTracker.length === 0) {
            callback(event);
		}
	});
}

combo('ctrl+shift+alt', (event) => {
	console.log('ctrl shift alt was pressed');
});

combo('ctrl+shift+t', (event) => {
	console.log('ctrl shift t was pressed');
});
