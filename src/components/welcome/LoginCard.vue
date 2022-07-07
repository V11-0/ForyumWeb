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
          />

          <v-text-field
            v-model="passwordModel"
            color="primary"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-form-textbox-password"
            required
            filled
          />

          <v-btn color="success" @click="onSubmit">Entrar</v-btn>
        </v-form>
      </div>
    </template>
  </ExpandableCard>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import ExpandableCard from '../common/ExpandableCard.vue'

@Component({
  components: {
    ExpandableCard
  }
})
export default class LoginCard extends Vue {
  formValid = false;

  userModel = '';
  passwordModel = '';

  onSubmit (): void {
    if (this.typedForm.validate()) {
      console.log('is valid')
    }
  }

  get typedForm (): Vue & { validate(): boolean } {
    return this.$refs.formRef as Vue & { validate(): boolean }
  }
}
</script>
