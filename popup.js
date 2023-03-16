document.addEventListener('DOMContentLoaded', function() {

  let tumCerezleriSil=document.getElementById("tum-cerezleri-sil");
  tumCerezleriSil.addEventListener('click', removeAllCookieListener());

  // Reklam sayısını al ve popup.html'deki ilgili yerlere yerleştir
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {

    var tabId = tabs[0].id;
    chrome.cookies.getAllCookieStores(function(cookieStores) {
      console.log("cookieStores",cookieStores);
    });
    /*chrome.cookies.getAll({}, function(cookies) {
      var cookieList = document.getElementById('cookieList');
      console.log("cookieList",cookies);
      
      
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        console.log("cookie",cookie);
        var li = document.createElement('li');
        li.innerHTML = cookie.name + ' : ' + cookie.value;
        
        var button = document.createElement('button');
        button.innerText = 'Sil';
        button.addEventListener('click', createRemoveCookieListener(cookie));
        
        li.appendChild(button);
        cookieList.appendChild(li);
      }
    });
*/
/*
chrome.webNavigation.getAllFrames({
  tabId: tabs[0].id
}, function(details) {
  // Get unique list of URLs
  var urls = details.reduce(function(urls, frame) {
      if (urls.indexOf(frame.url) === -1)
          urls.push(frame.url);
      return urls;
  }, []);
  // Get all cookies
  var index = 0;
  var cookies = [];
  urls.forEach(function(url) {
      chrome.cookies.getAll({
          url: url
      }, function(additionalCookies) {
          cookies = cookies.concat(additionalCookies);
          if (++index === urls.length) {
              // Collected all cookies!
              // TODO: Use cookies.
              // Note: The array may contain duplicate cookies!

              for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                console.log("cookie",cookie);
                var li = document.createElement('li');
                li.innerHTML = cookie.name + ' : ' + cookie.value;
                
                var button = document.createElement('button');
                button.innerText = 'Sil';
                button.addEventListener('click', createRemoveCookieListener(cookie));
                
                li.appendChild(button);
                cookieList.appendChild(li);
              }
          }
      }); // chrome.cookies.getAll
  }); // urls.forEach
}); // chrome.webNavigation.getAllFrames
*/


let cookieList = document.getElementById('cookieList');
  chrome.cookies.getAllCookieStores(function(cookiestores) {
    let cookieStore = cookiestores.find(function(obj) {
      return obj.tabIds.includes(tabId);
    });
    chrome.cookies.getAll({ "storeId": cookieStore.id }, function(cookies) {
      console.log("cookiestr",JSON.stringify(cookies));
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let li = document.createElement('li');
        li.setAttribute("id",cookie.domain+ cookie.path+'-'+ cookie.name);
        li.innerHTML = cookie.domain+'-'+ cookie.name + ' : ' + cookie.value;
        
        let button = document.createElement('button');
        button.innerText = 'Sil';

        button.addEventListener('click', createRemoveCookieListener(cookie));
        
        li.appendChild(button);
        cookieList.appendChild(li);
      }
    });
  });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getAdCount' }, response => {
     /* if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
  */
      if (response && response.adCount) {
        document.getElementById('adCount').innerText = response.adCount;
  
        if (response.adCount === 0) {
          document.getElementById('status').innerText = 'No ads.';
          document.getElementById('status').style.color = 'green';
        } else {
          document.getElementById('status').innerText = 'Ad found.';
          document.getElementById('status').style.color = 'red';
        }
      }
    });
  });
});



function createRemoveCookieListener(cookie) {
  return function() {
    console.log("cookie",cookie);
    chrome.cookies.remove({
      url: "https://" +cookie.domain+ cookie.path,
      name: cookie.name
    }, function() {
      document.getElementById(cookie.domain+ cookie.path+'-'+ cookie.name).remove()
    });
  };
}

function removeAllCookieListener() {
  return function() {
    chrome.cookies.getAll({}, function(cookies) {
      console.log(cookies);
      for(var i=0; i<cookies.length;i++) {
        document.getElementById(cookies[i].domain+ cookies[i].path+'-'+ cookies[i].name).remove();
        chrome.cookies.remove({url: "https://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
      }
    });
  };
}

