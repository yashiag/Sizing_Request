({
     upsertSizingRequest : function(component, event, sizingRequestObj) {
      component.set("v.message","");        
        var action = component.get("c.saveSizingRequest");
        action.setParams({ 
            'sizingRequestMap' : sizingRequestObj
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.sizingRequest", response.getReturnValue());
                var recId = component.get("v.sizingRequest").Id;
                if (recId != undefined){
                    this.showHideModal(component,event);
                    /*var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                            "isredirect": true,
                            "recordId": recId
                    });
                    navEvt.fire();
                    $A.get('e.force:refreshView').fire();*/
                    window.setTimeout(
                        $A.getCallback(function() {
                             var navEvt = $A.get("e.force:navigateToSObject");
                            var showToast=$A.get("e.force:showToast");
                            navEvt.setParams({
                                "isredirect": true,
                                "recordId": recId
                            });
                            showToast.setParams({
                                
           						 "message": 'Sizing Request '+recId+' is Successfully Created',
            					 "duration":' 4000',
            					  "key": 'info_alt',
            					  "type": 'success',
           						  "mode": 'pester',
                               	  "recordId": recId

                            })
                            showToast.fire();
                            navEvt.fire();
                            
                            $A.get('e.force:refreshView').fire();
                        }), 2000
                    );
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            component.set("v.messageType","error");
                            component.set("v.message",errors[0].message);
                            alert(component.get("v.message"));
                        }
                    } else {
                        component.set("v.messageType","error");
                        component.set("v.message","Unknown error");
                    }
                }
            
        });
        
        
        $A.enqueueAction(action)
    },
    
    
    
	showHideModal : function(component,event) {
        var modal = component.find("editDialog");
        $A.util.toggleClass(modal, 'slds-fade-in-open');
        var overlay = component.find("overlay");
        $A.util.toggleClass(overlay, 'slds-backdrop--open');
        var showdialog = component.get("v.showDialog");
        if(showdialog != undefined && showdialog == "true"){
            component.set("v.showDialog","false");
        }
    },
    
    
     showMessage: function(component, event,_message,_type) {
        var resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "type":_type,
            "message": _message
        });            		
        resultsToast.fire();
    }     

})
