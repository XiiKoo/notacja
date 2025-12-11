<script setup lang="ts">

const props = withDefaults(defineProps<{
    selected?: boolean
}>(), {
    selected: false,
});

</script>

<template>
    <div class="rounded-full mr-4 h-12 w-full text-center flex items-center justify-center">
        <slot>

        </slot>
    </div>
</template>

<style scoped>

</style>