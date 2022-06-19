<template>
	<v-app>

		<BaseAppBar />

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseAppBar from './components/base/BaseAppBar.vue'

export default defineComponent({
	name: 'App',

	components: {
		BaseAppBar
	},

	data() {
		return {
			//
		}
	},
})
</script>
