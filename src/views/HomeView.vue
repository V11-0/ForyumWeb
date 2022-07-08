<template>
  <v-container>
    <h1 class="text-h1">Página Inicial</h1>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {
  created (): void {
    // TODO: Obtain Posts
  }
}
</script>
