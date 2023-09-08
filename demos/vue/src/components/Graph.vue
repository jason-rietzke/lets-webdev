<script setup lang="ts">
import type { TODOItem } from "../types";
import { ref, computed, onMounted } from "vue";

defineProps<{ todos: TODOItem[] }>();

<template>
	<h1>Graph</h1>
</template>
