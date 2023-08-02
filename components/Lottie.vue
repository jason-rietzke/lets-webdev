<template>
	<Vue3Lottie
		v-if="animationData"
		class="background"
		:animation-data="animationData"
		:height="'100%'"
		:width="'100%'"
	/>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from "vue";

import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";

const animationData = ref<any>(null);
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
});
onMounted(() => {
	fetch(`./anim/${props.name}.json`)
		.then((res) => res.json())
		.then((data) => {
			animationData.value = data;
		});
});
watch(
	() => props.name,
	() => {
		fetch(`./anim/${props.name}.json`)
			.then((res) => res.json())
			.then((data) => {
				animationData.value = data;
			});
	}
);
</script>
