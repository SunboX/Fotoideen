Ext.Loader.setConfig({
    enabled: true,
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