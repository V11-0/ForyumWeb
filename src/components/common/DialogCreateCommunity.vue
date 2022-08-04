<template>
  <v-dialog v-model="dialogModel" :max-width="1000">
    <v-card>
      <v-card-title>Criar um nome e uma descrição</v-card-title>
      <v-card-subtitle
        >Defina as informações para criar uma comunidade</v-card-subtitle
      >
      <v-card-text>
        <v-form ref="newCommunityForm">
          <v-text-field
            v-model="modelName"
            label="Nome"
            :rules="[ruleNotEmpty, ruleNoSpaces]"
          />

          <v-textarea v-model="modelDescription" label="Descrição" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialogModel = false"> Cancelar </v-btn>

        <v-spacer />

        <v-btn text color="primary" @click="onSubmit"> Criar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import UserModule from '@/store/modules/UserModule'
import axiosInstance, { getAuthHeader } from '@/utils/AxiosInstance'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component
export default class DialogCreateCommunity extends Vue {
  @Prop({ required: true }) value!: boolean

  modelName = ''
  modelDescription = ''

  ruleNotEmpty = (v: string) => !!v || 'Não pode ser vazio'
  ruleNoSpaces = (v: string) => !v.includes(' ') || 'Não pode ter espaços'

  userModule = getModule(UserModule, this.$store)

  get dialogModel (): boolean {
    return this.value
  }

  set dialogModel (value: boolean) {
    this.$emit('input', value)
  }

  async onSubmit (): Promise<void> {
    if (this.typedForm.validate()) {
      const resp = await axiosInstance.post(
        '/Community',
        { name: this.modelName, description: this.modelDescription },
        getAuthHeader(this.userModule.token)
      )

      const communityId = resp.data

      this.$router.push(`/community/${communityId}`)
    }
  }

  get typedForm (): Vue & { validate(): boolean } {
    return this.$refs.newCommunityForm as Vue & { validate(): boolean }
  }
}
</script>
