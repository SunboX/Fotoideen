Ext.define('App.model.TopicAndKeyword', {
    extend: 'Ext.data.Model',
    fields: ['id', 'topic','keyword'],
    proxy: {
        type: 'localstorage',
        id  : 'keywords-list'
    }
});