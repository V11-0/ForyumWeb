<template>
  <v-card>
    <v-card-title>{{ user.username }}</v-card-title>
    <v-card-subtitle>
      <div>{{ user.country }}</div>
      <div>{{ user.posts.length }} postagens</div>
    </v-card-subtitle>
    <v-card-text>
        {{ user.bio }}
        <v-btn v-if="isCurrentUser" icon @click="showBioField = !showBioField">
            <v-icon>mdi-account-edit</v-icon>
        </v-btn>
    </v-card-text>

    <v-expand-transition>
        <v-card-text v-show="showBioField">
            <v-text-field
                v-model="bio"
                append-icon="mdi-content-save"
                @click:append="saveBio"
            />
        </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { UserInfoDTO } from '@/models/dto/UserDTO'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'
import axiosInstance, { getAuthHeader } from '@/utils/AxiosInstance'

@Component
export default class UserCard extends Vue {
  @Prop({ required: true }) user!: UserInfoDTO

  userModule = getModule(UserModule, this.$store)

  showBioField = false

  bio = ''

  created () {
    this.bio = this.user.bio
  }

  async saveBio () {
    await axiosInstance.put('/User', { bio: this.bio }, getAuthHeader(this.userModule.token))
    this.user.bio = this.bio
  }

  get isCurrentUser (): boolean {
    if (this.userModule.user?.username === this.user.username) {
      return true
    }

    return false
  }
}
</script>
