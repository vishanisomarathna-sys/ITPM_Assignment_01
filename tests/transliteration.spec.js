const { test, expect } = require('@playwright/test');
require('dotenv').config();
const TARGET_URL = process.env.TARGET_URL || 'https://www.swifttranslator.com/';

const testCases = [
  { id: 'Pos_Fun_01', input: 'kasuni baya venna epaa, mama yannam.', expected: 'කසුනි බය වෙන්න එපා, මම යන්නම්.' },
  { id: 'Pos_Fun_02', input: 'machan mama heta gedhara yanavaa, ee nisaa hamuvenna enna venne naee.', expected: 'මචන් මම හෙට ගෙදර යනවා, ඒ නිසා හමුවෙන්න එන්න වෙන්නෙ නෑ.' },
  { id: 'Pos_Fun_03', input: 'oya enavaanam mama balan innavaa.', expected: 'ඔය එනවානම් මම බලන් ඉන්නවා.' },
  { id: 'Pos_Fun_04', input: 'suba anaagathayak veevaa!', expected: 'සුබ අනාගතයක් වේවා!' },
  { id: 'Pos_Fun_05', input: 'hari mama sarta kiyannam ,oyaata eeka karanna puluvan kiyalaa.', expected: 'හරි මම සර්ට කියන්නම්, ඔයාට ඒක කරන්න පුලුවන් කියලා.' },
  { id: 'Pos_Fun_06', input: 'kasun mama prarThanaa karanavaa idhiri katayuthu sarthaka venna kiyala.', expected: 'කසුන් මම ප්‍රර්ථනා කරනවා ඉදිරි කටයුතු සාර්ථක වෙන්න කියලා.' },
  { id: 'Pos_Fun_07', input: 'ubalaa hariyata sellam karaa nam tharagaya dhinanna  thibunaa.', expected: 'උබලා හරියට සෙල්ලම් කරා නම් තරගය දිනන්න  තිබුනා.' },
  { id: 'Pos_Fun_08', input: 'oyaa heta idhan veelaavata vaeda karanna igena ganna.', expected: 'ඔයා හෙට ඉදන් වේලාවට වැඩ  කරන්න ඉගෙන ගන්න.' },
  { id: 'Pos_Fun_09', input: 'karuNaakaralaa mata udhav karanavaadha?', expected: 'කරුණාකරලා මට උදව් කරනවාද?' },
  { id: 'Pos_Fun_10', input: 'oya enavaa nam poddak inna.', expected: 'ඔය එනවානම් පොඩ්ඩක් ඉන්න.' },
  { id: 'Pos_Fun_11', input: 'ado eka karalaa dhiipan.', expected: 'ado එක කරලා දීපන්.' },
  { id: 'Pos_Fun_12', input: 'magee adha upandhinaya nisaa gedhara aya uthsavayak  sudhaanam karalaa thibunaa.  uthsavaya thibuna nisaa mama adha  godak sathutu unaa', expected: 'මගේ අද උපන්දිනය නිසා ගෙදර අය උත්සවයක් සුදානම් කරලා තිබුනා.  උත්සවය තිබුන නිසා මම අද  ගොඩක් සතුටු උනා' },
  { id: 'Pos_Fun_13', input: 'varthamaanayee aethi vuna  aapadhaa thaththavaya hethuuven apee ratee viviDha pradheesha vala  jivath vena aethaem aya barapathala aapadhaa thaththvayanta muhuna dhiimata sidhuviya.ee siyaluma aapadhaa thaththvayanta sahanayak vashayen merata rajaya ee pirisata sahanaDhaara labaa dhena ladhii', expected: 'වර්තමානයේ ඇති වුන  ආපදා තත්තවය හෙතූවෙන් අපේ රටේ විවිධ ප්‍රදේශ වල  ජිවත් වෙන ඇතැම් අය බරපතල ආපදා තත්ත්වයන්ට මුහුන දීමට සිදුවිය.ඒ සියලුම ආපදා තත්ත්වයන්ට සහනයක් වශයෙන් මෙරට රජය ඒ පිරිසට සහනධාර ලබා දෙන ලදී' },
  { id: 'Pos_Fun_14', input: 'oyaa aayee  gedhara enna epaa.', expected: 'ඔයා ආයේ  ගෙදර එන්න එපා.' },
  { id: 'Pos_Fun_15', input: 'machan mama adha gedhara enne na.', expected: 'මචන් මම අද ගෙදර එන්නෙ නෑ.' },
  { id: 'Pos_Fun_16', input: 'vishani eyaagee Naya mudhala ru.siyaya labaa dhunnee naee.', expected: 'විශනි එයාගේ ණය මුදල රු.සියය ලබා දුන්නේ නෑ.' },
  { id: 'Pos_Fun_17', input: 'mata adha campus eken assignment ekak dhunnaa.thaama eka karaganna mata loku idea ekak naee.eka nisaa puluvan nam mee assignment ekee outline eka kiyavalaa mata idea ekak dhenna puluvandha? eka mata loku help ekak dan saha mata ekee practically notheerena side ekak thiyeyi. mata eekath tikak kiyala dhenna puluvandha? ekee karanna thiyena eka gaena mama oyaata tikak explain karannam.meeke thiyenne test cases hadhalaa e cases tika aaye code ekakata implement karanna .meeka thamaa dhaenata karanna thiyenne.oyaata meeka gaena idea ekak thiyeinam mata adha dhavasa aethulatha kiyala dhenavadha?', expected: 'මට අද campus එකෙන් assignment එකක් දුන්නා.තාම එක කරගන්න මට ලොකු idea එකක් නෑ.එක නිසා පුලුවන් නම් මේ assignment එකේ outline එක කියවලා මට idea එකක් දෙන්න පුලුවන්ද? එක මට ලොකු help එකක් ඩන් සහ මට එකේ practically නොතේරෙන side එකක් තියෙයි. මට ඒකත් ටිකක් කියල දෙන්න පුලුවන්ද? එකේ කරන්න තියෙන එක ගැන මම ඔයාට ටිකක් explain කරන්නම්.මේකෙ තියෙන්නෙ test cases හදලා එ cases ටික ආයෙ code එකකට implement කරන්න .මේක තමා දැනට කරන්න තියෙන්නෙ.ඔයාට මේක ගැන idea එකක් තියේනම් මට අද දවස ඇතුලත කියල දෙනවද?' },
  { id: 'Pos_Fun_18', input: 'adha mama campus gihin supermarket ekata badu ganna giya velavee cashier eka LaGAdhi salli dhenna balanakota mage purse eka naethi velaa.mage campus eke yaaluvek magee id eken maava identify karagena mata aayee eeka labaa  dhenna katayuthu kalaa. ', expected: 'අද මම campus ගිහින් supermarket එකට බඩු ගන්න ගිය වෙලවේ cashier එක ළඟදි සල්ලි දෙන්න බලනකොට mage purse එක නැති වෙලා.mage campus eke යාලුවෙක් මගේ ඉඩ් එකෙන් මාව identify කරගෙන මට ආයේ ඒක ලබා  දෙන්න කටයුතු කලා. ' },
  { id: 'Pos_Fun_19', input: 'mama parakku vunee bus eka 5 ta aavee naethi nisaa.', expected: 'මම පරක්කු වුනේ bus එක 5 ට ආවේ නැති නිසා.' },
  { id: 'Pos_Fun_20', input: 'kasunita  adha godak busy dhavasak vunath adha havasa ground ekata gihin eyaagee yaaluvoo ekka badminton play karalaa eyagee strees eka release kara gaththaa', expected: 'කසුනිට  අද ගොඩක් busy දවසක් වුනත් අද හවස ground එකට ගිහින් එයාගේ යාලුවෝ එක්ක badminton play කරලා එයගේ ස්ට්‍රේස් එක release කර ගත්තා' },
  { id: 'Pos_Fun_21', input: 'api heta udheeta campus yanavaa.', expected: 'අපි හෙට උදේට campus යනවා.' },
  { id: 'Pos_Fun_22', input: 'mama heta vaedata giyoth project eka success karaganna thibunaa.', expected: 'මම හෙට වැඩට ගියොත් project එක success කරගන්න තිබුනා.' },
  { id: 'Pos_Fun_23', input: 'oyaa kaemathi nam maath ekka cricket play karanna enavaadha?', expected: 'ඔයා කැමති නම් මාත් එක්ක cricket play කරන්න එනවාද?' },
  { id: 'Pos_Fun_24', input: 'mama lecture ekata yanavaa, namuth mama godak late.', expected: 'මම lecture එකට යනවා නමුත් මම ගොඩක් late' },{ id: 'Neg_Fun_09', input: 'ado mama adha online class ekata enavaa, saha lecturer tikee Email ekakata evanna puluvandha plis magee WhatsApp eka vaeda karanne nae WhatsApp ekee podi problem ekak loku help ekak mata dhaen evanavaadha?', expected: 'ado මම අද online class එකට එනවා, සහ lecturer ටිකේ Email එකකට එවන්න පුලුවන්ද ප්ලිස් මගේ WhatsApp එක වැඩ කරන්නේ නැ WhatsApp එකේ පොඩි problem එකක් ලොකු help එකක් මට දැන් එවනවාද?' },
  { id: 'Neg_Fun_01', input: 'ado ban elaaaaaa!', expected: 'ado බන් එල ආආආආ!' },
  { id: 'Neg_Fun_02', input: 'mee bag ekee bara pramaNaya 5kg kin vaedi velaa. ', expected: 'මේ bag එකේ බර ප්‍රමණය 5kg කින් වැඩි වෙලා' },
  { id: 'Neg_Fun_03', input: 'mamaheta vinoodha gamanak  yanavaa', expected: 'මමහෙට විනෝද ගමනක්  යනවා' },
  { id: 'Neg_Fun_04', input: 'mamahetamageecampusyaaluvooekkanuvaratripekak yannareadyvelainnavaasahaeheegihinapihamooma godakenjoykarannabalaporoththuvenavaa.apidhaenata thaen5kbalannayannaplankaragenainnavaa.', expected: 'මම හෙට මගේ campus යාලුවෝ එක්ක නුවර trip එකක් යන්න ready වෙල ඉන්නවා සහ එහේ ගිහින් අපි හමෝම ගොඩක් enjoy කරන්න බලපොරොත්තු වෙනවා.අපි දැනට තැන් 5ක් බලන්න යන්න plan කරගෙන ඉන්නවා.' },
  { id: 'Neg_Fun_05', input: 'mama http://daraz.lk  eken  frock ekak order kalaa.', expected: ' මම http://daraz.lk  එකෙන්  frock එකක් order කලා.' },
  { id: 'Neg_Fun_06', input: 'mama adha campus yana atharamaga magee id eka nathi vunaa', expected: 'මම අද campus යන අතරමග මගේ id එක නැති වුනා' },
  { id: 'Neg_Fun_07', input: 'himaashi exam eka pass vunoth campus ynn puluvan.', expected: 'හිමාශි exam එක pass වුනොත් campus යන්න පුලුවන්.' },
  { id: 'Neg_Fun_08', input: 'mama gedhara ynv, namuth traffic eka godak thiyenavaa.', expected: 'මම ගෙදර යනවා, නමුත් traffic එක ගොඩක් තියෙනවා.' },
  { id: 'Neg_Fun_10', input: 'mn adha office giya palaveni dhavasa nisaa tikak confuse velaa hitiyee namuth vaeda tika hodhata karapu nisaa haemooma maava appreciate kalaa', expected: 'මං අද office ගිය පලවෙනි දවස නිසා ටිකක් confuse වෙලා හිටියේ නමුත් වැඩ ටික හොදට කරපු නිසා හැමෝම මාව appreciate කලා' },
  { id: 'Pos_UI_01', input: 'adha lab ekeedhi apita individual evaluation ekak karanna dhunnaa', expected: 'අද lab එකේදි අපිට individual evaluation එකක් කරන්න දුන්නා' },
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