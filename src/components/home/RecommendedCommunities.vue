<template>
  <div>
    <h6 class="text-h6 mb-2">Descubra comunidades</h6>
    <v-list>
      <v-list-item
        three-line
        v-for="item in communities"
        :key="item.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >{{ item.userCount }} membros</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            color="primary"
            text
            @click="joinCommunity(item.id)"
            :disabled="item.joined"
            >{{ item.joined ? 'Entrou' : 'Entrar' }}</v-btn
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import CommunityApi from '@/api/CommunityApi'
import Community from '@/models/Community'
import UserModule from '@/store/modules/UserModule'
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component
export default class RecommendedCommunities extends Vue {
  communities: Array<Community> = []
  userModule = getModule(UserModule, this.$store)

  async created (): Promise<void> {
    await this.fetchRecommendedCommunities()
  }

  async fetchRecommendedCommunities (): Promise<void> {
    this.communities = await CommunityApi.fetchRecommendedCommunities(
      this.userModule.token
    )
    const userCommunities = this.userModule.user?.communities

    if (userCommunities) {
      const userCommunitiesIds = userCommunities.map((c) => c.id)

      this.communities.forEach((c) => {
        if (userCommunitiesIds.includes(c.id)) {
          this.$set(c, 'joined', true)
        } else this.$set(c, 'joined', false)
      })
    } else {
      this.communities.forEach((c) => this.$set(c, 'joined', false))
    }
  }

  async joinCommunity (communityId: number): Promise<void> {
    await CommunityApi.joinCommunity(this.userModule.token, communityId)
    const community = this.communities.find(
      (c) => c.id === communityId
    )

    if (community) {
      this.$set(community, 'joined', true)
    }
  }
}
</script>
