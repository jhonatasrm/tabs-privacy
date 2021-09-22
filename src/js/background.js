var arrayTabsIds = [];
var tabs = '';
var status = "true";

/* query for opened tabs */
let querying = browser.tabs.query({});
querying.then(logTabs);

/* click action */
browser.browserAction.onClicked.addListener(actionClick);

/*
    Tabs that are pinned cannot be hidden.
    Tabs that are sharing the screen, microphone or camera cannot be hidden.
    The current active tab cannot be hidden.
    Tabs that are in the process of being closed cannot be hidden.
*/
function actionClick() {
  logTabs(tabs);
  if(status == "true") {
    browser.tabs.hide(arrayTabsIds);
    status = "false";
  } else {
    browser.tabs.show(arrayTabsIds);
    status = "true";
  }
}

function logTabs(tabs) {
  for (let tab of tabs) {
    arrayTabsIds.push(tab.id);
  }
}
