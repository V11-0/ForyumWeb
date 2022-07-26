<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <CommunityCard :community="community" />
      </v-col>
      <v-col cols="6">
        <CreatePostButton :communityId="communityId" />

        <OrderPosts class="mb-6" @onOrderChange="fetchPosts" />

        <PostList :posts="posts" />
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
import PostList from '@/components/common/post/PostList.vue'
import CommunityCard from '@/components/home/CommunityCard.vue'

@Component({
  components: {
    CreatePostButton,
    OrderPosts,
    CommunityCard,
    PostList
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

  async fetchPosts (orderByValue: number): Promise<void> {
    const orderBy = PostOrdenation[orderByValue]
    const api = new PostApi(this.userModule.token)
    this.posts = await api.getCommunityPosts(this.communityId, orderBy)
  }
}
</script>
