Ext.define('App.view.Info', {
    extend: 'Ext.Panel',
    xtype : 'info',
    
    
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'center'
        },
        scroll: 'vertical',
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
            },
            {
                type: 'hbox',
                pack: 'center',
                align: 'center',
                padding: 20,
                items: [{
                    xtype: 'panel',
                    html: 'Diese App soll dir dabei helfen neue Sichtweisen zu entwickeln und über Kreativitätslöcher hinweg helfen.<br/>' +
                          'Versuche dazu jedes Stichwort fotografisch umzusetzen (einfach). Wenn du es etwas schwieriger magst, kannst du auch versuchen alle Stichworte mit einem Foto zu verwirklichen.<br/><br/>' +
                          'Die Kategorien und Stichworte können von jedem (auch dir! ;o)) erweitert und/oder verbessert werden. Du findest die entsprechende Excel-Tabelle hier:<br/>' +
                          '<a href="#" class="open-google-spreadsheet" target="_blank">➛ Öttp://goo.gl/U5ikE</a><br/><br/>' +
                          'Alle Änderungen in dieser Tabelle werden nach einem Neustart dieser App sichtbar.'
                }]
            }
        ]
	},
    
    initialize: function() {
        //listen to the painted event
        this.on('painted', 'onPainted');
    },
    
    //when the component is painted
    onPainted: function() {
        
        // get reference to the containing panel (tab)
        var panel = this.items.get(1);
        
        panel.getEl().on({
            click: function(e){
                e.stopEvent();
                location.href = 'newtab:' + escape('https://docs.google.com/spreadsheet/ccc?key=0AqSNciwmshHBdDU3d1JOeDV4RXh3TXdjMTNIUDczalE&hl=de');
            },
            delegate: 'a.open-google-spreadsheet'
        });
    }
});