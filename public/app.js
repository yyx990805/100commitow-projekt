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
        this.$root.dev = !this.$root.dev;
        this.$forceUpdate()
      },
    },
  }

  const XMainList = {
    name: 'x-main-list',
    template: `
      <div>
        <ul class="list_entries">
          <li v-for="e in $root.entries" class="list__entry">
            ` + ('TODO is there a way, to handle jsdoc type autocompletion here?', '') + `
            <h2>{{e.title}}</h2>
            <span style="float: right" v-html="getSentiment(e)"></span>
            <p>{{e.short}}</p>
            <button title="chwilowo niedostępne">Czytaj</button>
          </li>
        </ul>
        <div>
          <button disabled>Sprawdź nowe</button>
          <button v-if="$root.dev" @click="() => {$root.entries.push(...$root.entries.slice(-1))}">Powiel ostatnie</button>
        </div>
      </div>
    `,
    methods: {
      /** @typedef {import('./initdata').Entry} Entry */
      getSentiment(/** @type Entry */ e) {
        return `<span :title='${JSON.stringify(e.sentiment)}'>${e?.sentiment?.plus || 0}:-${parseInt(e?.sentiment?.minus, 10) || 0}</span>`
      },
    },
  }

  const XSourcesList = {
    name: 'x-sources-list',
    template: `
      <div>
        <ul class="list list_sources">
          <li v-for="(e, i) in $root.sources" class="list__entry">
            <h2>{{e.name}}</h2>
            <dl>
              <dt>Nazwa</dt>
              <dd>
              <input type="text" v-model="e.name"/>
              </dd>
              <dt>URL</dt>
              <dd>
                <input type="text" v-model="e.url"/>
              </dd>
            </dl>
            <button @click="$root.sources.splice(i, 1)">Usuń</button>
          </li>
          <button @click="$root.sources.push({name: '', url: '', })"
            class="list_add"
            >Dodaj źródło</button
            >
        </ul>
        <div>
          <button v-if="$root.dev" @click="() => {$root.sources.push(...$root.sources.slice(-1))}"
            >Powiel ostatnie</button
          >
        </div>
      </div>
    `,
    methods: {
      /** @typedef {import('./initdata').Entry} Entry */
      getSentiment(/** @type Entry */ e) {
        return `<span :title='${JSON.stringify(e.sentiment)}'>${e?.sentiment?.plus || 0}:-${parseInt(e?.sentiment?.minus, 10) || 0}</span>`
      },
    },
  }

  const XApp = {
    components: {
      'x-main-list': XMainList, // catchy and tricky
    },
    template: `
      <div>
        <nav-100c/>
        <div class="container">
          <div class="starter-template">
            <div v-html="STRINGS[\`INFO_\${hash}\`]"></div>
            <x-main-list v-if="$root.hash === ''">
            </x-main-list>
            <x-sources-list v-else-if="$root.hash == '#db'"/>
            <div v-else>{{ hash }}</div>
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
      'x-main-list': XMainList,
      XSourcesList,
    },
    el: '#app',
    data: () => ({
      hash: location.hash,
      env,
      dev: false,
      STRINGS: window.STRINGS,
      entries: window.ENTRIES,
      sources: window.SOURCES,
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
