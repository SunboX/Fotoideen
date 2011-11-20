if(!Ext.ux.touch) 
    Ext.ux.touch = {};

Ext.applyIf(String, {
    format : function(format){
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});

Ext.ux.touch.DurationSelect = Ext.extend(Ext.form.Select, {
    dayText: 'Day',
    hourText: 'Hour',
    minuteText: 'Minute',
    secondsText: 'Second',
    
    showDay: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    
    getPicker: function() {
        if (!this.picker) {
            var slots = [];
        
            if(this.showDay){
                slots.push({
                    name: 'day',
                    align: 'center',
                    title: this.useTitles ? this.dayText : false,
                    valueField  : this.valueField,
                    displayField: this.displayField,
                    value       : this.getValue().day,
                    items: (function(){
                        var ret = [];
                        for(var i = 0; i < 364; i++)
                            ret.push({text: i, value: i});
                        return ret;
                    })()
                });
            }
    
            if(this.showHour){
                slots.push({
                    name: 'hour',
                    align: 'center',
                    title: this.useTitles ? this.hourText : false,
                    valueField  : this.valueField,
                    displayField: this.displayField,
                    value       : this.getValue().hour,
                    items: (function(){
                        var ret = [];
                        for(var i = 0; i < 24; i++)
                            ret.push({text: i, value: i});
                        return ret;
                    })()
                });
            }
    
            if(this.showMinute){
                slots.push({
                    name: 'minute',
                    align: 'center',
                    title: this.useTitles ? this.minuteText : false,
                    valueField  : this.valueField,
                    displayField: this.displayField,
                    value       : this.getValue().minute,
                    items: (function(){
                        var ret = [];
                        for(var i = 0; i < 60; i++)
                            ret.push({text: i, value: i});
                        return ret;
                    })()
                });
            }
    
            if(this.showSecond){
                slots.push({
                    name: 'second',
                    align: 'center',
                    title: this.useTitles ? this.secondText : false,
                    valueField  : this.valueField,
                    displayField: this.displayField,
                    value       : this.getValue().second,
                    items: (function(){
                        var ret = [];
                        for(var i = 0; i < 60; i++)
                            ret.push({text: i, value: i});
                        return ret;
                    })()
                });
            }
            
            this.picker = new Ext.Picker({
                slots: slots,
                listeners: {
                    change: this.onPickerChange,
                    hide: this.onPickerHide,
                    scope: this
                }
            });
        }

        return this.picker;
    },
    
    onOrientationChange: function() {},

    showComponent: function() {
        console.log('DurationPicker::show()');
        this.getPicker().show();
        this.isActive = true;
    },
    
    setValue: function(value, animated) {
        if (Ext.isString(value)) {
            var regexp = [],
            di = hi = mi = si = 0;
            if(this.showDay){
                regexp.push('(\\d+) Day(s){0,1}');
                di++;
                hi += 2;
                mi += 2;
                si += 2;
            }
            if(this.showHour){
                regexp.push('(\\d+)h');
                hi++;
                mi++;
                si++;
            } else hi = 0;
            if(this.showMinute){
                regexp.push('(\\d+)m');
                mi++;
                si++;
            } else mi = 0;
            if(this.showSecond){
                regexp.push('(\\d+)s');
                si++;
            } else si = 0;
            
            var match = value.match(new RegExp(regexp.join(' ')));
            
            if(!match)
                return false;
            
            value = {};
            if(di != 0)
                value.day = match[di];
            if(hi != 0)
                value.hour = match[hi];
            if(mi != 0)
                value.minute = match[mi];
            if(si != 0)
                value.second = match[si];
        }
        
        if (this.durationPicker) {
            this.durationPicker.setValue(value, animated);
            this.value = (value != null) ? value : null;
        } else {
            if (!Ext.isObject(value)) {
                value = null;
            }
            this.value = value;
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }

        return this;
    },
    
    getValue: function(format) {
        console.log('DurationPicker::getValue()');
        var value = this.value || null;
        
        if(format && value !== null){
            var ret = [];
            if(this.showDay){
                ret.push(String.format('{0} Day{1}', value.day, (value.day == 1 ? '' : 's')));
            }
            if(this.showHour){
                ret.push(String.format('{0}h', value.hour));
            }
            if(this.showMinute){
                ret.push(String.format('{0}m', value.minute));
            }
            if(this.showSecond){
                ret.push(String.format('{0}s', value.second));
            }
            value = ret.join(' ');
        }
        return value;
    }
});

Ext.reg('durationselectfield', Ext.ux.touch.DurationSelect);
