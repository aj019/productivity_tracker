console.log("Background Started");

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      console.log('Current tab changed:', tab);
      let url = new URL(tab.url)
      let host = url.hostname
      let visitsJson = {}
      chrome.storage.sync.get(['visits'], function(result) {
        console.log(result);
        if (result.visits) {
            visitsJson = result.visits
        }
        // Store tab url and visits in storage
        if(visitsJson[host]) {
            visitsJson[host].count += 1
        } else {
            visitsJson[host] = {}
            visitsJson[host].count = 1
            visitsJson[host].image =  tab.favIconUrl;
        }
        console.log("visitsJson",visitsJson);
        chrome.storage.sync.set({ 'visits': visitsJson }, function() {
            console.log('Data saved: ' + data);
        });
      });
        

    });
  });