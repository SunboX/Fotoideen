
  
Ext.define('App.controller.AppController', {
    
    extend: 'Ext.app.Controller',
    currentLanguage: 'en',

    config: {
        profile: Ext.os.deviceType.toLowerCase()
    },
    
    views: [
        'Main',
        'Keywords',
        'Info'
    ],
    
    stores: [
        'Spreadsheet',
        'Keyword',
        'CurrentList'
    ],
    
    refs: [
        {
            ref       : 'main',
            selector  : 'main',
            xtype     : 'main',
            autoCreate: true
        },
        {
            ref       : 'keywordList',
            selector  : 'main > list',
            autoCreate: true
        },
        {
            ref       : 'keywords',
            selector  : 'keywords'
        },
        {
            ref       : 'info',
            selector  : 'info'
        }
    ],
    
    firstRun: true,
    keywords: {},
    selectedTopic: -1,
    keywordCount: 3,

    init: function() {
        var me = this;
        
        me.getMainView().create().show();
        var topicData = [];
        
        var store = me.getCurrentListStore();
        store.load(); // aktuelle Liste aus DB laden
        if(store.getCount() > 0){
            me.firstRun = false;
            var data = [];
            store.each(function(record){
                data.push({
                    keyword: record.get('keyword')
                });
            });
            store = me.getKeywordStore();
            store.loadData(data);
            //store.sort('keyword', 'ASC');
            Ext.getCmp('main-list').refresh();
        }
        
        store = me.getSpreadsheetStore();
        store.getProxy().on({
            'exception': function(proxy, response, operation){
                /*
                if(response.message)
                    alert(response.message + ' [Fehler: ' + response.state + ']');
                else
                    alert('Fehler: ' + response.state);
                */
            }
        });
        var loaded = false;
        store.on({
            load: function(store, records, options){
                if(loaded) return;
                loaded = true;
                Ext.Array.each(records[0].get('rows'), function(row, i){
                    var currentKeyword = '';
                    Ext.Array.each(row.c, function(col, j){
                        if(i === 0 && j > 0){ // Topics
                            if(me.selectedTopic === -1)
                                me.selectedTopic = j;
                                
                            topicData.push({
                                text: col.v,
                                value: j
                            });
                            
                            me.keywords[j] = [];
                        } else {
                            if(j === 0){ // Keyword
                                currentKeyword = col.v;
                            } else if(col.v.toLowerCase() === 'x') {
                                me.keywords[j].push(currentKeyword);
                            }
                        }
                    });
                });
                
                if(me.firstRun)
                    me.refresList();
                
                me.picker = Ext.create('Ext.Picker', {
                    cancelButton: false,//'Abbrechen',
                    doneButton: 'Fertig',
                    slots: [
                        {
                            name : 'topic',
                            title: 'Bereich',
                            data : topicData
                        },
                        {
                            name : 'keywords',
                            title: 'Stichworte',
                            data : [
                                {text: '3', value: 3},
                                {text: '5', value: 5},
                                {text: '10', value: 10},
                                {text: '15', value: 15},
                                {text: '20', value: 20},
                                {text: '30', value: 30},
                                {text: '40', value: 40}
                            ]
                        }
                    ]
                });
                me.picker.on({
                    pick: function(picker, obj, slot, opts){
                        me.selectedTopic = obj.topic;
                        me.keywordCount = obj.keywords;
                        me.refresList();
                    },
                    show: function(picker, opts){
                        me.selectedTopicTmp = me.selectedTopic;
                        me.keywordCountTmp = me.keywordCount;
                    },
                    hide: function(picker, opts){
                        delete me.selectedTopicTmp;
                        delete me.keywordCountTmp;
                    },
                    cancel: function(picker, opts){
                        me.selectedTopic = me.selectedTopicTmp;
                        me.keywordCount = me.keywordCountTmp;
                        //picker.items.items[0].setSelectedNode(1);
                        me.refresList();
                    }
                });
                
                if(me.firstRun)
                    me.picker.show();
            }
        });
        
        store.load();
        
        this.control({
            '#show-picker-btn': {
                tap: me.showPicker
            },
            '#back-btn': {
                tap: this.backToKeywords
            },
            '#show-info-btn': {
                tap: this.showInfo
            },
            '#open-google-spreadsheet': {
                tap: this.openGoogleSpreadsheet
            }
        });
    },
    
    backToKeywords: function(){
        var main = this.getMain();
        main.getLayout().getAnimation().setReverse(true);
        main.setActiveItem(this.getKeywords());
    },
    
    showInfo: function(){
        var main = this.getMain();
        main.getLayout().getAnimation().setReverse(false);
        main.setActiveItem(this.getInfo());
    },
    
    openGoogleSpreadsheet: function(){
        window.open('https://docs.google.com/spreadsheet/ccc?key=0AqSNciwmshHBdDU3d1JOeDV4RXh3TXdjMTNIUDczalE&hl=de');
    },
    
    showPicker: function(){
        this.picker.show();
    },

    /*
	onLaunch: function() {
		//console.log('onLaunch app controller');
		
        this.getMainMenuStore().on({
            scope: this,
            load: this.onMainMenuLoad  
        });
    },
	*/
	refresList: function(){
        var me = this;
        var keywords = me.arrayShuffle(me.keywords[me.selectedTopic]).slice(0, me.keywordCount);
        var data = [];
        var store = me.getCurrentListStore();
        store.removeAll(); // Doesn´t work -> use getProxy().clear()
        store.getProxy().clear();
        Ext.Array.each(keywords, function(keyword){
            data.push({
                keyword: keyword
            });
            store.add({keyword: keyword});
        });
        store.sync(); // aktuelle Liste zwischenspeichern (dauerhaft)
        store = me.getKeywordStore();
        store.loadData(data);
        store.sort('keyword', 'ASC');
        Ext.getCmp('main-list').refresh();
	},
    
    arrayShuffle: function(array){
        var tmp, rand;
        for(var i =0; i < array.length; i++){
            rand = Math.floor(Math.random() * array.length);
            tmp = array[i]; 
            array[i] = array[rand]; 
            array[rand] = tmp;
        }
        return array;
    }
});

