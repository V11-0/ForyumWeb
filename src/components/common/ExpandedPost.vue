<template>
  <v-dialog v-model="model" width="1200px">
    <v-card>
      <PostCardContent :post="post" :key="key" />

      <v-card-text class="pa-0">
        <v-textarea
          v-model="commentModel"
          label="Comente Algo"
          color="primary"
          class="px-4"
          rows="1"
          append-icon="mdi-send"
          @click:append="createComment()"
          auto-grow
          filled
        />

        <v-treeview :items="comments" item-children="subComments">
          <template v-slot:label="{ item }">
            <div>
              <a>
                <span
                  @click.stop="$router.push(`/user/${item.creatorUserId}`)"
                  class="primary--text"
                  >{{ item.creatorUsername }}</span
                >
              </a>
            </div>

            <div class="mb-2">
              <span class="text--secondary">{{ item.dateCreated }}</span>
            </div>

            <div class="mb-3" style="white-space: pre;">
              {{ item.text }}
              <v-btn icon @click="$set(item, 'showReply', !item.showReply)">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
            </div>

            <v-expand-transition>
              <div v-show="item.showReply">
                <div class="d-flex align-start justify-start">
                  <v-textarea
                    v-model="item.commentModel"
                    label="Comente Algo"
                    color="primary"
                    rows="1"
                    append-icon="mdi-send"
                    @click:append="
                      createComment(item.id, item.commentModel)
                      item.showReply = false
                    "
                    auto-grow
                    filled
                  />
                </div>
              </div>
            </v-expand-transition>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { PostFeedDTO } from '@/models/dto/PostDTO'
import { CommentDTO, CommentCreationDTO } from '@/models/dto/CommentDTO'

import PostCardContent from '@/components/common/post/PostCardContent.vue'
import PostApi from '@/api/PostApi'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'

@Component({
  components: {
    PostCardContent
  }
})
export default class ExpandedPost extends Vue {
  @Prop({ required: true }) post!: PostFeedDTO
  @Prop() value!: boolean

  userModule = getModule(UserModule, this.$store)
  api = new PostApi(this.userModule.token)

  comments: Array<CommentDTO> = []
  commentModel = ''

  key = 0

  @Watch('post')
  async onPostChange (): Promise<void> {
    this.comments = []

    this.key++

    this.comments = await this.api.getComments(this.post.id)
  }

  async createComment (parentId?: number, replyComment?: string) {
    let text
    const userId = this.userModule.user?.id

    if (parentId) {
      text = replyComment!
    } else {
      text = this.commentModel
    }

    const comment: CommentCreationDTO = {
      PostId: this.post.id,
      CreatorUserId: userId!,
      Text: text,
      ParentCommentId: parentId
    }

    await this.api.createComment(comment)
    this.onPostChange()
    this.commentModel = ''
  }

  get model (): boolean {
    return this.value
  }

  set model (value: boolean) {
    this.$emit('input', value)
  }
}
</script>
