
Ext.define('App.view.Keywords', {
    extend: 'Ext.Panel',
    xtype : 'keywords',
    
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
                        align: 'left',
                        iconCls: 'info_plain',
                        iconMask: true,
                        id: 'show-info-btn'
                    },
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
                /*
                selectionModel: {
                    mode: 'MULTI'
                },
                */
                allowDeselect: true,
                itemTpl: '{keyword}'
            }
        ]
    }
});