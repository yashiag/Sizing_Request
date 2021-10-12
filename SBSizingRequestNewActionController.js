({
    
     doInit : function(component, event, helper) {
     
         if(component.get("v.modalContext") != "Clone"){
            component.set("v.modalContext", "New");
        }		
     
        var showdialog = component.get("v.showDialog");
        if(showdialog == undefined || showdialog == "true"){
            helper.showHideModal(component, event);
        }
    },
    
    
      handleOnSubmit : function(component, event, helper) {     
        var sizingRequestObj = component.get("v.SizingRequestMap");
        var newMap = {
            RecordId: component.get("v.recordId"),
            AccountId: component.find("accountIdString").get("v.value"), 
          OpportunityId: component.find("opptyId").get("v.value") ,
            //RequestType: component.find("reqType").get("v.value"),
            CompanyDomain: component.find("companyDomain").get("v.value"),
            AdditionalInfo: component.find("additionalInfo").get("v.value"),
            CompanySubsidiaries: component.find("companySubsidiaries").get("v.value")
        };
        Object.assign(sizingRequestObj, newMap);
        
        if(component.get("v.modalContext") == 'Clone' || component.get("v.modalContext") == 'New'){
            //component.set("v.evalRequest.Id",undefined);
            //component.set("v.recordId",undefined);
        }       
        
        if(component.get("v.modalContext") == "New" || component.get("v.modalContext") == "Clone"){
            helper.upsertSizingRequest(component,event, sizingRequestObj);                   
       }
        if(component.get("v.modalContext") == "Edit"){
           helper.upsertSizingRequest(component,event, sizingRequestObj);
       }
        
    },
      cancelDialog : function(component, event, helper) {
        helper.showHideModal(component, event, undefined);
        var opptyId = component.get("v.recordId");
        if(opptyId != undefined ) {
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": opptyId
            });
            navEvt.fire();
        }
        else{
            window.history.back();
        }
    },
    
    
 showSpinner: function(component, event, helper) {
        component.set("v.IsSpinner",true);
        component.set("v.shouldHideSpinner", false);
    },
    
    
     hideSpinner: function(component,event,helper){
        component.set("v.shouldHideSpinner", true);
        setTimeout(function(){
            var shouldHideSpinner = component.get("v.shouldHideSpinner");
            if(shouldHideSpinner){
                component.set("v.IsSpinner",false);
            }
        }, 1000);
    },
     toggleDialog : function(component, event, helper) {
        helper.showHideModal(component, event);
    }
    
})
