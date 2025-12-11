<script setup>
import { ref } from "vue";

import KeyWord from "@/components/keyword/KeyWord.vue";
import MonacoEditor from "@/components/MonacoEditor.vue";
import ExampleChart from "@/components/ExampleChart.vue";
import SimpleButton from "@/components/SimpleButton.vue";

const keywords = [
    {id: "random_int", label: Math.floor(Math.random() * 67 + 1), component: ExampleChart},
    {id: "xd1", label: "xd1", component: SimpleButton},
    {id: "xd2", label: "xd2", component: MonacoEditor},
];

const selectedId = ref(keywords[0].id);

const selectedItem = () => keywords.find(item => item.id === selectedId.value);

</script>

<template>
    <div class="flex flex-row w-full h-96">
        <!-- Keywords Container -->
        <div class="flex flex-col items-center w-1/5 gap-4">
            <KeyWord
                v-for="keyword in keywords"
                :key="keyword.label"
                @click="selectedId = keyword.id"

                :class="selectedId === keyword.id ? 'bg-green-500' : 'bg-red-500'"
            >
                {{ keyword.label }}
            </KeyWord>
        </div>

        <div class="w-5/6 h-full bg-green-500">
            <h4>{{ selectedItem()?.label }}</h4>
            <component :is="selectedItem()?.component"></component>
        </div>
    </div>
</template>

<style scoped>

</style>