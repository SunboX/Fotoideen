Ext.define('App.model.CurrentList', {
    extend: 'Ext.data.Model',
    fields: ['id', 'keyword'],
    proxy: {
        type: 'localstorage',
        id  : 'current-list'
    }
});