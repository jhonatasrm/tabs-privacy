var arrayTabsIds = [];
var tabs = '';
var status = "true";
var myStorage = window.localStorage;
var iconLocalOff = "../res/icons/privacy_off.png";
var iconLocalOn = "../res/icons/privacy_on.png";

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
  if(status == "true") {
    browser.tabs.hide(arrayTabsIds);
    status = "false";
      browser.browserAction.setIcon({
        path: iconLocalOn,
      });
  } else {
    browser.tabs.show(arrayTabsIds);
    status = "true";
    browser.browserAction.setIcon({
      path: iconLocalOff,
    });
  }
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