Ext.define('App.store.Keyword', {
    extend  : 'Ext.data.JsonStore',
    model   : 'App.model.Keyword',
    requires: ['App.model.Keyword'],
    //sorters: 'keyword',
    data: [],
    autoLoad: true
});