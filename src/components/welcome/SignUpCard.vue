<template>
    <ExpandableCard>
        <template v-slot:title>
            Novo Por Aqui?
        </template>

        <template v-slot:expanded>
            <v-dividir />

            <v-card-subtitle>Então, seja bem vindo ou vinda!</v-card-subtitle>

            <v-card-text>
                hahahahahahahahahahaha
            </v-card-text>
        </template>
    </ExpandableCard>
</template>

<script setup lang="ts">
import ExpandableCard from '../common/ExpandableCard.vue';
</script>
