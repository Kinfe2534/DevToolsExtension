// long lived connection with dev tools page
var connections = {};
chrome.runtime.onConnect.addListener(function (port) {
    var extensionListener = function (request, sender, sendResponse) {  
      // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (request.cmd== "onConnect") {
                  connections[request.tabId] = port;
                 // return;
                }  
            
                  try {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                      chrome.tabs.sendMessage(tabs[0].id,request, function(response) { 
                      });
                    })
                  }
                  catch (e) {
                    console.warn(e);}
  }
    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);
        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });
});
// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});
// receive message from devetools and relay to content script
// action button listener 
chrome.action.onClicked.addListener(async tab => {
  try {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id,{cmd:"log",content:"message to log from dev tools with tab id..."}, function(response) {
    
      });
    })
  }
  catch (e) {
    console.warn(e);
  }
});
// context menu ["page", "selection", "image", "link"]
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      "title": "Select for Magpie Hatchery",
      "contexts": ["all"],
      "id": "myContextMenuId"
  });
});
  
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  try {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0].id) {
    var tabId = tabs[0].id;
    if (tabId in connections) {
      connections[tabId].postMessage({cmd:"make_with_click"});
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("tab not defined.");
  }
  return true;
    })
  }
  catch (e) {
    console.warn(e);}
})