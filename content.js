chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getAdCount') {
    const pageContent = document.documentElement.innerHTML;
    const adProviders = [
      { name: 'Google Ads', url: 'ads.google.com' },
      { name: 'Google AdSense', url: 'google.com/adsense' },
      { name: 'Facebook Ads', url: 'facebook.com/business/ads' },
      { name: 'Bing Ads', url: 'bingads.microsoft.com' },
      { name: 'LinkedIn Ads', url: 'linkedin.com/ads' },
      { name: 'Twitter Ads', url: 'ads.twitter.com' },
      { name: 'AdRoll', url: 'adroll.com' },
      { name: 'Amazon Advertising', url: 'advertising.amazon.com' },
      { name: 'Snapchat Ads', url: 'forbusiness.snapchat.com' },
      { name: 'Pinterest Ads', url: 'pinterest.com/ads' },
      { name: 'Taboola', url: 'taboola.com' },
      { name: 'Outbrain', url: 'outbrain.com' },
      { name: 'Yahoo Gemini', url: 'gemini.yahoo.com' },
      { name: 'Media.net', url: 'media.net' },
      { name: 'ExoClick', url: 'exoclick.com' },
      { name: 'RevContent', url: 'revcontent.com' },
      { name: 'PropellerAds', url: 'propellerads.com' },
      { name: 'InMobi', url: 'inmobi.com' },
      { name: 'Adsterra', url: 'adsterra.com' },
      { name: 'Sovrn', url: 'sovrn.com' },
      { name: 'AdCash', url: 'adcash.com' },
      { name: 'AdColony', url: 'adcolony.com' },
      { name: 'Adform', url: 'adform.net' },
      { name: 'Adform', url: 'adform.com' },
      { name: 'AdFox', url: 'adfox.ru' },
      { name: 'AdGear', url: 'adgear.com' },
      { name: 'AdGlare', url: 'adglare.com' },
      { name: 'AdHitz', url: 'adhitz.com' },
      { name: 'AdKernel', url: 'adkernel.com' },
      { name: 'AdMaven', url: 'admaven.com' },
      { name: 'AdMob', url: 'admob.google.com' },
      { name: 'AdNow', url: 'adnow.com' },
      { name: 'AdOcean', url: 'adocean-global.com' },
      { name: 'AdPushup', url: 'adpushup.com' },
      { name: 'AdRecover', url: 'adrecover.com' },
      { name: 'AdRiver', url: 'adriver.ru' },
      { name: 'AdSense for Mobile Apps', url: 'google.com/ads/admob' },
      { name: 'AdSpeed', url: 'adspeed.com' },
      { name: 'AdSpirit', url: 'adspirit.de' },
      { name: 'AdSupply', url: 'adsupply.com' },
      { name: 'Adswizz', url: 'adswizz.com' },
      { name: 'AdTarget', url: 'adtarget.com.tr' },
      { name: 'AdTegrity', url: 'adtegrity.com' },
      { name: 'AdThrive', url: 'adthrive.com' },
      { name: 'AdUp', url: 'adup.tech' },
      { name: 'Advertise.com', url: 'advertise.com' },
      { name: 'Advertising.com', url: 'advertising.com' },
      { name: 'Adversal', url: 'adversal.com' },
      { name: 'AdView', url: 'adview.com' },
      { name: 'AdXpansion', url: 'adxpansion.com' },
      { name: 'Adzerk', url: 'adzerk.com' },
      { name: 'AerServ', url: 'aerserv.com' },
      { name: 'Amobee', url: 'amobee.com' },
      { name: 'AppLovin', url: 'applovin.com' },
      { name: 'AppNexus', url: 'appnexus.com' },
      { name: 'Appodeal', url: 'appodeal.com' },
      { name: 'Aptana', url: 'aptana.com' },
      { name: 'Atlas Solutions', url: 'atlassolutions.com' },
      { name: 'Audience Network', url: 'audience.network' },
      { name: 'Avid Media', url: 'avidglobalmedia.com' },
      { name: 'Bannerflow', url: 'bannerflow.com' },
      { name: 'BidVertiser', url: 'bidvertiser.com' },
      { name: 'BizzClick', url: 'bizzclick.com' },
      { name: 'BlogAds', url: 'blogads.com' },
      { name: 'BlueKai', url: 'bluekai.com' },
      { name: 'Bonzai', url: 'bonzai.co' },
      { name: 'BrightRoll', url: 'brightroll.com' },
      { name: 'Burst Media', url: 'burstmedia.com' },
      { name: 'BuySellAds', url: 'buysellads.com' },
      { name: 'C1X', url: 'c1exchange.com' },
      { name: 'Carbon Ads', url: 'carbonads.net' },
      { name: 'Casale Media', url: 'casalemedia.com' },
      { name: 'Chitika', url: 'chitika.com' },
      { name: 'Clicksor', url: 'clicksor.com' },
      { name: 'Clicktripz', url: 'clicktripz.com' },
      { name: 'Collective', url: 'collective.com' },
      { name: 'Commission Junction', url: 'cj.com' },
      { name: 'Conversant', url: 'conversantmedia.com' },
      { name: 'CPX Interactive', url: 'cpxi.com' },
      { name: 'Criteo', url: 'criteo.com' },
      { name: 'Datonics', url: 'datonics.com' },
      { name: 'DigiTrust', url: 'digitru.st' },
      { name: 'Digital Remedy', url: 'digitalremedy.com' },
      { name: 'DoubleClick', url: 'doubleclickbygoogle.com' },
      { name: 'Drawbridge', url: 'drawbridge.com' },
      { name: 'DynAdmic', url: 'dynadmic.com' },
      { name: 'engage:BDR', url: 'engagebdr.com' },
      { name: 'Epom', url: 'epom.com' },
      { name: 'eXelate', url: 'exelate.com' },
      { name: 'Eyereturn Marketing', url: 'eyereturn.com' },
      { name: 'Flashtalking', url: 'flashtalking.com' },
      { name: 'Fyber', url: 'fyber.com' },
      { name: 'Gourmet Ads', url: 'gourmetads.com' },
      { name: 'GumGum', url: 'gumgum.com' },
      { name: 'HIRO Media', url: 'hiro-media.com' },
      { name: 'Infolinks', url: 'infolinks.com' },
      { name: 'Inneractive', url: 'inner-active.com' },
      { name: 'Integral Ad Science', url: 'integralads.com' },
      { name: 'Intent IQ', url: 'intentiq.com' },
      { name: 'Intercept Interactive', url: 'interceptd.com' },
      { name: 'IronSource', url: 'ironsrc.com' },
      { name: 'Kargo', url: 'kargo.com' },
      { name: 'Kiip', url: 'kiip.me' },
      { name: 'Komli', url: 'komli.com' },
      { name: 'Krux', url: 'krux.com' },
      { name: 'LifeStreet Media', url: 'lifestreetmedia.com' },
      { name: 'LiveIntent', url: 'liveintent.com' },
      { name: 'LiveRamp', url: 'liveramp.com' },
      { name: 'LoopMe', url: 'loopme.com' },
      { name: 'Mars Media Group', url: 'marsmedia.com' },
      { name: 'MaxPoint', url: 'maxpoint.com' },
      { name: 'MediaBrix', url: 'mediabrix.com' },
      { name: 'MediaMath', url: 'mediamath.com' },
      { name: 'MGID', url: 'mgid.com' },
      { name: 'Millennial Media', url: 'millennialmedia.com' },
      { name: 'MoPub', url: 'mopub.com' },
      { name: 'MyTarget', url: 'target.my.com' },
      { name: 'Nativo', url: 'nativo.com' },
      { name: 'Nend', url: 'nend.net' },
      { name: 'NetSeer', url: 'netseer.com' },
      { name: 'NEXD', url: 'nexd.com' },
      { name: 'Next Performance', url: 'nextperf.com' },
      { name: 'NextRoll', url: 'nextroll.com' },
      { name: 'Oath', url: 'oath.com' },
      { name: 'Ogury', url: 'ogury.com' },
      { name: 'One by AOL', url: 'onebyaol.com' },
      { name: 'OneTag', url: 'onetag.com' },
      { name: 'OpenX', url: 'openx.com' },
      { name: 'Optimatic', url: 'optimatic.com' },
      { name: 'Perfect Audience', url: 'perfectaudience.com' },
      { name: 'Plista', url: 'plista.com' },
      { name: 'Pocketmath', url: 'pocketmath.com' },
      { name: 'Polar', url: 'polar.me' },
      { name: 'PopAds', url: 'popads.net' },
      { name: 'PowerLinks', url: 'powerlinks.com' },
      { name: 'PulsePoint', url: 'pulsepoint.com' },
      { name: 'Quantcast', url: 'quantcast.com' },
      { name: 'RadiumOne', url: 'radiumone.com' },
      { name: 'ReklamStore', url: 'reklamstore.com' },
      { name: 'Revcontent', url: 'revcontent.com' },
      { name: 'Revmob', url: 'revmobmobileadnetwork.com' },
      { name: 'RhythmOne', url: 'rhythmone.com' },
      { name: 'Rocket Fuel', url: 'rocketfuel.com' },
      { name: 'Rubicon Project', url: 'rubiconproject.com' },
      { name: 'SAY Media', url: 'saymedia.com' },
      { name: 'Sizmek', url: 'sizmek.com' },
      { name: 'Skimlinks', url: 'skimlinks.com' },
      { name: 'SmartyAds', url: 'smartyads.com' },
      { name: 'Sociomantic', url: 'sociomantic.com' },
      { name: 'Sovrn', url: 'sovrn.com' },
      { name: 'SpotX', url: 'spotx.tv' },
      { name: 'StartApp', url: 'startapp.com' },
      { name: 'SteelHouse', url: 'steelhouse.com' },
      { name: 'StrikeAd', url: 'strikead.com' },
      { name: 'taboola', url: 'taboola.com' },
      { name: 'Taptica', url: 'taptica.com' },
      { name: 'Tealium', url: 'tealium.com' },
      { name: 'Teads', url: 'teads.tv' },
      { name: 'The Trade Desk', url: 'thetradedesk.com' },
      { name: 'TradeDoubler', url: 'tradedoubler.com' },
      { name: 'Tremor Video', url: 'tremorvideo.com' },
      { name: 'TripleLift', url: 'triplelift.com' },
      { name: 'Triton Digital', url: 'tritondigital.com' },
      { name: 'TubeMogul', url: 'tubemogul.com' },
      { name: 'Turn', url: 'turn.com' },
      { name: 'Underdog Media', url: 'udmserve.net' },
      { name: 'Undertone', url: 'undertone.com' },
      { name: 'Unruly', url: 'unruly.co' },
      { name: 'ValueClick', url: 'valueclick.com' },
      { name: 'Vibrant Media', url: 'vibrantmedia.com' },
      { name: 'VideoAmp', url: 'videoamp.com' },
      { name: 'Vungle', url: 'vungle.com' },
      { name: 'WideOrbit', url: 'wideorbit.com' },
      { name: 'Xandr', url: 'xandr.com' },
      { name: 'Yahoo Gemini', url: 'gemini.yahoo.com' },
      { name: 'Yieldbot', url: 'yieldbot.com' },
      { name: 'Yieldmo', url: 'yieldmo.com' },
      { name: 'Zedo', url: 'zedo.com' },
      { name: 'ZypMedia', url: 'zypmedia.com' }
    ];
    
    
    
    
    
    const adKeywords = {
      en: ['ad', 'advert', 'advertisement', 'sponsored', 'promotion'],
      es: ['anuncio', 'publicidad', 'patrocinado', 'promoción'],
      zh: ['广告', '宣传', '推广', '赞助', '促销'],
      hi: ['विज्ञापन', 'प्रचार', 'संग्रहीत', 'प्रचार', 'पदोन्नति'],
      ar: ['إعلان', 'دعاية', 'راع', 'ترويج', 'تنشيط'],
      pt: ['anúncio', 'publicidade', 'patrocinado', 'promoção', 'divulgação'],
      bn: ['বিজ্ঞাপন', 'প্রচার', 'সমর্থিত', 'প্রমোশন', 'অভিযান'],
      ru: ['реклама', 'объявление', 'спонсорство', 'промоушен', 'акция'],
      ja: ['広告', '宣伝', 'スポンサー', 'プロモーション', '販促'],
      de: ['Anzeige', 'Werbung', 'gesponsert', 'Förderung', 'Aktion'],
      fr: ['annonce', 'publicité', 'sponsorisé', 'promotion', 'promotionnel'],
      tr: ['reklam', 'ilan', 'tanıtım', 'sponsorlu', 'promosyon'],
    };

    let adCount = 0;


  // Reklam sağlayıcıları kontrol et
  for (const provider of adProviders) {
    const providerInScripts = document.querySelectorAll(`script[src*="${provider.url}"]`);
    const providerInLinks = document.querySelectorAll(`a[href*="${provider.url}"], a[href*="${provider.name}"]`);
    adCount += providerInScripts.length + providerInLinks.length;
  }
  adProviders.forEach(adProvider => {
    if (pageContent.includes(adProvider.url)) {
      adCount++;
    }
  });

  // Çerezlerde reklam sağlayıcılarını kontrol et
  for (const provider of adProviders) {
    if (document.cookie.includes(provider.name) || document.cookie.includes(provider.url)) {
      adCount += 1;
    }
  }

  // Farklı dillerdeki reklam kelimelerini kontrol et
  const pageText = document.body.innerText;
  for (const language in adKeywords) {
    for (const keyword of adKeywords[language]) {
      const keywordRegExp = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = pageText.match(keywordRegExp);
      if (matches) {
        adCount += matches.length;
      }
    }
  }

    sendResponse({ adCount });
  }
});
