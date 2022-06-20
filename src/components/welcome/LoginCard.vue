<template>
    <ExpandableCard>
        <template v-slot:title>
            Já possui conta?
        </template>

        <template v-slot:expanded>
            <v-divider />

            <div class="py-4 px-4">
                <span class="text-subtitle-1">Que bom que está de volta!</span>

                <v-form ref="formRef" v-model="valid" class="mt-4" lazy-validation>
                    <v-text-field
                        v-model="userModel"
                        color="primary"
                        label="Nome de Usuário"
                        prepend-inner-icon="mdi-account"
                        required />

                    <v-text-field
                        v-model="passwordModel"
                        color="primary"
                        label="Senha"
                        type="password"
                        prepend-inner-icon="mdi-form-textbox-password"
                        required />

                    <v-btn color="success" @click="onSubmit">Entrar</v-btn>
                </v-form>
            </div>
        </template>
    </ExpandableCard>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import ExpandableCard from '../common/ExpandableCard.vue';

const formRef = ref<HTMLFormElement & { validate(): boolean } | null>(null);
const valid = ref(false);

const userModel = ref('');
const passwordModel = ref('');

function onSubmit(): void {

    if (formRef?.value?.validate()) {
        console.log('is valid');
    }
}
</script>
