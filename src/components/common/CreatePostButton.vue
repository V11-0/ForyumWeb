<template>
  <v-dialog v-model="dialogModel" persistent :max-width="1200">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field filled v-bind="attrs" v-on="on" label="Postar" readonly />
    </template>

    <DialogCreateCommunity v-model="createCommunityModel" />

    <v-card>
      <v-card-title>Criar nova postagem</v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <v-row>
            <v-col>
              <v-select
                label="Comunidade"
                v-model="communityIdModel"
                :items="communities"
                item-value="id"
                item-text="name"
                :rules="requiredRule"
              />
              <v-btn
                outlined
                small
                color="primary"
                @click="openCreateCommunityDialog"
              >
                Criar Comunidade
              </v-btn>
            </v-col>
            <v-col>
              <v-text-field
                v-model="titleModel"
                label="Título"
                counter
                maxlength="100"
                :rules="requiredRule"
              />
              <v-textarea v-model="textModel" label="Texto" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn @click="dialogModel = false" text> Fechar </v-btn>

        <v-spacer />

        <v-btn @click="onSubmit()" color="primary" text :loading="loading">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import Community from '@/models/Community'
import Post from '@/models/Post'
import UserModule from '@/store/modules/UserModule'
import PostApi from '@/api/PostApi'
import DialogCreateCommunity from '@/components/common/DialogCreateCommunity.vue'

@Component({
  components: {
    DialogCreateCommunity
  }
})
export default class CreatePostButton extends Vue {
  @Prop() communityId!: string

  communityIdModel = 0
  titleModel = ''
  textModel = ''

  requiredRule = [(s: string) => !!s || 'Não pode ser vazio']

  dialogModel = false
  createCommunityModel = false

  userModule = getModule(UserModule, this.$store)
  api: PostApi = new PostApi(this.userModule.token)

  // Ui
  loading = false

  created (): void {
    if (this.communityId) {
      this.communityIdModel = +this.communityId
    }
  }

  async onSubmit (): Promise<void> {
    this.loading = true

    if (this.typedForm().validate()) {
      const post: Post = {
        title: this.titleModel,
        text: this.textModel === '' ? undefined : this.textModel,
        creatorUserId: this.userModule.user!.id,
        communityId: this.communityIdModel
      }

      await this.api.createPost(post)
      this.dialogModel = false
    }

    this.loading = false
  }

  get communities (): Array<Community> {
    if (this.userModule.user) {
      return this.userModule.user.communities!
    }

    return []
  }

  typedForm (): Vue & { validate(): boolean; reset(): void } {
    return this.$refs.formRef as Vue & { validate(): boolean; reset(): void }
  }

  openCreateCommunityDialog (): void {
    this.createCommunityModel = true
  }
}
</script>
