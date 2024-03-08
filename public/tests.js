const _tests = [
  ...Object.keys(window).filter(k => k.startsWith('test') && typeof window[k] === 'function').map(k => window[k]),
];

function test1(document, window) {
  const el = window.navbar || document.querySelector('#navbar')
  console.assert(el, 'navbar not found')
}

function test2(documnet, window) {
  document.querySelector('#navbar a').click();
  const menuEntry = document.querySelector('#navbar .nav li:nth-child(2) a')
  const hash = location.hash
  menuEntry.click()
  console.assert(hash !== location.hash, 'hash did not change')
}

async function test3() {
  const menuEntry0 = document.querySelector('#navbar .nav li:nth-child(1) a')
  menuEntry0.click();
  const menuEntry1 = document.querySelector('#navbar .nav li:nth-child(2) a')
  menuEntry1.click()
  const dest = menuEntry1.closest('li')
  await new Promise(res => setTimeout(res, 100)); // sleep
  console.assert(dest.classList.contains('active'), 'menu entry does not have .active, it has', dest.classList, {dest})
}

function testAppGeneral() {
  // non-existent routes should show its endpoint as string
}

function testMainEntriesView() {
  // should render initial entries
  // should render title, short and sentiment plus minus
  // should parse plus minus as int
  // in devmode should be clone last entry
  // check for new entries should be disabled (if the api endpoint is not operational)
}

function testSourcesList() {
  // sources should be listed with name and url
  // changing name or url should change internal state
  // source can be deleted
  // can add new source
  // contains selectorArticle selectorNextPage
  // clicking test parsing for source entries uses selectorArticle selectorNextPage
  // can fetch data from an REST API JSON
}

function testSentimentsList() {
  // sentiments should be listed with name, keywords (tags) and isPositive
  // sentiments can be deleted
  // can add new sentiment
}

function buildingContentsList() {
  // should go through all sources
  // returned contents should be in proper format (required props for ui component)
}

async function runTests() {
  return _tests.map(async (e, i, arr) => {
    [await e(document, window), e];
    console.info(`Test ${i} executed.`)
  })
}
