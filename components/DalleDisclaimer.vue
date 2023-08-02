<template>
	<div
		style="position: absolute; bottom: 0; margin-right: 1rem; margin-left: 1rem"
		:style="{
			right: props.position == 'right' ? 0 : 'auto',
			left: props.position == 'left' ? 0 : 'auto',
		}"
	>
		<p style="font-size: 0.6rem">
			This image was created using
			<a href="https://openai.com/dall-e-2/" target="_blank">OpenAIs DALL•E 2</a>
		</p>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
	position: "left" | "right";
}>();
</script>

<style scoped></style>
