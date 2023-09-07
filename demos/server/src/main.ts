import fs from "fs";
import path from "path";
import express from "express";

const app = express();
app.listen(5555, () => console.log("Server started on port 5555"));
app.use(express.static(path.join(path.resolve(), "../vue/dist")));
app.use(express.json());

app.get("/api/todos", (req, res) => {
	const todos = JSON.parse(fs.readFileSync("data/todos.json", "utf-8"));
	res.json(todos);
});
app.post("/api/todos", (req, res) => {
	const todos = req.body;
	fs.writeFileSync("data/todos.json", JSON.stringify(todos));
	res.sendStatus(200);
});

createDataDir();
function createDataDir() {
	if (fs.existsSync("data")) return;
	fs.mkdir("data", (err) => console.error(err));
	fs.writeFileSync("data/todos.json", JSON.stringify([]));
}
