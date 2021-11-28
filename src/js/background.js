var arrayTabsIds = [];
var tabs = '';
var myStorage = window.localStorage;
myStorage.setItem("status", "false");

/* gets current theme to set toolbar icon */
getCurrentThemeInfo();

/* calls when the theme is changed */
browser.theme.onUpdated.addListener(getCurrentThemeInfo);

/* query for opened tabs */
let querying = browser.tabs.query({});
querying.then(logTabs);

/* click action */
browser.browserAction.onClicked.addListener(actionClick);

/* onCreated */
browser.tabs.onCreated.addListener(handleCreated);

/* onRemoved */
browser.tabs.onRemoved.addListener(
  (tabId) => { handleRemoved(tabId, true);
});
/*
    Tabs that are pinned cannot be hidden.
    Tabs that are sharing the screen, microphone or camera cannot be hidden.
    The current active tab cannot be hidden.
    Tabs that are in the process of being closed cannot be hidden.
*/
function actionClick() {
  getCurrentThemeInfo(true);
}

function logTabs(tabs) {
  for (let tab of tabs) {
    arrayTabsIds.push(tab.id);
  }
}

function handleCreated(tab) {
  if(!arrayTabsIds.includes(tab.id)){
      arrayTabsIds.push(tab.id);
    }
}

function handleRemoved(tabId, isOnRemoved) {
  for( var i = 0; i < arrayTabsIds.length; i++){ 
    if ( arrayTabsIds[i] === tabId) { 
      arrayTabsIds.splice(i, 1); 
    }
  }
}

function getStyle(themeInfo) {
  if(myStorage.getItem("status") == "true") {
    browser.tabs.hide(arrayTabsIds);
    myStorage.setItem("status", "false");
      if(themeInfo.colors.frame.charAt(1) !== "f"){
        browser.browserAction.setIcon({
          path: "../res/icons/privacy_on_dark_icon.png",
        });
      }else {
        browser.browserAction.setIcon({
          path: "../res/icons/privacy_on_light_icon.png",
        });
      }
  } else {
    browser.tabs.show(arrayTabsIds);
    myStorage.setItem("status", "true");
    if(themeInfo.colors.frame.charAt(1) !== "f"){
      browser.browserAction.setIcon({
        path: "../res/icons/privacy_off_dark_icon.png",
      });
    }else {
      browser.browserAction.setIcon({
        path: "../res/icons/privacy_off_light_icon.png",
      });
    }
  }
}

async function getCurrentThemeInfo(clicked) {
  var themeInfo = await browser.theme.getCurrent();
  getStyle(themeInfo);
}
