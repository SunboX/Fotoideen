Ext.define('App.model.Spreadsheet', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cols'},
        {name: 'rows'}
    ],
    proxy: {
        type: 'google-spreadsheet-api',
        url: 'https://spreadsheets.google.com/tq?key=0AqSNciwmshHBdDU3d1JOeDV4RXh3TXdjMTNIUDczalE&gid=0',
        reader: {
            type: 'json',
            root: function(data) {
                return data.table;
            }
        }
    }
});