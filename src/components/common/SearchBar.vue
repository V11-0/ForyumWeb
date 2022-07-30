<template>
  <v-autocomplete
    v-model="selectedModel"
    label="Buscar"
    :items="recommendations"
    :loading="isLoading"
    :search-input.sync="searchModel"
    color="white"
    solo
    cache-items
    hide-no-data
    hide-details
    item-text="name"
    item-value="id"
    prepend-inner-icon="mdi-search-web"
    return-object
  >
    <template v-slot:item="data">
      <div class="mr-2" :class="textColor(data.item.type)">{{ data.item.name }}</div>
      <div class="text-caption text--secondary">{{ type(data.item.type) }}</div>
    </template>
  </v-autocomplete>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import SearchCompletion, { ResultType } from '@/models/dto/SearchCompletion'
import axiosInstance from '@/utils/AxiosInstance'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'

@Component
export default class SearchBar extends Vue {
  searchModel = ''
  selectedModel: SearchCompletion | null = null
  recommendations: Array<SearchCompletion> = []

  isLoading = false

  userModule = getModule(UserModule, this.$store)

  @Watch('selectedModel')
  onItemSelected (): void {
    if (this.selectedModel?.type === ResultType.Community) {
      this.$router.push(`/community/${this.selectedModel.id}`)
    } else if (this.selectedModel?.type === ResultType.User) {
      this.$router.push(`/user/${this.selectedModel.id}`)
    }
  }

  @Watch('searchModel')
  async search (val: string) {
    // Items have already been requested
    if (this.isLoading) return

    // Empty String
    if (!val) return

    this.isLoading = true

    const options = {
      params: { val: val },
      headers: { Authorization: `Bearer ${this.userModule.token}` }
    }

    const resp = await axiosInstance.get('/Search', options)

    this.recommendations = resp.data
    this.isLoading = false
  }

  textColor (type: ResultType): string | undefined {
    if (type === ResultType.User) {
      return 'primary--text'
    } else if (type === ResultType.Community) {
      return 'accent--text'
    }
  }

  type (type: ResultType): string | undefined {
    if (type === ResultType.User) {
      return 'Usuário'
    } else if (type === ResultType.Community) {
      return 'Comunidade'
    }
  }
}
</script>
