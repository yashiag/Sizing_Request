public class SBSizingRequestNewActionController {
 /**
    * @description : Upsert sizing request and invokes publish service
    * @param Map
    * @return Sizing request record
    */
    @AuraEnabled
    public static SizingRequest__c saveSizingRequest(Map<String, String> sizingRequestMap) {
        Boolean invokeCallout = false;
        SizingRequest__c newSizingReq = new SizingRequest__c();
        try {         
            System.debug('SBSizingRequestController.saveSizingRequest sizingRequestMap ' + sizingRequestMap);
            //Invoke callout only when sizing request is created. 
            if(sizingRequestMap.get('RecordId') == null && String.isBlank(sizingRequestMap.get('RecordId'))){  
                invokeCallout = true;
                newSizingReq.isPrimary__c = true;
            }
            newSizingReq.Id = sizingRequestMap.get('RecordId');
            newSizingReq.Account__c = sizingRequestMap.get('AccountId');
            System.debug('SBSizingRequestController.saveSizingRequest ---- ');
            if(sizingRequestMap.get('RecordId') == null || sizingRequestMap.get('RecordId') ==''){
              newSizingReq.Opportunity__c = sizingRequestMap.get('OpportunityId');
                newSizingReq.Status__c = 'In-progress';
            }
            //newSizingReq.Request_Type__c = sizingRequestMap.get('RequestType');
            newSizingReq.Company_Domains__c = sizingRequestMap.get('CompanyDomain');
            newSizingReq.AdditionalInfo__c = sizingRequestMap.get('AdditionalInfo');
            newSizingReq.Company_Subsidiaries__c = sizingRequestMap.get('CompanySubsidiaries');
            upsert newSizingReq;
            
           
            System.debug('SBSizingRequestController.saveSizingRequest ---- ' + newSizingReq);
            
            if(invokeCallout && newSizingReq != null){
                SBSizingRequestPublishService.sendCalloutREST(String.valueOf(newSizingReq.Id));
            }                                  
        } catch (Exception e) {
            // "Convert" the exception into an AuraHandledException
            throw new AuraHandledException('Error: ' + e.getMessage());    
        }
        
        return newSizingReq;
    }
}
