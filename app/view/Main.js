Ext.define('App.view.Main', {
    extend: 'Ext.Panel',
    xtype : 'main',
    
    requires: [
        'App.view.Keywords',
        'App.view.Info'
    ],

    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left'
            }
        },
        fullscreen: true,
        //cardSwitchAnimation: 'slide',
        activeItem: 0,
        items: [
            { xtype: 'keywords' },
            { xtype: 'info' }
        ]
    }
});