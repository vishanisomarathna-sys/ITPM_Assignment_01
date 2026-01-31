const { test, expect } = require('@playwright/test');
require('dotenv').config();
const TARGET_URL = process.env.TARGET_URL || 'https://www.swifttranslator.com/';

const testCases = [
  { id: 'Pos_Fun_01', input: 'mama gedhara yanv.', expected: 'මම ගෙදර යනවා.' },
  { id: 'Pos_Fun_02', input: 'kasuni baya venna epaa, mama yannam.', expected: 'කසුනි බය වෙන්න එපා, මම යන්නම්.' },
  { id: 'Pos_Fun_03', input: 'oya enavaanam mama balan innavaa.', expected: 'ඔය එනවානම් මම බලන් ඉන්නවා.' },
  { id: 'Pos_Fun_04', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
  { id: 'Pos_Fun_05', input: 'meeka vahaama karanna.', expected: 'මේක වහාම කරන්න.' },
  { id: 'Pos_Fun_06', input: 'api heta enavaa.', expected: 'අපි හෙට එනවා.' },
  { id: 'Pos_Fun_07', input: 'api heta ennee naehae.', expected: 'අපි හෙට එන්නේ නැහැ.' },
  { id: 'Pos_Fun_08', input: 'aayuboovan, suba udhaeesanak!', expected: 'ආයුබෝවන්, සුබ උදෑසනක්!' },
  { id: 'Pos_Fun_09', input: 'karuNaakaralaa mata udhav karanna.', expected: 'කරුණාකරලා මට උදව් කරන්න.' },
  { id: 'Pos_Fun_10', input: 'machan ooka dhiyan.', expected: 'මචන් ඕක දියන්.' },
  { id: 'Pos_Fun_11', input: 'hari hari mama ennam.', expected: 'හරි හරි මම එන්නම්.' },
  { id: 'Pos_Fun_12', input: 'matabath oonee.', expected: 'මටබත් ඕනේ.' },
  { id: 'Pos_Fun_13', input: 'mama iiyee gedhara giyaa.', expected: 'මම ඊයේ ගෙදර ගියා.' },
  { id: 'Pos_Fun_14', input: 'mama dhaen vaeda karanavaa.', expected: 'මම දැන් වැඩ කරනවා.' },
  { id: 'Pos_Fun_15', input: 'mama heta enavaa.', expected: 'මම හෙට එනවා.' },
  { id: 'Pos_Fun_16', input: 'api yamu, eyaalaa enavaa.', expected: 'අපි යමු, එයාලා එනවා.' },
  { id: 'Pos_Fun_17', input: 'mama gedhara gihin paadam karala raeta bath kaala nidaagannavaa.', expected: 'මම ගෙදර ගිහින් පාඩම් කරල රෑට බත් කාල නිදාගන්නවා.' },
  { id: 'Pos_Fun_18', input: 'mama gedhara yanavaa. '.repeat(25), expected: 'මම ගෙදර යනවා.' },
  { id: 'Pos_Fun_19', input: 'mama Zoom meeting ekata join wenawa.', expected: 'Zoom' },
  { id: 'Pos_Fun_20', input: 'mata WiFi password eka dhenna.', expected: 'WiFi' },
  { id: 'Pos_Fun_21', input: 'mage NIC eka naethi unaa.', expected: 'NIC' },
  { id: 'Pos_Fun_22', input: 'Rs. 5000 k dhenna.', expected: 'Rs. 5000' },
  { id: 'Pos_Fun_23', input: '2025-12-25 dhohi enna.', expected: '2025-12-25' },
  { id: 'Pos_Fun_24', input: 'mama\ngedhara\nyanavaa', expected: 'මම' },
  { id: 'Neg_Fun_01', input: 'Thx machan', expected: 'Thx' },
  { id: 'Neg_Fun_02', input: 'gm yaluwane', expected: 'gm' },
  { id: 'Neg_Fun_03', input: 'meka gr8 wadak', expected: 'gr8' },
  { id: 'Neg_Fun_04', input: 'xxyyzz abcd', expected: 'xxyyzz' },
  { id: 'Neg_Fun_05', input: 'MaMa GeDhaRa YaNaVaA', expected: 'MaMa' },
  { id: 'Neg_Fun_06', input: 'gedh@ra y@n@v@', expected: 'gedh@ra' },
  { id: 'Neg_Fun_07', input: 'www.google.com', expected: 'www.google.com' },
  { id: 'Neg_Fun_08', input: 'user@domain.com', expected: 'user@domain.com' },
  { id: 'Neg_Fun_09', input: '#SriLanka', expected: '#SriLanka' },
  { id: 'Neg_Fun_10', input: 'print("hello")', expected: 'print' },
];

test.describe('IT3040 Assignment 1 - Transliteration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  for (const { id, input, expected } of testCases) {
    test(`${id}: Transliteration check`, async ({ page }) => {
      const textarea = page.locator('textarea').nth(0);
      await textarea.fill(input);
      
      await expect(page.locator('body')).toContainText(expected);
    });
  }

  test('Pos_UI_01: Real-time Update Behavior', async ({ page }) => {
    const inputBox = page.locator('textarea').nth(0);
    await inputBox.type('mama', { delay: 100 });
    await expect(page.locator('body')).toContainText('මම');
    
    await inputBox.type(' yamu', { delay: 100 });
    await expect(page.locator('body')).toContainText('මම යමු');
  });

});