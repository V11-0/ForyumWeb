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
import { Vue, Component, Prop } from 'vue-property-decorator'
import CommunityApi from '@/api/CommunityApi'
import Community from '@/models/Community'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'

@Component
export default class CommunityCard extends Vue {
  @Prop({ required: true }) community!: Community

  userModule = getModule(UserModule, this.$store)

  async joinCommunity (): Promise<void> {
    const api = new CommunityApi(this.userModule.token)
    await api.joinCommunity(this.community.id)

    this.community.joined = true

    if (this.community.userCount) {
      this.community.userCount++
    } else this.community.userCount = 1

    this.userModule.addCommunity(this.community)
  }
}
</script>
