<template>
  <v-dialog v-model="model" width="1200px">
    <v-card>
      <PostCardContent :post="post" :key="key" />

      <v-card-text>
        <!-- TODO: Comentários -->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { PostFeedDTO } from '@/models/dto/PostDTO'

import PostCardContent from '@/components/common/post/PostCardContent.vue'

@Component({
  components: {
    PostCardContent
  }
})
export default class ExpandedPost extends Vue {
  @Prop({ required: true }) post!: PostFeedDTO
  @Prop() value!: boolean

  key = 0

  @Watch('post')
  onPostChange (): void {
    this.key++
  }

  get model (): boolean {
    return this.value
  }

  set model (value: boolean) {
    this.$emit('input', value)
  }
}
</script>
