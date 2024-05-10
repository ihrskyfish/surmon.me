import { computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { useNodepressStatisticStore } from '/@/stores/statistic'
import { numberSplit, numberToKilo, firstUpperCase } from '/@/transforms/text'
import { Language, LanguageKey } from '/@/language'
import { META } from '/@/config/app.config'

export const i18ns = {
  title: {
    [Language.Chinese]: '出入平等，了了分明',
    [Language.English]: `Surmon's writing archive`
  },
  description: {
    [Language.Chinese]: `书字字之方便，开众善之法门`,
    [Language.English]: 'Either write something worth reading or do something worth writing'
  }
} as const

export const useArchivePageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer()
  seoMeta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ARCHIVE, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ARCHIVE), enTitle] : [enTitle]
    return {
      pageTitle: titles.join(' | '),
      description: `${META.title} ${isZhLang.value ? '数据归档' : 'archives'}`
    }
  })
}

export const useArchivePageStatistics = () => {
  const { i18n } = useEnhancer()
  const store = useNodepressStatisticStore()
  const statistics = computed(() => ({
    tags: {
      icon: 'icon-quill',
      title: i18n.t(LanguageKey.STATISTIC_TAGS)!,
      content: numberSplit(store.data?.tags || 0)
    },
    articles: {
      icon: 'icon-quill',
      title: i18n.t(LanguageKey.STATISTIC_ARTICLES)!,
      content: numberSplit(store.data?.articles || 0)
    },
    comments: {
      icon: 'icon-comment',
      title: i18n.t(LanguageKey.STATISTIC_COMMENTS)!,
      content: numberSplit(store.data?.comments || 0)
    },
    todayViews: {
      icon: 'icon-eye',
      title: i18n.t(LanguageKey.STATISTIC_TODAY_VIEWS)!,
      content: numberSplit(store.data?.todayViews || 0)
    },
    totalViews: {
      icon: 'icon-eye',
      title: i18n.t(LanguageKey.STATISTIC_TOTAL_VIEWS)!,
      content: numberToKilo(store.data?.totalViews || 0)
    },
    totalLikes: {
      icon: 'icon-like',
      title: i18n.t(LanguageKey.STATISTIC_TOTAL_UPVOTES)!,
      content: numberSplit(store.data?.totalLikes || 0)
    },
    averageEmotion: {
      icon: 'icon-emoji',
      title: i18n.t(LanguageKey.STATISTIC_AVERAGE_EMOTION)!,
      content: String(store.data?.averageEmotion ?? '-')
    }
  }))

  return {
    statistics,
    fetch: store.fetch
  }
}
