<template>
  <ExpandableCard>
    <template v-slot:title> Novo Por Aqui? </template>

    <template v-slot:expanded>
      <v-divider />

      <div class="py-4 px-4">
        <span class="text-subtitle-1">Então, seja bem vindo ou vinda!</span>

        <v-form ref="formRef" v-model="formValid" class="mt-4">
          <v-text-field
            v-model="userModel"
            color="cyan accent-3"
            label="Nome de Usuário"
            prepend-inner-icon="mdi-account"
            :rules="usernameRules"
            ref="userInputRef"
            required
            filled
          />

          <v-text-field
            v-model="emailModel"
            color="cyan accent-3"
            label="Email"
            prepend-inner-icon="mdi-email"
            required
            :rules="emailRules"
            ref="emailInputRef"
            filled
          />

          <v-text-field
            v-model="passwordModel"
            color="cyan accent-3"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-form-textbox-password"
            required
            :rules="passwordRules"
            @input="checkPassword"
            filled
            loading
          >
            <template v-slot:progress>
              <v-progress-linear
                :value="passScore * 25"
                :color="passProgressColor"
                :height="7"
                rounded
                absolute
              />
            </template>
          </v-text-field>

          <v-select
            v-model="countryModel"
            :items="countriesNames"
            label="País"
            color="cyan accent-3"
            prepend-inner-icon="mdi-flag-variant"
            :rules="requiredRule"
            filled
          />

          <v-alert v-model="showFormAlert" text :type="alertType">
            {{ alertMessage }}
          </v-alert>

          <v-btn color="primary" @click="onSubmit" :loading="uiLoading"
            >Criar Conta</v-btn
          >
        </v-form>
      </div>
    </template>
  </ExpandableCard>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import axios from 'axios'

import ExpandableCard from '../common/ExpandableCard.vue'
import axiosInstance from '@/utils/AxiosInstance'
import UserApi from '@/api/UserApi'
import User from '@/models/User'

interface ValidationError {
  field: string
  error: string
}

@Component({
  components: {
    ExpandableCard
  }
})
export default class SignUpCard extends Vue {
  uiLoading = false
  formValid = false

  // Input Rules
  requiredRule = [(v: string) => !!v || 'Não pode ser vazio']
  usernameRules = [
    (u: string) => u.length >= 6 || 'Usuário deve ter no mínimo 6 caracteres',
    this.requiredRule[0]
  ]

  emailRules = [
    (e: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e) ||
      'Digite um Email válido'
  ]

  passwordRules = [
    (s: string) => s.length >= 6 || 'A senha deve ter no mínimo 6 caracteres',
    this.requiredRule[0]
  ]

  // Form Models
  userModel = ''
  emailModel = ''
  passwordModel = ''
  countryModel = ''

  // Password validation
  passScore = 0
  passProgressColor = 'red'
  progressColors = ['red', 'orange', 'yellow', 'lime', 'green']

  countries = {}

  showFormAlert = false
  alertMessage = ''
  alertType = 'error'

  async created (): Promise<void> {
    const resp = await axiosInstance.get(
      'https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/3b2e5355eb49336f0c6bc0060c05d927c2d1e004/ISO3166-1.alpha2.json'
    )
    this.countries = resp.data
  }

  get countriesNames (): Array<string> {
    return Object.values(this.countries)
  }

  async onSubmit (): Promise<void> {
    this.uiLoading = true
    this.showFormAlert = false

    if (this.typedForm.validate()) {
      const user: User = {
        Username: this.userModel,
        Email: this.emailModel,
        Password: this.passwordModel,
        Country: this.countryModel
      }

      try {
        await UserApi.createUser(user)
        this.typedForm.reset()

        this.alertMessage = 'Usuário criado, agora faça o login'
        this.alertType = 'success'
        this.showFormAlert = true
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Conflict
          if (error.response?.status === 409) {
            const data = error.response.data as Array<ValidationError>

            this.alertMessage = data.map(ve => ve.error).join(' | ')
            this.alertType = 'error'
            this.showFormAlert = true
          }
        }
      }
    }

    this.uiLoading = false
  }

  get typedForm (): Vue & { validate(): boolean, reset(): void } {
    return this.$refs.formRef as Vue & { validate(): boolean, reset(): void }
  }

  checkPassword (): void {
    const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

    let containsMoreThan7Caracters

    if (this.passwordModel.length >= 7) {
      containsMoreThan7Caracters = true
    } else containsMoreThan7Caracters = false

    const containsNumber = /\d/.test(this.passwordModel)
    const containsUppercase = /[A-Z]/.test(this.passwordModel)
    const containsSpecialCharacter = format.test(this.passwordModel)

    const conditionsArray = [
      containsMoreThan7Caracters,
      containsNumber,
      containsUppercase,
      containsSpecialCharacter
    ]

    this.passScore = conditionsArray.filter(
      (condition) => condition === true
    ).length

    this.passProgressColor = this.progressColors[this.passScore]
  }
}
</script>
