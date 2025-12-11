<script setup>
import {shallowRef} from "vue";

const MONACO_EDITOR_OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    wordWrap: true,
    autoIndentOnPaste: true,
    autoIndent: true,
};

const editor = shallowRef();

const handleMount = editorInstance => {
    editor.value = editorInstance;
};

const handleBeforeMount = monaco => {
    monaco.editor.defineTheme("gruvbox", {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {token: '', foreground: '#EBDBB2', background: '#282828'},
            {token: 'comment', foreground: '#928374', fontStyle: 'italic'},
            {token: 'keyword', foreground: '#FB4934'},
            {token: 'number', foreground: '#D3869B'},
            {token: 'string', foreground: '#B8BB26'},
            {token: 'type', foreground: '#FABD2F'},
            {token: 'delimiter', foreground: '#EBDBB2'},
        ],
        colors: {
            'editor.background': '#282828',
            'editor.foreground': '#ebdbb2',
            'editorLineNumber.foreground': '#665c54',
            'editor.selectionBackground': '#3c3836',
            'editor.lineHighlightBackground': '#32302f',
            'editorCursor.foreground': '#fbf1c7',
            'editor.selectionHighlightBackground': '#504945',
            'editorIndentGuide.background': '#3c3836',
        },
    });
};
</script>

<template>
    <vue-monaco-editor
        language="javascript"
        theme="gruvbox"
        :options="MONACO_EDITOR_OPTIONS"
        @mount="handleMount"
        @beforeMount="handleBeforeMount"
    />
</template>