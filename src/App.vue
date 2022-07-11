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
import UserModule from './store/modules/UserModule'
import { getModule } from 'vuex-module-decorators'
import UserApi from './api/UserApi'

@Component({
  components: {
    BaseAppBar,
    BaseFooter
  }
})
export default class App extends Vue {
  userModule = getModule(UserModule, this.$store)

  async created (): Promise<void> {
    if (this.userModule.session) {
      const token = this.userModule.session.token
      const user = await UserApi.getCurrentUser(token)
      this.userModule.setUser(user)
    }
  }
}
</script>
