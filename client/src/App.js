import './App.css';
import { useState } from 'react';

function App() {
	const [title, setTitle] = useState("");

	function submitFormToNotion() {
		fetch("http://localhost:4000/submitFormToNotion", {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: title
			})
		}).then( response => response.json())
		.then(data => {
			console.log('Success! ', data);
		}).catch((error) => {
			console.log('Error: ', error);
		});
	}

	return (
		<div className="App">
			<div style={{maxWidth: "500px", margin: "0 auto"}}>
				<label htmlFor="title">Title: </label>
				<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div>
				<button onClick={submitFormToNotion}>Send</button>
			</div>
		</div>
	);
}

export default App;
