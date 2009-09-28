jQuery(function(){
    $(document).data("subs", []);
});

jQuery.sub = {
    options : { debug : false },
    reset:function(){
        this._debug('resetting');
        $(document).data("subs", []);
    },
    getSubscriptions:function(){
        this._debug('getting subscriptions');
        return $(document).data("subs");
    },
    subscribe:function(event, callback) {
        this._debug({'subscribing' : event, callback : callback});
        jQuery.sub.getSubscriptions().push({key: event, callback: callback})
    },
    publish:function(event, obj){
        this._debug({'publishing' : event, message : obj});
        subs = jQuery.sub.getSubscriptions();
        for (i=0; i<subs.length; i++){
            subscription = subs[i];
            if (subscription.key == event){
                subscription.callback(obj);
            }
        }
    },
    enableDebugger : function(){
        this.options.debug = true;
    },
    disableDebugger : function(){
        this.options.debug = false;
    },
    _debug : function($obj){
        if(!this.options.debug) {return;}
        if (window.console && window.console.log){
            window.console.log('[' + new Date() + '] sub.bus', $obj)
        }
    }
};
