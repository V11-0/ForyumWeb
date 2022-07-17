<template>
  <v-btn-toggle v-model="selected" borderless color="primary">
    <v-btn :value="1">
      <v-icon left> mdi-alert-decagram </v-icon>
      <span class="hidden-sm-and-down">Novo</span>
    </v-btn>

    <v-btn :value="2">
      <v-icon left> mdi-fire </v-icon>
      <span class="hidden-sm-and-down">Mais votados</span>
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class OrderPosts extends Vue {
  selected = 1

  @Watch('selected')
  onChange (): void {
    this.$emit('onOrderChange', this.selected)
  }
}
</script>
