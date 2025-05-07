public class resumeController {
    
    
    @AuraEnabled
    public static void sendEmail(String Name, String Email, String Message)
    {
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { 'jagabayeva@na.edu' });
        mail.setSubject('Hi I Tried Reaching you out!');
        mail.setPlainTextBody(Message);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        generateLead(Name,Message);
        
        System.debug(lead.Id + ' Lead Id is ');
    }
    
    public static void generateLead(String Name,String Message)
    {
        Lead lead = new Lead();
        lead.LastName = Name;
        lead.Company = 'Customer';
        lead.Description = Message;
        insert lead;
    }
}