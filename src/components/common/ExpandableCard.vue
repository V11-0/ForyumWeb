<template>
    <v-card>
        <v-list-item class="py-4" link @click="expandCard">
            <v-list-item-title class="text-h6">
                <slot name="title"></slot>
            </v-list-item-title>
        </v-list-item>

        <v-expand-transition>
            <div v-show="expanded">
                <slot name="expanded"></slot>
            </div>
        </v-expand-transition>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

let expanded = ref(false);

function expandCard(): void {
    expanded.value = !expanded.value;
}
</script>