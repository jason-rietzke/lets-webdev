<script setup lang="ts">
import type { TODOItem } from "../types";
import { ref, computed, watch, onMounted } from "vue";
import { ForceSimulation, Graph, Node } from "@livereader/graphly-d3";
import GraphlyD3 from "@livereader/graphly-d3/component/vue3";
import "@livereader/graphly-d3/style.css";
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

function renderGraph() {
	simulation.value.draggableNodes;
	graph.links = [];
	graph.nodes = [
		{
			id: "done",
			shape: {
				type: "demo-hexagon",
				scale: 1,
				url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/1.1.1",
			},
			anchor: {
				type: "soft",
				x: 0,
				y: 0,
			},
			payload: {
				title: "Done",
				color: green,
			},
		},
		{
			id: "notdone",
			shape: {
				type: "demo-hexagon",
				scale: 1,
				url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/1.1.1",
			},
			anchor: {
				type: "soft",
				x: 0,
				y: 0,
			},
			payload: {
				title: "Not Done",
				color: red,
			},
		},
	];
	props.todos.forEach((todo) => {
		graph.nodes.push({
			id: todo.id.toString(),
			shape: {
				type: "checkmark",
				scale: 1,
			},
			spawn: {
				source: todo.done ? "done" : "notdone",
				angle: Math.random() * 360,
				distance: 150,
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
	if (node.id === "done" || node.id === "notdone") return;
	emit("toggle", parseFloat(node.id));
}

onMounted(() => {
	simulation.value.templateStore.add("checkmark", Checkmark);
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
	<GraphlyD3 ref="graphly" class="graphly-canvas" @node-click="nodeClick" />
</template>
