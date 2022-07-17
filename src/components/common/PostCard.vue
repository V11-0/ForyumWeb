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
    </v-card>
</template>

<script lang="ts">
import { PostFeedDTO } from '@/models/dto/PostDTO'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class PostCard extends Vue {
    @Prop({ required: true }) post!: PostFeedDTO
}
</script>
