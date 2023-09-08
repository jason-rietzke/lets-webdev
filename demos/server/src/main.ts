import fs from "fs";
import path from "path";
import express from "express";
import { WebSocketServer, type WebSocket } from "ws";

const app = express();
const server = app.listen(5555, () => console.log("Server started on port 5555"));
app.use(express.static(path.join(path.resolve(), "../vue/dist")));
app.use(express.json());

const clients = new Map<number, WebSocket>();
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
	const id = Math.random();
	clients.set(id, ws);
	ws.on("close", () => clients.delete(id));
});

setInterval(() => {
	clients.forEach((ws) => ws.ping());
}, 5000);

app.get("/api/todos", (req, res) => {
	const todos = JSON.parse(fs.readFileSync("data/todos.json", "utf-8"));
	res.json(todos);
});
app.post("/api/todos", (req, res) => {
	const todos = req.body;
	fs.writeFileSync("data/todos.json", JSON.stringify(todos));
	res.sendStatus(200);
	clients.forEach((ws) => ws.send(JSON.stringify(todos)));
});

createDataDir();
function createDataDir() {
	if (fs.existsSync("data")) return;
	fs.mkdir("data", (err) => console.error(err));
	fs.writeFileSync("data/todos.json", JSON.stringify([]));
}
