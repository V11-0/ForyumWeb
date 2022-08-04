<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <CommunityCard :community="community" />
      </v-col>
      <v-col cols="6">
        <CreatePostButton :communityId="communityId" />

        <!-- <OrderPosts class="mb-6" @onOrderChange="updateCommunity" /> -->

        <PostList :posts="posts" />
      </v-col>
      <v-col cols="3"> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import CreatePostButton from '@/components/common/CreatePostButton.vue'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'
import CommunityApi from '@/api/CommunityApi'
import Community from '@/models/Community'
import OrderPosts from '@/components/common/OrderPosts.vue'
import PostList from '@/components/common/post/PostList.vue'
import CommunityCard from '@/components/home/CommunityCard.vue'
import { PostFeedDTO } from '@/models/dto/PostDTO'

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

    if (this.community.posts) {
      this.posts = this.community.posts
    }

    if (this.community.creatorUserId === this.userModule.user?.id) {
      this.$set(this.community, 'joined', true)
    }

    const community = this.userModule.user?.communities?.find(
      (c) => c.id === +this.communityId
    )

    if (community) {
      this.$set(this.community, 'joined', true)
    }
  }
}
</script>
