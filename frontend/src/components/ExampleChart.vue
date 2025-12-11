<template>
    <VChart ref="chartRef" class="chart" :option="option"/>
</template>

<script setup>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
import VChart, {THEME_KEY} from "vue-echarts";
import {ref, provide, onMounted, onBeforeUnmount, computed} from "vue";
import {DatasetComponent, GridComponent, LegendComponent, TooltipComponent} from "echarts/components";

use([
    DatasetComponent,
    CanvasRenderer,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    LineChart,
]);

provide(THEME_KEY, "dark");

const chartRef = ref(null);

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    }
});

const option = computed(() => {
    return {
        backgroundColor: "transparent",
        xAxis: {
            type: "value",
            name: "n",
        },
        yAxis: {
            type: "value",
            name: "czas [ms]",
        },
        tooltip: {
            trigger: "axis",
            valueFormatter: (value) => `${value.toFixed(3)} ms`,
        },
        series: [
            {
                name: "czas wykonania",
                data: props.data
                    .slice()
                    .sort((a, b) => a.n - b.n).map(p => [p.n, p.time / 1e6]),
                type: "line",
                smooth: true,
            },
        ],
    };
});

function handleResize() {
    chartRef.value?.resize();
}

onMounted(() => {
    window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.chart {
    height: 100%;
    width: 100%;
}
</style>