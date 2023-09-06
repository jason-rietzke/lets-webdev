import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw Error("App not found");
const list = document.querySelector<HTMLDivElement>("#list")!;
if (!list) throw Error("List not found");

const input = document.querySelector<HTMLInputElement>("#input");
if (!input) throw Error("List not found");
const add = document.querySelector<HTMLButtonElement>("#add");
if (!add) throw Error("List not found");

type ListItem = {
	id: number;
	text: string;
	done: boolean;
};

let items: ListItem[] = [{
	id: 0,
	text: "Hello World",
	done: true,
}];
renderList(items);

add.addEventListener("click", () => {
	if (!input.value) return;
	const text = input.value;
	input.value = "";
	items.push({
		id: items.length,
		text: text,
		done: false,
	});
	renderList(items);
	input.focus();
});
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") add.click();
});

function renderList(items: ListItem[]) {
	list.innerHTML = "";
	for (let i = 0; i < items.length; i++) {
		const item = document.createElement("li");
		item.style.display = "flex";
		item.style.alignItems = "center";
		list.appendChild(item);

		const text = document.createElement("span");
		text.innerText = `${items[i].done ? "✅" : "⭕️"} ${items[i].text}`;
		text.addEventListener("click", () => {
			items[i].done = !items[i].done;
			renderList(items);
		});
		item.appendChild(text);

		const bin = document.createElement("button");
		bin.innerText = "🗑️";
		bin.style.marginLeft = "auto";
		bin.addEventListener("click", () => {
			items.splice(i, 1);
			renderList(items);
		});
		item.appendChild(bin);
	}
}
