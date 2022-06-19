<template>
    <v-card>
        <v-card-title>
            <slot name="title"></slot>
        </v-card-title>

        <v-card-subtitle>
            <slot name="subtitle"></slot>
        </v-card-subtitle>

        <v-card-text>
            <slot name="text"></slot>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn :icon="cardExpansionIcon" @click="expandCard" />
        </v-card-actions>

        <v-expand-transition>
            <div v-show="expanded">
                <slot name="expanded"></slot>
            </div>
        </v-expand-transition>
    </v-card>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

let expanded = ref(false);

const cardExpansionIcon = computed<string>(() => 
    expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
);

function expandCard(): void {
    expanded.value = !expanded.value;
}
</script>