<template>
	<div :style="{ width: props.width }">
		<v-timeline :theme="theme">
			<v-timeline-item v-for="item in props.items">{{ item }}</v-timeline-item>
		</v-timeline>
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
const theme = ref("dark");

const props = defineProps({
	width: {
		type: String,
		default: "100%",
	},
	items: {
		type: Array,
		required: true,
	},
});

function callback(mutationList) {
	mutationList.forEach(function (mutation) {
		if (mutation.type === "attributes" && mutation.attributeName === "class") {
			const mode = document.getElementsByTagName("html")[0].classList[0];
			theme.value = mode;
		}
	});
}
const observer = new MutationObserver(callback);
observer.observe(document.getElementsByTagName("html")[0], { attributes: true });
theme.value = document.getElementsByTagName("html")[0].classList[0] || "dark";
</script>

<style scoped></style>
