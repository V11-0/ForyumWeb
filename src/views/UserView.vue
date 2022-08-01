<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <UserCard :user="user" />
      </v-col>
      <v-col>
        <v-tabs v-model="tabModel">
          <v-tab>Postagens</v-tab>
          <v-tab>Comunidades</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabModel">
          <v-tab-item>
            <v-container>
              <PostList :posts="user.posts" />
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <div v-if="user.communities.length > 0">
                <span>Comunidaes em que {{ user.username }} participa</span>

                <v-card
                  v-for="community in user.communities"
                  :key="community.id"
                >
                  <CommunityCard class="my-4" :community="community" />
                </v-card>
              </div>
              <div v-else class="text-h2">
                Esse usuário não participa de nenhuma comunidade
              </div>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="3">
        <SearchBar />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import { getModule } from 'vuex-module-decorators'

import UserApi from '@/api/UserApi'
import UserModule from '@/store/modules/UserModule'

import { UserInfoDTO } from '@/models/dto/UserDTO'

import SearchBar from '@/components/common/SearchBar.vue'
import PostList from '@/components/common/post/PostList.vue'
import CommunityCard from '@/components/home/CommunityCard.vue'
import UserCard from '@/components/common/UserCard.vue'

@Component({
  components: {
    SearchBar,
    PostList,
    CommunityCard,
    UserCard
  }
})
export default class UserView extends Vue {
  @Prop({ required: true }) userId!: number
  user: UserInfoDTO = Object()

  tabModel = 0

  userModule = getModule(UserModule, this.$store)

  async created () {
    await this.fetchUser()
  }

  async fetchUser () {
    this.user = await UserApi.getUser(this.userId, this.userModule.token)

    const userCommunities = this.userModule.user?.communities

    if (userCommunities) {
      const userCommunitiesIds = userCommunities.map((c) => c.id)

      this.user.communities.forEach((c) => {
        if (userCommunitiesIds.includes(c.id)) {
          this.$set(c, 'joined', true)
        } else this.$set(c, 'joined', false)
      })
    } else {
      this.user.communities.forEach((c) => this.$set(c, 'joined', false))
    }
  }

  @Watch('userId')
  async onUserChanged () {
    await this.fetchUser()
  }
}
</script>
