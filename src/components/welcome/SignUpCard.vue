<template>
    <ExpandableCard>
        <template v-slot:title>
            Novo Por Aqui?
        </template>

        <template v-slot:expanded>
            <v-divider />

            <div class="py-4 px-4">
                <span class="text-subtitle-1">Então, seja bem vindo ou vinda!</span>

                <v-form ref="formRef" v-model="valid" class="mt-4" lazy-validation>
                    <v-text-field v-model="userModel" color="secondary" label="Nome de Usuário"
                        prepend-inner-icon="mdi-account" :rules="usernameRules" required />

                    <v-text-field v-model="emailModel" color="secondary" label="Email" prepend-inner-icon="mdi-email"
                        required :rules="emailRules" />

                    <v-text-field v-model="passwordModel" color="secondary" label="Senha" type="password"
                        prepend-inner-icon="mdi-form-textbox-password" required :rules="passwordRules" />

                    <v-text-field v-model="passwordConfirmModel" color="secondary" label="Confirmação de Senha"
                        prepend-inner-icon="mdi-lock-check" required :rules="passwordConfirmRules" />

                    <v-autocomplete v-model="countryModel" :items="countryNames" label="País"
                        prepend-inner-icon="mdi-flag-variant" :rules="requiredRule" />

                    <v-btn color="secondary" @click="onSubmit">Criar Conta</v-btn>
                </v-form>
            </div>
        </template>
    </ExpandableCard>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { ref, reactive } from '@vue/reactivity';
import ExpandableCard from '../common/ExpandableCard.vue';
import axiosInstance from '../../utils/AxiosInstance';

const formRef = ref<HTMLFormElement & { validate(): boolean } | null>(null);
const valid = ref(false);

const userModel = ref('');
const emailModel = ref('');
const passwordModel = ref('');
const passwordConfirmModel = ref('');
const countryModel = ref('');

const requiredRule = [
    (v: string) => !!v || 'Não pode ser vazio',
];

const usernameRules = [
    (u: string) => u.length >= 6 || 'Usuário deve ter 6 caracteres',
    requiredRule[0]
];

const emailRules = [
    // TODO Email validation
    requiredRule[0]
];

const passwordRules = [
    // TODO Password strength
    requiredRule[0]
];

const passwordConfirmRules = [
    (cp: string) => cp === passwordModel.value || 'As senhas não são iguais',
    requiredRule[0]
];

let countries = reactive({});

onBeforeMount(async () => {
    const resp = await axiosInstance.get("https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/3b2e5355eb49336f0c6bc0060c05d927c2d1e004/ISO3166-1.alpha2.json");
    Object.assign(countries, resp.data);
});

const countryNames = computed(() => {
    return Object.values(countries);
});

function onSubmit(): void {

    if (formRef?.value?.validate()) {

        // TODO Check for existing username
        // TODO register user via api
        let country = getKeyByValue(countries, countryModel.value);
    }
}

function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
}
</script>
