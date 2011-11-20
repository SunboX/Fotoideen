Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'App': 'app'
    }
});

Ext.application({
    name: 'App',
    
    
    controllers: ['AppController'], 
    views: ['Calculator']
});
    

/*
    App.selectInterval.on('change', function(){
        App.updateSettings(
            App.selectInterval.getValue(),
            App.selectShots.getValue(),
            App.selectFps.getValue()
        );
    });
    App.selectShots.on('change', function(){
        App.updateSettings(
            App.selectInterval.getValue(),
            App.selectShots.getValue(),
            App.selectFps.getValue()
        );
    });
    App.selectFps.on('change', function(){
        App.updateSettings(
            App.selectInterval.getValue(),
            App.selectShots.getValue(),
            App.selectFps.getValue()
        );
    });
    App.selectShootingDuration.on('change', function(field){
        var value = field.getValue();
        App.updateShoot(
            value.day,
            value.hour,
            value.minute,
            value.second,
            App.selectInterval.getValue(),
            App.selectFps.getValue()
        );
    });
    App.selectPlaybackDuration.on('change', function(field){
        var value = field.getValue();
        App.updatePlayback(
            value.hour,
            value.minute,
            value.second,
            App.selectInterval.getValue(),
            App.selectFps.getValue()
        );
    });
*/