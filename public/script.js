function test() {
	fetch('./api/getItems').then((response) => {
		response.json().then((text) => {
			console.log(text);
			for (let i = 0; i < text.length; i++) {
			}
		});
	});
}

test();