// vue
import { createApp } from 'vue';

// components
import App from './components/App.vue';

// antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// styles
import './assets/styles/main.css';

createApp(App).use(Antd).mount('#app');
