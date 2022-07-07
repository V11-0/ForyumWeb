<template>
  <v-container>
    <v-btn to="/welcome" color="primary"> Fazer Login </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {}
</script>
