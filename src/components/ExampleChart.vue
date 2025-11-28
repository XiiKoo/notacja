<template>
    <VChart class="chart" :option="option"/>
</template>

<script setup>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
import VChart, {THEME_KEY} from "vue-echarts";
import {ref, provide} from "vue";
import {DatasetComponent, GridComponent, LegendComponent} from "echarts/components";

use([
    DatasetComponent,
    CanvasRenderer,
    GridComponent,
    LegendComponent,
    LineChart,
]);

provide(THEME_KEY, "dark");

const option = ref({
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [1, 4, 9, 16, 25, 36],
            type: 'line'
        }
    ]
});
</script>

<style scoped>
.chart {
    height: 30vh;
    width: 30vw;
}
</style>