<template>
  <v-app>
    <BaseAppBar />

    <v-main>
      <router-view></router-view>
    </v-main>

    <BaseFooter />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import BaseAppBar from '@/components/base/BaseAppBar.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'

@Component({
  components: {
    BaseAppBar,
    BaseFooter
  }
})
export default class App extends Vue {}
</script>
