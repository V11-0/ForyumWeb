<template>
    <ExpandableCard>
        <template v-slot:title>
            Já possui conta?
        </template>

        <template v-slot:expanded>
            <v-divider />

            <v-card-subtitle>Que bom que está de volta</v-card-subtitle>

            <v-card-text>
                hahahahahahahahahahaha
            </v-card-text>
        </template>
    </ExpandableCard>
</template>

<script setup lang="ts">
import ExpandableCard from '../common/ExpandableCard.vue';
</script>
