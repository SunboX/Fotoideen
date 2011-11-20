
  
Ext.define('App.controller.AppController', {
    
    extend: 'Ext.app.Controller',
    currentLanguage: 'en',

    config: {
        profile: Ext.os.deviceType.toLowerCase()
    },
    
    views: [
        'Calculator'
    ],
    
    stores: [
        
    ],
    
    refs: [
        {
            ref       : 'calculator',
            selector  : 'calculator',
            xtype     : 'calculator',
            autoCreate: true
        }
    ],

    init: function() {
        this.getCalculatorView().create().show();
        
        this.control({
            'calculator': {
                select: this.onMainMenuListTap,
                pick: this.onLanguageSelected,
                tap: this.backToMainMenu
            }
        });
    },

	onLaunch: function() {
		//console.log('onLaunch app controller');
		
        this.getMainMenuStore().on({
            scope: this,
            load: this.onMainMenuLoad  
        });
    },
	
	onMainMenuLoad: function() {
        //console.log('onMainMenuLoad app controller');
        // get a reference to the view component
        //var mainMenu = this.getMainMenu();
        // do something
    },
    
	backToMainMenu: function() {
        var main = this.getMain();
        
        this.getMainMenuList().deselectAll();

        main.getLayout().getAnimation().setReverse(true);
        main.setActiveItem(this.getMainMenu());
    },

    onMainMenuListTap: function(theList, record) {
        var id = parseInt(record.get('id'));
        this.getMain().getLayout().getAnimation().setReverse(false);
        
        switch(id){
            case 2: // SehenswÃ¼rdigkeiten
                if (!this.getPoi()) {
                    this.getPoiView().create();
                }
                this.getMain().setActiveItem(this.getPoi());
                break;
            
            default:
                if (!this.getBlank()) {
                    this.getBlankView().create();
                }
                this.getMain().setActiveItem(this.getBlank());
                
        }
        
        /*
        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }
        */
    },

    onSelectLangTap: function(btn) {
        this.getSelectLang().show();
    },

    onLanguageSelected: function(picker, item, slot, options) {
        this.currentLanguage = item.lang;
        Ext.getCmp('selectLangBtn').setHtml('<div class="lang-icon lang-' + item.lang + '"></div>');
        picker.hide();
    },
    
    calcRealTime: function(shots, interval){
        if(interval > 0){
            var totalRealSeconds = shots * interval;
            var totalRealMinutes = totalRealSeconds / 60;
            var totalRealHours = totalRealMinutes / 60;
            var totalRealDays = totalRealHours / 24;
            var totalRealHoursRemainder = totalRealHours % 24;
            var totalRealMinutesRemainder = totalRealMinutes % 60;
            var totalRealSecondsRemainder = totalRealSeconds % 60;
                
            App.selectShootingDuration.setValue({
                day: Math.floor(totalRealDays),
                hour: Math.floor(totalRealHoursRemainder),
                minute: Math.floor(totalRealMinutesRemainder),
                second: Math.round(totalRealSecondsRemainder)
            }, false);
        }
    },
    
    calcPlaybackTime: function(shots, fps){
        if(fps > 0){
            var totalPlaybackSeconds = shots / fps;
            var totalPlaybackMinutes = totalPlaybackSeconds / 60;
            var totalPlaybackHours = totalPlaybackMinutes / 60;
            var totalPlaybackMinutesRemainder = totalPlaybackMinutes % 60;
            var totalPlaybackSecondsRemainder = totalPlaybackSeconds % 60;
            
            App.selectPlaybackDuration.setValue({
                hour: Math.floor(totalPlaybackHours),
                minute: Math.floor(totalPlaybackMinutesRemainder),
                second: Math.round(totalPlaybackSecondsRemainder)
            }, false);
        }
    },
    
    playbackCentric: function(hrs, mins, secs, interval, fps){
        var shots = (hrs * (60 * 60 * fps)) + (mins * (60*fps)) + (secs * fps);
        App.calcRealTime(shots, interval);
        App.selectShots.setValue(Math.round(shots), false);
    },

    shootCentric: function(days, hrs, mins, secs, interval, fps){
        var seconds = (days * 24 * 60 * 60) + (hrs * 60 * 60) + (mins * 60) + secs;
        var shots = seconds / interval;
        App.calcPlaybackTime(shots, fps);
        App.selectShots.setValue(Math.round(shots), false);
    },
    
    updateSettings: function(interval, shots, fps){
        if(interval > 0 && fps > 0){
            App.calcRealTime(shots, interval);
            App.calcPlaybackTime(shots, fps);
        }
        if(fps < 1){
            App.selectPlaybackDuration.setValue({
                hour: 0,
                minute: 0,
                second: 0
            }, false);
        }               
        if(interval < 1 || fps < 1){
            App.selectShootingDuration.setValue({
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
            }, false);
        }
    },
    
    updatePlayback: function(hours, minutes, seconds, interval, fps){
        if(fps > 0){
            App.playbackCentric(hours, minutes, seconds, interval, fps);
        } else {
            App.selectPlaybackDuration.setValue({
                hour: 0,
                minute: 0,
                second: 0
            }, false);
            // Info Box
            //self.informationMessage(DemoImpl.PLAYBACK_MESSAGE, DemoImpl.PLAYBACK_DURATION_LABEL)
        }
    },
    
    updateShoot: function(days, hours, minutes, seconds, interval, fps){
        if(interval > 0){
            App.shootCentric(days, hours, minutes, seconds, interval, fps);
        } else {
            App.selectShootingDuration.setValue({
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
            }, false);
            // Info Box
            //self.informationMessage(DemoImpl.SHOOTING_MESSAGE, DemoImpl.SHOOTING_DURATION_LABEL)
        }
    },
    
    reset: function(){
        App.selectInterval.setValue(10);
        App.selectShots.setValue(1000);
        App.selectFps.setValue(24);
        App.updateSettings(10, 1000, 24);
    }
});

