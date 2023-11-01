import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd())
	return {
		plugins: [
			vue(),
			UnoCSS(),
			vueSetupExtend(),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false
					})
				]
			}),
			createSvgIconsPlugin({
				// 指定目录
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icon/svg')],
				// 使用svg图标的格式
				symbolId: 'icon-[dir]-[name]'
			})
		],
		test: {
			environment: 'jsdom'
		},
		resolve: {
			alias: {
				'@': '/src'
			}
		},
		server: {
			host: true, // 0.0.0.0 或 true 开启所有
			port: Number(env.VITE_APP_PORT), // 为什么是string呢 ?
			open: true, // 运行后是否打开浏览器
			proxy: {
				'/dev-api': {
					target: 'http://vue.ruoyi.vip/prod-api',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/dev-api/, '')
				}
			}
		}
	}
})
