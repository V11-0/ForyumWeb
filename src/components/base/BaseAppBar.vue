<template>
  <v-app-bar color="indigo darken-4" app>
    <v-icon class="mr-2">mdi-account-voice</v-icon>
    <v-app-bar-title> Foryum </v-app-bar-title>

    <v-spacer />

    <div v-if="userModule.hasSession">
      <!-- <v-select dense :items="userModule.user?.Communities" item-text="Name" /> -->

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <!-- <div>Está logado</div> -->
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import UserModule from '@/store/modules/UserModule'
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component
export default class BaseAppBar extends Vue {
  userModule = getModule(UserModule, this.$store)
}
</script>
