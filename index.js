const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();

app.options('*', cors());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const PORT = process.env.PORT || 4000;
const HOST = "localhost";

// The dotenv library will read from your .env file into these values on `process.env`
const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;

// POST request
// POST Title, Date
// Functionality: make a database entry in Notion.
app.post('/submitFormToNotion', jsonParser, async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// req.body
	const title = req.body.title;
	const date = req.body.date;

	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				Title: {
					title: [
						{
							text: {
								content: title
							}
						}
					]
				}
			}
		});
		console.log(response);
		console.log("SUCCESS!");
	} catch(error) {
		console.log( error );
	}
});

app.listen( PORT, HOST, () => {
	console.log("Starting proxy at " + HOST + ":" + PORT );
});