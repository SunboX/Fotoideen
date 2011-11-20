Ext.define('App.store.Spreadsheet', {
    extend  : 'Ext.data.Store',
    model   : 'App.model.Spreadsheet',
    requires: ['App.model.Spreadsheet'],
    
    autoLoad: true
});