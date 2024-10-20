// Initialize variables
let arrayTabsIds = [];
const myStorage = window.localStorage;
myStorage.setItem("status", "true");

// Listen for browser commands
browser.commands.onCommand.addListener(function (command) {
  if (command === "toggle-feature") {
    actionClick();
  }
});

// Listen for theme updates
browser.theme.onUpdated.addListener(getAction);

// Fetch currently opened tabs
browser.tabs.query({}).then(logTabs);

// Listen for click action on browser action icon
browser.browserAction.onClicked.addListener(actionClick);

// Listen for tab creation and removal
browser.tabs.onCreated.addListener(handleCreated);
browser.tabs.onRemoved.addListener(handleRemoved);

// Handle click action
function actionClick() {
  getAction();
}

// Log tabs
function logTabs(tabs) {
  arrayTabsIds = tabs.map(tab => tab.id);
}

// Handle tab creation
function handleCreated(tab) {
  if (!arrayTabsIds.includes(tab.id)) {
    arrayTabsIds.push(tab.id);
  }
}

// Handle tab removal
function handleRemoved(tabId) {
  const index = arrayTabsIds.indexOf(tabId);
  if (index !== -1) {
    arrayTabsIds.splice(index, 1);
  }
}

// Apply style based on theme
async function getAction() {
  const status = myStorage.getItem("status") === "true";
  const iconPath = `../res/icons/privacy_${status ? "on" : "off"}.png`;

  // Fetch current tabs
  const tabs = await browser.tabs.query({});
  const arrayTabsIds = tabs.map(tab => tab.id);

  // Only hide or show if supported
  if (browser.tabs.hide && browser.tabs.show) {
    await browser.tabs[status ? 'hide' : 'show'](arrayTabsIds);
  }
  
  // Update status only if needed
  if (myStorage.getItem("status") !== String(!status)) {
    myStorage.setItem("status", String(!status));
    browser.browserAction.setIcon({ path: iconPath });
    const title = status ? "Tabs Privacy [ " + browser.i18n.getMessage("enabled") + " ]" : "Tabs Privacy [ " + browser.i18n.getMessage("disabled") + " ]";
    browser.browserAction.setTitle({ title });
  }
}