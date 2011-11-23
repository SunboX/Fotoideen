Ext.define('App.model.Keyword', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'keyword', sortType: function(x) { return x.toLowerCase(); }}
    ]
});