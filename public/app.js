{
  const XNav = {
    template: `
    <nav class="navbar navbar-inverse">
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
          <button @click="$root.entries = $root.contentsService.getContents()">Sprawdź nowe</button>
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
    data() {
      return {
        window,
      }
    },
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
              <dt>Typ zasoby</dt>
              <dd>
                <input type="radio" name="type" v-model="e.type" value="html"/> HTML<br/>
                <input type="radio" name="type" v-model="e.type" value="json"/> REST API
              </dd>
              <div v-if="e.type === 'html'">
              <dt>selektor css artykułu</dt>
              <dd>
                <input type="text" v-model="e.selectorArticle"/>
              </dd>
              <dt>selektor css linku do kolejnej strony</dt>
              <dd>
                <input type="text" v-model="e.selectorNextPage"/>
              </dd>
              </div>
              <div v-if="e.type === 'json'">
                <dt>jsonpath artykułu</dt>
                <dd>
                  <input type="text" v-model="e.jsonPath"/>
                </dd>
                <dt>Iterator stron {pageNr}</dt>
                <dd>
                  <input type="text" v-model="e.jsonPagesUrl"/>
                </dd>
              </div>
              <dt>Sprawdź scraper</dt>
              <dd>
                <button @click="window.alert(JSON.stringify({entry: e, 'cmd': 'parse'}, null, 2))">Przetwórz stronę główną</button>
              </dd>
            </dl>
            <button @click="$root.sources.splice(i, 1)">Usuń</button>
          </li>
          <button @click="$root.sources.push({name: '', url: '', type: 'html'})"
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
  }
  const XSentimentsList = {
    name: 'x-sources-list',
    template: `
      <div>
        <ul class="list list_sentiments">
          <li v-for="(e, i) in $root.sentiments" class="list__entry">
            <h2>{{e.name}}</h2>
            <dl>
              <dt>Nazwa</dt>
              <dd>
                <input type="text" v-model="e.name"/>
              </dd>
              <dt>Słowa kluczowe</dt>
              <dd>
                <input type="text" v-model="e.keywords"/>
              </dd>
              <dt>Pozytywny</dt>
              <dd>
                <input type="checkbox" v-model="e.positive"/>
              </dd>
            </dl>
            <button @click="$root.sentiments.splice(i, 1)">Usuń</button>
          </li>
          <button @click="$root.sentiments.push({name: '', url: '', })"
            class="list_add"
            >Dodaj sentyment</button
            >
        </ul>
        <div>
          <button v-if="$root.dev" @click="() => {$root.sources.push(...$root.sources.slice(-1))}"
            >Powiel ostatnie</button
          >
        </div>
      </div>
    `,
  }

  const XApp = {
    template: `
      <div>
        <nav-100c/>
        <div class="container">
          <div class="starter-template">
            <div v-html="STRINGS[\`INFO_\${hash}\`]"></div>
            <x-main-list v-if="$root.hash === ''">
            </x-main-list>
            <x-sources-list v-else-if="$root.hash == '#db'"/>
            <x-sentiments-list v-else-if="$root.hash == '#config'"/>
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
      XSentimentsList,
    },
    el: '#app',
    data: () => ({
      hash: location.hash,
      env,
      dev: false,
      STRINGS: window.STRINGS,
      entries: window.ENTRIES,
      sources: window.SOURCES,
      sentiments: window.SENTIMENTS,
    }),
    computed: {
      contentsService() {
        return buildContentsService(this.sources, this)
      }
    },
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

function buildContentsService(sources, host) {
  return {
    getContents() {
      const sourcesWithContents = sources.map(e => {
        return {
          title: `Content from ${e.name}`,
          short: 'short desc',
          sentiment: {},
        }
      })
      return [].concat(...sourcesWithContents)
    }
  }
}
