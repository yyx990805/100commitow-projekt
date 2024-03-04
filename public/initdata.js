/**
 * @typedef {{
*   title: string,
*   short: string,
*   sentiment: {
*     plus: number,
*     minus: number,
*     tags: string[]
*   }
* }} Entry
*/

{
  /* @type {Array<{title: string, short: string, sentiment: {plus: number, minus: number, tags: string[]}}>} */
  /** @type {Array<Entry>} */
  const entries = [
    {
      title: 'Bardzo interesująca treść',
      short: 'Opis bardzo interesującej tresci',
      sentiment: {
        plus: 1337,
        minus: '0xD3ADBEEF',
        tags: ['niefinansne', 'niepolityka', 'niesmutne'],
      }
    },
  ];
  window.ENTRIES = entries;
}


/** @type {typeof window['ENTRIES'][0]} */
/** @type {Entry} */
const entryType = {};

window.SOURCES = [
  {
    name: "Lemmy",
    url: "https://lemmy.ml",
  },
  {
    name: "Postmill",
    url: "https://postmill.xzy",
    git: 'https://github.com/neuroradiology/Postmill',
  },
  {
    name: 'Voten',
    url: 'https://voten.co/',
  },
  {
    name: "Said it",
    url: "https://saidit.net/",
    git: 'https://github.com/libertysoft3/saidit',
  },
  {
    name: "Lemmy communities",
    url: "https://join-lemmy.org/instances",
  },
  {
    name: '100commitów',
    url: 'https://100commitow.pl/api/repositories?page=1&results=500',
  },
  {
    name: 'Turn off us',
    url: 'https://turnoff.us/',
  },
];


window.SENTIMENTS = [
  {
    name: "Prawo nagłówków betteridge'a",
    keywords: 'news.title,contains("?")',
    desc: 'jeśli w tytule newsa zawarte jest pytanie, to odpowiedź na nie brzmi: nie',
    positive: false,
  }
];
