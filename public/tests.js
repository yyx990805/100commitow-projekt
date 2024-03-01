const tests = [
  test1,
  test2,
  test3,
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

function runTests() {
  return tests.map(async (e, i, arr) => {
    [await e(document, window), e];
    console.info(`Test ${i} executed.`)
  })
}
