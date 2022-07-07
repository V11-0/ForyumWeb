<template>
  <v-card>
    <v-list-item class="py-4" link @click="expandCard">
      <v-list-item-title class="text-h6">
        <slot name="title"></slot>
      </v-list-item-title>
    </v-list-item>

    <v-expand-transition>
      <div v-show="expanded">
        <slot name="expanded"></slot>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ExpandableCard extends Vue {
  expanded = false

  expandCard (): void {
    this.expanded = !this.expanded
  }
}
</script>
