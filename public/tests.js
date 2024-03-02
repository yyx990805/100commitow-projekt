const _tests = [
  test1,
  test2,
  test3,
  ...Object.keys(window).filter(k => k.startsWith('test')).map(k => window[k]),
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

async function runTests() {
  return _tests.map(async (e, i, arr) => {
    [await e(document, window), e];
    console.info(`Test ${i} executed.`)
  })
}
