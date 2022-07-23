<template>
  <v-card>
    <v-card-title>{{ community.name }}</v-card-title>
    <v-card-subtitle>
      <div>{{ community.userCount }} membros</div>
      <div>Criado por {{ community.creatorUsername }}</div>
    </v-card-subtitle>
    <v-card-text>{{ community.description }}</v-card-text>
    <v-card-actions class="px-4 pb-4">
      <span v-if="community.joined" class="text--secondary text-subtitle-2"
        >Você está nessa comunidade</span
      >
      <v-btn v-else color="primary" text @click="joinCommunity()">Entrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Community from '@/models/Community'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CommunityCard extends Vue {
  @Prop({ required: true }) community!: Community
}
</script>
