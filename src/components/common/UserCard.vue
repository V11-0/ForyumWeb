<template>
    <v-card>
        <v-card-title>{{ user.username }}</v-card-title>
        <v-card-subtitle>
            <div>{{ user.country }}</div>
            <div>{{ user.posts.length }} postagens</div>
        </v-card-subtitle>
        <v-card-text>{{ user.bio }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { UserInfoDTO } from '@/models/dto/UserDTO'

@Component
export default class UserCard extends Vue {
    @Prop({ required: true }) user!: UserInfoDTO
}
</script>
