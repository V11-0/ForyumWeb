<template>
  <v-container>
    <h1 class="text-h1">Página Inicial</h1>
  </v-container>
</template>

<script lang="ts">
import UserApi from '@/api/UserApi'
import UserModule from '@/store/modules/UserModule'
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component
export default class HomeView extends Vue {
  userModule = getModule(UserModule, this.$store)

  async created (): Promise<void> {
    await this.fetchUser()
  }

  async fetchUser (): Promise<void> {
    if (this.userModule.session) {
      const token = this.userModule.session.token
      const user = await UserApi.getCurrentUser(token)
      this.userModule.setUser(user)
    }
  }
}
</script>
