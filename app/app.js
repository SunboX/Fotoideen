var webappCache = window.applicationCache;
if(!!webappCache){
    webappCache.addEventListener('updateready', function(){
        webappCache.swapCache();
    }, false);
}

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'App': 'app'
    }
});
Ext.ClassManager.setAlias('App.proxy.GoogleSpreadsheetApi', 'proxy.google-spreadsheet-api');

Ext.application({
    name: 'App',
    
    controllers: ['AppController'], 
    views: ['Main'],
    models: ['Spreadsheet', 'Keyword', 'TopicAndKeyword', 'CurrentList']
});