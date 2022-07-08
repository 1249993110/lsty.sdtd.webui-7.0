import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { VITE_APP_BASE_URL } = loadEnv(mode, process.cwd());
    return {
        plugins: [vue()],
        base: VITE_APP_BASE_URL,
        server: {
            host: '0.0.0.0',
            port: 8090,
            open: true,
        },
    };
});
