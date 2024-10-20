// Loops through all elements in the document that have the 'data-manifest' attribute
document.querySelectorAll('[data-manifest]').forEach(element => {
    const manifestKey = element.dataset.manifest;
    if (manifestKey && Manifest[manifestKey]) {
        element.textContent = Manifest[manifestKey];
    }
});

// Loops through all elements in the document that have the 'data-i18n' attribute
document.querySelectorAll('[data-i18n]').forEach(element => {
    const i18nKey = element.dataset.i18n;
    
    if (i18nKey) {
        const message = browser.i18n.getMessage(i18nKey);
        if (message) {
            element.innerText = message;
        }
    }
});