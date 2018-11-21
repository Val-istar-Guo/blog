// mili upgrade type: cover
// Client entry file
import Vue from 'vue'
import createApp from './createApp'


Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { initialData } = this.$options
    console.log('before route update =>', initialData)

    if (initialData) {
      initialData.call(this, {
        store: this.$store,
        route: to,
      })
      .then(next)
      .catch(next)
    } else {
      next()
    }
  }
})

const { app, store, router } = createApp()

if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)

router.onReady(() => {
  app.$mount('#app', true)

  Vue.mixin({
    beforeMount () {
      const { initialData } = this.$options
      console.log('before mount =>', initialData);
      if (initialData) {
        this.dataPromise = initialData.call(this, {
          store: this.$store,
          route: this.$route,
        })
      }
    },
  })
})

