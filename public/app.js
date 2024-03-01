{
  const XNav = {
    template: `
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="/100commitow-projekt" v-html="$root.env.TITLE"></a>
        </div>
        <div id="navbar" class="off:collapse navbar-collapse" @contextmenu="enableDevtools($event)">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Widok główny</a></li>
            <li><a href="#db">Zarządzanie źródłami</a></li>
            <li><a href="#config">Konfiguracja sentymentów</a></li>
            <li><a href="#contact">Kontakt</a></li>
            <li v-if="$root.dev" @click.prevent="$root.runTests()"><a href="#">Run tests</a></li>
          </ul>
        </div>
      </div>
    </nav>`,
    methods: {
      enableDevtools(ev) {
        if(!this.$root.dev) ev.preventDefault();
        this.$root.dev = true;
        this.$forceUpdate()
      },
    },
  }

  const XApp = {
    template: `
      <div>
        <nav-100c/>
        <div class="container">
          <div class="starter-template">
            <div v-html="STRINGS[\`INFO_\${hash}\`]"></div>
          </div>
        </div>
      </div>
    `,
  }

  const env = {
    TITLE: 'Linkownia<br/><small><a href="https://100commitow.pl">100c</a></small>',
  }
  new Vue(Vue.defineComponent({
    template: XApp.template || '#x-app',
    components: {
      'nav-100c': XNav,
    },
    el: '#app',
    data: () => ({
      hash: location.hash,
      env,
      dev: false,
      STRINGS: window.STRINGS,
    }),
    mounted() {
      window.addEventListener('hashchange', (ev) => {
        this.hash = ev.target.location.hash
        const rootEl = this.$root.$el
        rootEl.querySelector('.active').classList.remove('active')
        const nextMenu = rootEl.querySelector(`a[href="${this.hash || '#'}"]`)
        nextMenu.closest('li').classList.add('active')
      })
    },
    methods: {
      runTests: window.runTests,
    },
  }))
}
