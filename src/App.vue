<template>
	<v-app>

		<BaseAppBar />

		<v-main>
			<router-view></router-view>
		</v-main>

		<BaseFooter />
	</v-app>
</template>

<script setup lang="ts">
import BaseAppBar from './components/base/BaseAppBar.vue'
import BaseFooter from './components/base/BaseFooter.vue'
</script>
