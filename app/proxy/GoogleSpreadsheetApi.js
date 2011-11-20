Ext.define('App.proxy.GoogleSpreadsheetApi', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'google-spreadsheet-api',
    requires: ['App.data.GoogleSpreadsheetApi'],
    
    doRequest: function(operation, callback, scope) {
        //generate the unique IDs for this request
        var me      = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            params = request.params;

        if (operation.allowWrite()) {
            request = writer.write(request);
        }

        //apply JsonPProxy-specific attributes to the Request
        Ext.apply(request, {
            timeout: me.timeout,
            scope: me,
            disableCaching: false, // handled by the proxy
            callback: me.createRequestCallback(request, operation, callback, scope)
        });

        // prevent doubling up
        if (me.autoAppendParams) {
            request.params = {};
        }

        request.jsonp = App.data.GoogleSpreadsheetApi.request(request);
        // restore on the request
        request.params = params;
        operation.setStarted();
        me.lastRequest = request;

        return request;
    },

    processResponse: function(success, operation, request, response, callback, scope) {
        var me = this,
            reader,
            result;

        if (success === true) {
            reader = me.getReader();
        
            if (response.status === 'ok') {
                
                result = reader.read(response);
            
                //see comment in buildRequest for why we include the response object here
                Ext.apply(operation, {
                    response: response,
                    resultSet: result
                });

                operation.commitRecords(result.records);
                operation.setCompleted();
                operation.setSuccessful();
            } else {
                if(!!result.message)
                    operation.setException(result.message);
                else
                	operation.setException('State: ' + result.state);
                me.fireEvent('exception', this, response, operation);
            }
        } else {
            me.setException(operation, response);
            me.fireEvent('exception', this, response, operation);
        }

        //this callback is the one that was passed to the 'read' or 'write' function above
        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }

        me.afterRequest(request, success);
    }
});