<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <RecommendedCommunities />
      </v-col>
      <v-col cols="8">
        <!-- TODO: Postagens ou aviso de sem posts -->
        lorem ipsum
      </v-col>
      <v-col cols="2"> lorem ipsum </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import UserApi from '@/api/UserApi'
import UserModule from '@/store/modules/UserModule'
import RecommendedCommunities from '@/components/home/RecommendedCommunities.vue'
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    RecommendedCommunities
  }
})
export default class HomeView extends Vue {
  userModule = getModule(UserModule, this.$store)

  async created (): Promise<void> {
    await this.fetchUser()
  }

  async fetchUser (): Promise<void> {
    if (this.userModule.session) {
      const user = await UserApi.getCurrentUser(this.userModule.token)
      this.userModule.setUser(user)
    }
  }
}
</script>
