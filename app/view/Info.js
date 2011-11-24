
Ext.define('App.view.Info', {
    extend: 'Ext.Panel',
    xtype : 'info',
    
    config: {
        layout: {
            type: 'fit'
        },
        fullscreen: true,
        items: [
            {
                xtype: 'navigationbar',
                title: 'Info',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        align: 'left',
                        text: 'Zurück',
                        ui: 'back',
                        id: 'back-btn'
                    }
                ]
            }
        ]
    }
});