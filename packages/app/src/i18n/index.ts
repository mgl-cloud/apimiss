import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js';
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';
import zhtwLocale from 'element-plus/lib/locale/lang/zh-tw';
import { store } from '/@/store/index';

import nextZhcn from '/@/i18n/lang/zh-cn';
import nextEn from '/@/i18n/lang/en';
import nextZhtw from '/@/i18n/lang/zh-tw';

import pagesLoginZhcn from '/@/i18n/pages/login/zh-cn';
import pagesLoginEn from '/@/i18n/pages/login/en';
import pagesSystemZhcn from '/@/i18n/pages/system/zh-cn';
import pagesSystemEn from '/@/i18n/pages/system/en';
import pagesLoginZhtw from '/@/i18n/pages/login/zh-tw';
import pagesFormI18nZhcn from '/@/i18n/pages/formI18n/zh-cn';
import pagesFormI18nEn from '/@/i18n/pages/formI18n/en';
import pagesFormI18nZhtw from '/@/i18n/pages/formI18n/zh-tw';

// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
	[zhcnLocale.name]: {
		...zhcnLocale,
		message: {
			...pagesSystemZhcn,
			...nextZhcn,
			...pagesLoginZhcn,
			...pagesFormI18nZhcn,
		},
	},
	[enLocale.name]: {
		...enLocale,
		message: {
			...pagesSystemEn,
			...nextEn,
			...pagesLoginEn,
			...pagesFormI18nEn,
		},
	},
	[zhtwLocale.name]: {
		...zhtwLocale,
		message: {
			...nextZhtw,
			...pagesLoginZhtw,
			...pagesFormI18nZhtw,
		},
	},
};

// 导出语言国际化
export const i18n = createI18n({
	locale: store.state.themeConfig.themeConfig.globalI18n,
	fallbackLocale: zhcnLocale.name,
	silentTranslationWarn: true, //屏蔽控制台没有批到国际化信息时警告信息  但是不起作用
    /**
     * @remarks
     * Whether suppress fallback warnings when localization fails.
     */
    silentFallbackWarn: true,
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    formatFallbackMessages: false,
	messages,
});
