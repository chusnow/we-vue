/**
 * add vue-router support
 */
export default {
  props: {
    url: String,
    replace: Boolean,
    to: [String, Object]
  },

  methods: {
    routerLink () {
      const { to, url, $router, replace } = this
      console.log(to)
      console.log(url)
      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to)
      } else if (url) {
        replace ? location.replace(url) : location.href = url
      }
    }
  }
}
