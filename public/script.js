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

// delete button

$('.delete').on('click', (e) => {
	let id = e.target.parentNode.id;
	fetch(`./api/deleteItem/${id}`, {
		method: 'DELETE'
	}).then(() => {
		$(`#${id}`).remove();
	});
});

// $('.delete').on('click', (e) => {
// 	let id = e.target.parentNode.id;
// 	fetch(`./api/deleteItem/${id}`, {
// 		method: 'POST'
// 	}).then(() => {
// 		$('#todoList').append();
// 	});
// });