<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-card-title>{{ community.name }}</v-card-title>
          <v-card-subtitle>
            <div>{{ community.userCount }} membros</div>
            <div>Criado por {{ community.creatorUsername }}</div>
          </v-card-subtitle>
          <v-card-text>{{ community.description }}</v-card-text>
          <v-card-actions class="px-4 pb-4">
            <span
              v-if="community.joined"
              class="text--secondary text-subtitle-2"
              >Você está nessa comunidade</span
            >
            <v-btn v-else color="primary" text @click="joinCommunity()"
              >Entrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <CreatePostButton :communityId="communityId" />

        <OrderPosts class="mb-6" @onOrderChange="fetchPosts" />

        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="mb-4"
        />
      </v-col>
      <v-col cols="3"> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import CreatePostButton from '@/components/common/CreatePostButton.vue'
import { PostOrdenation } from '@/models/PostOrdenation'
import PostApi from '@/api/PostApi'
import { PostFeedDTO } from '@/models/dto/PostDTO'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'
import CommunityApi from '@/api/CommunityApi'
import Community from '@/models/Community'
import OrderPosts from '@/components/common/OrderPosts.vue'
import PostCard from '@/components/common/PostCard.vue'

@Component({
  components: {
    CreatePostButton,
    OrderPosts,
    PostCard
  }
})
export default class CommunityView extends Vue {
  @Prop({ required: true }) communityId!: number
  community: Community = Object()
  posts: Array<PostFeedDTO> = []

  userModule = getModule(UserModule, this.$store)

  async created (): Promise<void> {
    const api = new CommunityApi(this.userModule.token)
    this.community = await api.getCommunity(this.communityId)
    await this.fetchPosts(1)

    const community = this.userModule.user?.communities?.find(
      (c) => c.name === this.community.name
    )
    this.$set(this.community, 'joined', !!community)
  }

  async joinCommunity (): Promise<void> {
    const api = new CommunityApi(this.userModule.token)
    await api.joinCommunity(this.communityId)
  }

  async fetchPosts (orderByValue: number): Promise<void> {
    const orderBy = PostOrdenation[orderByValue]
    const api = new PostApi(this.userModule.token)
    this.posts = await api.getCommunityPosts(this.communityId, orderBy)
  }
}
</script>
