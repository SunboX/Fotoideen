
Ext.define('App.view.Main', {
    extend: 'Ext.Panel',
    
    config: {
        layout: {
            type: 'fit'
        },
        fullscreen: true,
        items: [
            {
                xtype: 'navigationbar',
                title: 'Fotoideen',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        align: 'right',
                        text: 'Neue Liste',
                        id: 'show-picker-btn'
                    }
                ]
            },
            {
                xtype: 'list',
                id: 'main-list',
                store: 'Keyword',
                itemTpl: '{keyword}'
            }
        ]
    }
});