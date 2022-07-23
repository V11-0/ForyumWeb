<template>
  <v-container>
    <ExpandedPost v-model="isPostExpanded" :post="selectedPost" />

    <v-row>
      <v-col cols="3">
        <RecommendedCommunities />
      </v-col>
      <v-col cols="6">
        <CreatePostButton />

        <OrderPosts class="mb-6" @onOrderChange="fetchPosts" />

        <PostCard v-for="post in posts" :key="post.id" :post="post" @expand="expandPost" />
      </v-col>
      <v-col cols="3">
        <!-- TODO Search Bar -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import UserApi from '@/api/UserApi'
import UserModule from '@/store/modules/UserModule'
import RecommendedCommunities from '@/components/home/RecommendedCommunities.vue'
import CreatePostButton from '@/components/common/CreatePostButton.vue'
import OrderPosts from '@/components/common/OrderPosts.vue'
import PostCard from '@/components/common/post/PostCard.vue'
import ExpandedPost from '@/components/common/ExpandedPost.vue'

import { PostFeedDTO } from '@/models/dto/PostDTO'
import { PostOrdenation } from '@/models/PostOrdenation'
import PostApi from '@/api/PostApi'

@Component({
  components: {
    RecommendedCommunities,
    CreatePostButton,
    OrderPosts,
    PostCard,
    ExpandedPost
  }
})
export default class HomeView extends Vue {
  userModule = getModule(UserModule, this.$store)
  posts: Array<PostFeedDTO> = []

  isPostExpanded = false

  selectedPost: PostFeedDTO | null = null

  async created (): Promise<void> {
    await this.fetchUser()
    await this.fetchPosts(1)
  }

  async fetchUser (): Promise<void> {
    if (this.userModule.session) {
      const user = await UserApi.getCurrentUser(this.userModule.token)
      this.userModule.setUser(user)
    }
  }

  async fetchPosts (orderByValue: number): Promise<void> {
    const orderBy = PostOrdenation[orderByValue]
    const api = new PostApi(this.userModule.token)
    this.posts = await api.getFeed(orderBy)
  }

  expandPost (post: PostFeedDTO): void {
    this.selectedPost = post
    this.isPostExpanded = true
  }
}
</script>
