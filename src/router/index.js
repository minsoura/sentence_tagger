import Vue from 'vue'
import Router from 'vue-router'
import Tagger from '@/components/tagger'
import Synonyms from '@/components/synonyms'
import Samsung from '@/components/company_samsung'

import SentimentAnalysis from '@/components/works/SentimentAnalysis'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Tagger
    },
    {
      path: '/tagger',
      name: 'tagger',
      component: Tagger
    },
    {
      path: '/synonyms',
      name: 'synonyms',
      component: Synonyms
    },

    {
      path: '/company_samsung',
      name: 'samsung',
      component: Samsung
    },
    {
      path: '/works/sentimentanalysis',
      name: 'sentimentanalysis',
      component: SentimentAnalysis
    }

  ]
})
