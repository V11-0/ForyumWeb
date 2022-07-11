<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="primary" size="36">
          <span class="white--text text-h6">{{ initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <h3>{{ user.username }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="onLogout()"> Desconectar </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import UserApi from '@/api/UserApi'
import User from '@/models/User'
import UserModule from '@/store/modules/UserModule'
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component
export default class BaseProfileMenu extends Vue {
  userModule = getModule(UserModule, this.$store)

  get user (): User {
    return this.userModule.user!
  }

  get initials (): string {
    const username = this.user.username
    return username.slice(0, 2)
  }

  async onLogout (): Promise<void> {
    const token = this.userModule.session?.token

    if (token) {
      await UserApi.logout(token)

      this.userModule.setUser(null)
      this.userModule.setSession(null)

      this.$router.push('/welcome')
    }
  }
}
</script>
