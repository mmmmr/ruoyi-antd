<template>
	<a-menu-item>
		<a href="javascript:;" @click="showDraw">系统设置</a>
	</a-menu-item>
	<a-drawer
		v-model:open="open"
		title="系统风格设置"
		placement="right"
		:maskClosable="false"
		width="250px"
		class="bg-base"
	>
		<div class="bg-base">
			<div>主题风格设置：</div>
			<div class="mt-3">
				<img
					src="@/assets/img/darkMenu.svg"
					class="mr-5 cursor-pointer"
					@click="changeMenuTheme('dark')"
				/>
				<!-- <i aria-label="图标: check">
				<svg
					viewBox="64 64 896 896"
					data-icon="check"
					width="1em"
					height="1em"
					aria-hidden="true"
					focusable="false"
					class=""
				>
					<path
						d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
					/>
				</svg>
			</i> -->
				<img
					class="cursor-pointer"
					src="@/assets/img/lightMenu.svg"
					@click="changeMenuTheme('light')"
				/>
			</div>
			<div class="mt-3 flex items-center justify-between">
				开启 Tags-View: <a-switch v-model:checked="showTagsView" />
			</div>
			<div class="mt-3 flex items-center justify-between">
				侧边栏 Logo: <a-switch v-model:checked="showRightLogo" />
			</div>
			<div class="mt-3 flex items-center justify-between">
				动态标题: <a-switch v-model:checked="showDynamicTitle" />
			</div>
			<div class="mt-3 flex items-center justify-between">
				主题颜色：<input
					type="color"
					:value="primaryColor"
					@input="changePrimaryColor"
				/>
			</div>
		</div>
	</a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemStore } from '@/store/system/index'
import { storeToRefs } from 'pinia'
import { theme } from 'ant-design-vue'
const {
	menuTheme,
	showRightLogo,
	showTagsView,
	showDynamicTitle,
	primaryColor
} = storeToRefs(useSystemStore())

type MenuTheme = 'dark' | 'light'

const open = ref<boolean>(false)
const showDraw = () => {
	open.value = true
	console.log(open)
}

const { token } = theme.useToken()

const changeMenuTheme = (theme: MenuTheme) => {
	menuTheme.value = theme
}

const changePrimaryColor = (e: any) => {
	primaryColor.value = e.target.value
}
</script>
<style scoped>
input[type='color'] {
	border: 1px solid v-bind('token.colorBorder');
	background-color: v-bind('token.colorBgBase');
}
</style>
