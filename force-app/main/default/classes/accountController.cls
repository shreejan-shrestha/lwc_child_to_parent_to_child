public with sharing class accountController {
    @AuraEnabled(cacheable=true)
    public static List<Account>  searchName(String searchKey){
            String newSearchKey = '%'+searchKey+'%';
            return [SELECT Id, Name, Type, Rating, Phone, Website, AnnualRevenue FROM Account WHERE Name LIKE :newSearchKey];
    }
}
