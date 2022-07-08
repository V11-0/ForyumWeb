<template>
  <ExpandableCard>
    <template v-slot:title> Já possui conta? </template>

    <template v-slot:expanded>
      <v-divider />

      <div class="py-4 px-4">
        <span class="text-subtitle-1">Que bom que está de volta!</span>

        <v-form ref="formRef" v-model="formValid" class="mt-4" lazy-validation>
          <v-text-field
            v-model="userModel"
            color="primary"
            label="Nome de Usuário"
            prepend-inner-icon="mdi-account"
            required
            filled
            :rules="requiredRule"
          />

          <v-text-field
            v-model="passwordModel"
            color="primary"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-form-textbox-password"
            required
            filled
            :rules="requiredRule"
          />

          <v-alert v-model="alertModel" text :type="alertType">
            {{ alertMessage }}
          </v-alert>

          <v-btn color="success" @click="onSubmit" :loading="loading"
            >Entrar</v-btn
          >
        </v-form>
      </div>
    </template>
  </ExpandableCard>
</template>

<script lang="ts">
import UserApi from '@/api/UserApi'
import UserModule from '@/store/modules/UserModule'
import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import ExpandableCard from '../common/ExpandableCard.vue'

@Component({
  components: {
    ExpandableCard
  }
})
export default class LoginCard extends Vue {
  userModule = getModule(UserModule, this.$store)

  formValid = false

  userModel = ''
  passwordModel = ''

  requiredRule = [(v: string) => !!v || 'Não pode ser vazio']

  alertMessage = ''
  alertType = 'error'
  alertModel = false

  loading = false

  async onSubmit (): Promise<void> {
    this.loading = true
    this.alertModel = false

    if (this.typedForm.validate()) {
      try {
        const session = await UserApi.login(this.userModel, this.passwordModel)
        this.userModule.setSession(session)
        this.$router.push('/')
      } catch (error: unknown) {
        this.alertMessage = 'Ocorreu um erro ao fazer o login'
        this.alertModel = true

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            this.alertMessage = 'Usuário ou senha incorretos'
            this.alertModel = true
          }
        }
      }
    }

    this.loading = false
  }

  get typedForm (): Vue & { validate(): boolean } {
    return this.$refs.formRef as Vue & { validate(): boolean }
  }
}
</script>
