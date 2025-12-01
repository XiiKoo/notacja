import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

import {install as VueMonacoEditorPlugin} from '@guolao/vue-monaco-editor';


const app = createApp(App);

app.use(router);

app.use(VueMonacoEditorPlugin, {
  paths: {
    // You can change the CDN config to load other versions
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.54.0/min/vs'
  },
});

app.mount('#app');
