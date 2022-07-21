<template>
  <v-card outlined>
    <v-card-text class="d-flex justify-space-between align-center">
      <div>
        <span class="primary--text">{{ post.creatorUsername }}</span>
        em
        <span class="accent--text">{{ post.communityName }}</span>
      </div>

      <div>
        <span>{{ post.dateCreated }}</span>
      </div>
    </v-card-text>

    <v-card-title class="pt-0">
      {{ post.title }}
    </v-card-title>

    <v-card-text>
      {{ post.text }}
    </v-card-text>

    <v-card-actions>
      <div class="mr-4">
        <v-btn icon :color="upvoted ? 'deep-orange' : 'grey'" @click="upvote()">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>

        <span
          class="text-body-2"
          :class="upvoted ? 'deep-orange--text' : 'text--secondary'"
          >{{ upvotes }}</span
        >
      </div>

      <div>
        <v-btn icon :color="downvoted ? 'primary' : 'grey'" @click="downvote()">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>

        <span
          class="text-body-2"
          :class="downvoted ? 'primary--text' : 'text--secondary'"
          >{{ downvotes }}</span
        >
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import PostApi from '@/api/PostApi'
import { PostFeedDTO } from '@/models/dto/PostDTO'
import { VoteType } from '@/models/Vote'
import UserModule from '@/store/modules/UserModule'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component
export default class PostCard extends Vue {
  @Prop({ required: true }) post!: PostFeedDTO

  userModule = getModule(UserModule, this.$store)

  upvotedBeforeLoad = false
  downvotedBeforeLoad = false

  upvoted = false
  downvoted = false

  created (): void {
    if (this.post.userVote === VoteType.Upvote) {
      this.post.upvoteCount--
      this.upvotedBeforeLoad = true
      this.upvoted = true
    } else if (this.post.userVote === VoteType.Downvote) {
      this.post.downvoteCount--
      this.downvotedBeforeLoad = true
      this.downvoted = true
    }
  }

  async upvote (): Promise<void> {
    const api = new PostApi(this.userModule.token)

    if (this.upvoted) {
      this.upvoted = false
      await api.deleteVote(this.post.id)
    } else {
      this.downvoted = false
      this.upvoted = true
      await api.vote({ voteType: VoteType.Upvote, postId: this.post.id })
    }
  }

  async downvote (): Promise<void> {
    const api = new PostApi(this.userModule.token)

    if (this.downvoted) {
      this.downvoted = false
      await api.deleteVote(this.post.id)
    } else {
      this.upvoted = false
      this.downvoted = true
      await api.vote({ voteType: VoteType.Downvote, postId: this.post.id })
    }
  }

  get upvotes (): number {
    const votes = this.post.upvoteCount

    if (this.upvoted) {
      return votes + 1
    }

    return votes
  }

  get downvotes (): number {
    const votes = this.post.downvoteCount

    if (this.downvoted) {
      return votes + 1
    }

    return votes
  }
}
</script>
