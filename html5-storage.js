function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
if (supports_html5_storage()) {
    console.log('window.localStorage is available!');
} else {
    console.log('no native support for HTML5 storage :(');
}