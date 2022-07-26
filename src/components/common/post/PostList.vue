<template>
  <div>
    <ExpandedPost v-model="isPostExpanded" :post="selectedPost" />

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @expand="expandPost"
    />

    <span v-if="posts.length === 0" class="text-h2">
        Não há postagens para mostrar
    </span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { PostFeedDTO } from '@/models/dto/PostDTO'

import ExpandedPost from '@/components/common/ExpandedPost.vue'
import PostCard from '@/components/common/post/PostCard.vue'

@Component({
  components: {
    ExpandedPost,
    PostCard
  }
})
export default class PostList extends Vue {
  @Prop({ required: true }) posts!: Array<PostFeedDTO>

  isPostExpanded = false

  selectedPost: PostFeedDTO | null = null

  expandPost (post: PostFeedDTO): void {
    this.selectedPost = post
    this.isPostExpanded = true
  }
}
</script>
