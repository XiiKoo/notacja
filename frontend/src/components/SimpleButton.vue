<script setup lang="ts">
import {computed} from "vue";

type Variant = "default" | "primary" | "success" | "ghost";
type ButtonType = "button" | "submit" | "reset";

const props = withDefaults(defineProps<{
    variant?: Variant
    disabled?: boolean
    type?: ButtonType
}>(), {
    variant: "default",
    disabled: false,
    type: "button",
});

const base =
    "inline-flex items-center justify-center " +
    "rounded-full " +
    "px-4 py-2 " +
    "text-sm font-semibold " +
    "select-none cursor-pointer " +
    "focus:outline-none focus:ring-2 focus:ring-offset-0 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-600",
    success: "bg-amber-500 text-white hover:bg-amber-400 focus:ring-amber-600",
    ghost: "bg-transparent text-black hover:bg-slate-100 focus:ring-slate-600",
    default: "bg-black text-white hover:bg-gray-800 focus:ring-gray-900",
};

const classes = computed(() => `${base} ${variants[props.variant]}`);

</script>

<template>
    <button :type="type" :disabled="disabled" :class="classes">
        <slot>
        </slot>
    </button>
</template>

<style scoped>
button {
    -moz-transition: all .51s;
    -o-transition: all .51s;
    -webkit-transition: all .51s;
    transition: all .51s;
}
</style>