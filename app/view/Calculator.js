
Ext.define('App.view.Calculator', {
    extend: 'Ext.Panel',
    
    config: {
        layout: {
            type: 'fit'
        },
        fullscreen: true,
        items: [
            {
                xtype: 'formpanel',
                id: 'timelapse-form',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Settings',
                        items: [
                            {
                                xtype: 'selectfield',
                                name: 'interval',
                                label: 'Interval',
                                useTitles: true,
                                options: (function(){
                                    var ret = [];
                                    for(var i = 1; i <= 100; i++)
                                        ret.push({text: i + 's', value: i});
                                    return ret;
                                })()
                            },
                            {
                                xtype: 'selectfield',
                                name: 'shots',
                                label: 'Shots',
                                useTitles: true,
                                options: (function(){
                                    var ret = [];
                                    for(var i = 1; i <= 10000; i += 10)
                                        ret.push({text: i, value: i});
                                    return ret;
                                })()
                            },
                            {
                                xtype: 'selectfield',
                                name: 'fps',
                                label: 'FPS',
                                useTitles: true,
                                options: (function(){
                                    var ret = [];
                                    for(var i = 1; i <= 60; i++)
                                        ret.push({text: i, value: i});
                                    return ret;
                                })()
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Shooting Duration',
                        items: [
                            {
                                xtype: 'selectfield',
                                name: 'shooting-duration',
                                label: 'Duration'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Playback Duration',
                        items: [
                            {
                                xtype: 'selectfield',
                                name: 'playback-duration',
                                label: 'Duration'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});