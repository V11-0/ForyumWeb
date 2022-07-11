<template>
  <v-app-bar color="indigo darken-4" app>
    <v-icon class="mr-2">mdi-account-voice</v-icon>
    <v-app-bar-title> Foryum </v-app-bar-title>

    <v-spacer />

    <div v-if="userModule.hasUser">
      <BaseProfileMenu />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'
import BaseProfileMenu from '@/components/base/BaseProfileMenu.vue'

@Component({
  components: {
    BaseProfileMenu
  }
})
export default class BaseAppBar extends Vue {
  userModule = getModule(UserModule, this.$store)
}
</script>
