<script setup lang="ts">
import type { TODOItem } from "../types";
import { ref, computed, watch, onMounted } from "vue";
import { ForceSimulation, Graph, Node } from "@livereader/graphly-d3";
import GraphlyD3 from "@livereader/graphly-d3/component/vue3";
import "@livereader/graphly-d3/style.css";
import Anchor from "../templates/anchor";
import Checkmark from "../templates/checkmark";

const props = defineProps<{ todos: TODOItem[] }>();
const emit = defineEmits(["toggle"]);
const graphly = ref<typeof GraphlyD3>({} as typeof GraphlyD3);

const green = "#81c784";
const red = "#e57373";

const simulation = computed<ForceSimulation>(() => graphly.value.simulation);
const graph: Graph = {
	nodes: [],
	links: [],
};
const positions: Map<string, { x: number; y: number }> = new Map();
let showDone = true;
let showNotDone = true;

function renderGraph() {
	simulation.value.draggableNodes;
	graph.links = [];
	graph.nodes = [
		{
			id: "done",
			shape: {
				type: "anchor",
				scale: 1,
			},
			x: 150,
			y: 0,
			anchor: {
				type: "soft",
				x: 150,
				y: 0,
			},
			payload: {
				title: "Done",
				show: showDone,
				color: green,
			},
		},
		{
			id: "notdone",
			shape: {
				type: "anchor",
				scale: 1,
			},
			anchor: {
				type: "soft",
				x: 0,
				y: 0,
			},
			payload: {
				title: "Not Done",
				show: showNotDone,
				color: red,
			},
		},
	];
	props.todos.forEach((todo) => {
		const prevPos = positions.get(todo.id.toString());
		if (todo.done && !showDone) return;
		if (!todo.done && !showNotDone) return;
		graph.nodes.push({
			id: todo.id.toString(),
			shape: {
				type: "checkmark",
				scale: 1,
			},
			x: prevPos?.x,
			y: prevPos?.y,
			spawn: prevPos
				? undefined
				: {
						source: todo.done ? "done" : "notdone",
						angle: Math.random() * 180 + (todo.done ? 0 : 180),
						distance: 400,
				  },
			payload: {
				done: todo.done,
			},
		});
		graph.links.push({
			source: todo.done ? "done" : "notdone",
			target: todo.id.toString(),
			directed: true,
		});
	});
	simulation.value.render(graph, 0.5);
}

function nodeClick(e: any, node: Node) {
	if (node.id === "done") {
		showDone = !showDone;
	} else if (node.id === "notdone") {
		showNotDone = !showNotDone;
	} else {
		emit("toggle", parseFloat(node.id));
	}
	renderGraph();
}
function nodeDragEnd(e: any, node: Node, pos: { x: number; y: number }) {
	positions.set(node.id, pos);
}

function handleTick() {
	graph.nodes.forEach((node) => {
		positions.set(node.id, { x: node.x ?? 0, y: node.y ?? 0 });
	});
}

onMounted(() => {
	simulation.value.templateStore.add("checkmark", Checkmark);
	simulation.value.templateStore.add("anchor", Anchor);
	renderGraph();
});
watch(
	() => props.todos,
	() => renderGraph(),
	{ deep: true }
);
</script>

<template>
	<h1>Graph</h1>
	<GraphlyD3
		ref="graphly"
		class="graphly-canvas"
		:env-gravity="0"
		@node-click="nodeClick"
		@node-drag-end="nodeDragEnd"
		@simulation-tick="handleTick"
	/>
</template>
