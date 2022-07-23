<template>
  <v-card @click="expandPost()" outlined class="mb-4">
    <PostCardContent :post="post" />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { PostFeedDTO } from '@/models/dto/PostDTO'

import PostCardContent from '@/components/common/post/PostCardContent.vue'

@Component({
  components: {
    PostCardContent
  }
})
export default class PostCard extends Vue {
  @Prop({ required: true }) post!: PostFeedDTO

  expandPost (): void {
    this.$emit('expand', this.post)
  }
}
</script>
