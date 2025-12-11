<script setup>
import {ref} from 'vue';

import ExampleChart from "@/components/ExampleChart.vue";
import MonacoEditor from "@/components/MonacoEditor.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import SendIcon from "@/icons/SendIcon.vue";

const code = ref(`
/*
 * Notacja created by Xiko and MODERR
 */

// Example Bubble Sort
function main(n, array_int) {
    let swapped;

    do {
        swapped = false;

        for (let i = 1; i < n; i++) {
            if (array_int[i - 1] > array_int[i]) {
                const tmp = array_int[i - 1];
                array_int[i - 1] = array_int[i];
                array_int[i] = tmp;
                swapped = true;
            }
        }
    } while (swapped);

    return array_int;
}

/*
 *
 */
`);

const scriptLogs = ref([]);
const scriptTimings = ref([]);

async function sendCode() {
    const response = await fetch("http://localhost:2025/analiza", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: code.value
        })
    });

    const json = await response.json();

    console.log(json);

    scriptLogs.value = json.logs;
    scriptTimings.value = json.timings;
}

</script>

<template>
    <!-- Whole page -->
    <div class="w-screen min-h-screen h-screen flex flex-col bg-orange-50">

        <!-- Content -->
        <div class="h-full w-screen flex flex-row">
            <!-- Left block: Editor -->
            <div class="w-1/2 h-full">
                <MonacoEditor v-model:value="code"/>
            </div>
            <!-- Right block -->
            <div class="w-1/2 h-full p-3">
                <!-- Header -->
                <header class="h-12 border-1 border-black rounded-full p-2 mb-4 flex items-center">
                    <div class="flex justify-between items-center w-full">
                        <div class="flex gap-1">
                            <SimpleButton>O projekcie</SimpleButton>
                            <SimpleButton>Notacja Wielkiego O</SimpleButton>
                        </div>
                        <SimpleButton variant="success" class="gap-2" @click="sendCode"><SendIcon/>Sprawdź algorytm</SimpleButton>
                    </div>
                </header>

                <section class="px-4 mb-4">
                    <SectionHeader>
                        Analiza algorytmu
                        <template #subtitle>Podtytul</template>
                    </SectionHeader>
                    <div class="flex flex-row gap-4 justify-between">
                        <div class="bg-red-400 p-0 rounded-xl w-full h-72">
                            <ExampleChart :data="scriptTimings"/>
                        </div>
<!--                        <div class="flex flex-col items-center justify-center h-72">-->
<!--                            <div class="bg-indigo-400 h-72 w-96 rounded-xl flex items-center justify-center flex-col">-->
<!--                                <h4 class="mb-8 text-5xl font-bold">Wynik</h4>-->
<!--                                <p class="font-mono font-bold text-3xl mb-8 p-4 bg-indigo-500 rounded-xl select-all">-->
<!--                                    O(x^3)</p>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>

                </section>

<!--                <section class="px-4 mb-4">-->
<!--                    <SectionHeader>Słowa kluczowe</SectionHeader>-->
<!--                    <KeyWordContainer/>-->
<!--                </section>-->

                <section class="px-4 mb-4 bg-slate-800 p-4 rounded-xl text-white">
                    <p v-for="line in scriptLogs" class="border-b-[1px] border-b-slate-950">{{line}}</p>
                </section>

            </div>
        </div>

        <footer class="h-8 w-full bg-black"></footer>

        <!-- End of whole page-->
    </div>
</template>