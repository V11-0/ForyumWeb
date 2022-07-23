<template>
  <v-container>
    <ExpandedPost v-model="isPostExpanded" :post="selectedPost" />
    <v-row>
      <v-col cols="3">
        <CommunityCard :community="community" />
      </v-col>
      <v-col cols="6">
        <CreatePostButton :communityId="communityId" />

        <OrderPosts class="mb-6" @onOrderChange="fetchPosts" />

        <PostCard v-for="post in posts" :key="post.id" :post="post" @expand="expandPost" />
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
import PostCard from '@/components/common/post/PostCard.vue'
import CommunityCard from '@/components/home/CommunityCard.vue'
import ExpandedPost from '@/components/common/ExpandedPost.vue'

@Component({
  components: {
    CreatePostButton,
    OrderPosts,
    PostCard,
    CommunityCard,
    ExpandedPost
  }
})
export default class CommunityView extends Vue {
  @Prop({ required: true }) communityId!: number
  community: Community = Object()
  posts: Array<PostFeedDTO> = []

  userModule = getModule(UserModule, this.$store)

  isPostExpanded = false

  selectedPost: PostFeedDTO | null = null

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

  expandPost (post: PostFeedDTO): void {
    this.selectedPost = post
    this.isPostExpanded = true
  }
}
</script>
