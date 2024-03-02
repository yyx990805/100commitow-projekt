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
