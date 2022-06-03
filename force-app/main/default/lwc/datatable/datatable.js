import { LightningElement, api, wire, track } from 'lwc';
import searchName from '@salesforce/apex/accountController.searchName';

export default class Datatable extends LightningElement {

    @track searchKey = '';
    @track accList;

    @track columns = [
        {
            label: 'Name', fieldName: 'AccountURL', type: 'url',
            typeAttributes: {
                label: {
                    fieldName: 'Name'
                },
                target: '_blank',
                sortable: true
            }
        },
        {
            label: 'Type',
            fieldName: 'Type',
            type: 'text',
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'Currency',
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',
            type: 'url',
            sortable: true
        },
        {
            label: 'Rating',
            fieldName: 'Rating',
            type: 'test',
            sortable: true
        }
    ];

    @wire(searchName)
    wiredAccounts() {
        searchName({ searchKey: this.searchKey }).then(response => {
            this.accList = response;
            // console.log(this.accList);
            let items = [];
            if (this.accList.length > 0) {
                this.accList.forEach(item => {
                    let itemToPush = {
                        AccountURL: '',
                        Name: '',
                        Type: '',
                        AnnualRevenue: '',
                        Phone: '',
                        Website: '',
                        Rating: ''
                    };

                    itemToPush.AccountURL = '/lightning/r/Account' + `/${item['Id']}/view`
                    itemToPush.Name = item['Name'];
                    itemToPush.Type = item['Type'];
                    itemToPush.AnnualRevenue = item['AnnualRevenue'];
                    itemToPush.Phone = item['Phone'];
                    itemToPush.Website = item['Website'];
                    itemToPush.Rating = item['Rating'];
                    items.push(itemToPush);
                })
                this.accList = items;
            }
        }).catch(error => {
            console.log('Error: ' + error);
        });
    }

    @api setKeyValue(keyValue) {
        this.searchKey = keyValue;
        console.log('setkey' , this.searchKey);
        this.searchList(this.searchKey);
        // console.log("set keyvalue " + this.searchTest);
    }

    searchList(searchKeyVal){
        searchName({searchKey: searchKeyVal})
        .then(results=>{
            this.accList = results;
            console.log('results' , results);
            let items = [];
            if (this.accList.length > 0) {
                this.accList.forEach(item => {
                    let itemToPush = {
                        AccountURL: '',
                        Name: '',
                        Type: '',
                        AnnualRevenue: '',
                        Phone: '',
                        Website: '',
                        Rating: ''
                    };
                    itemToPush.AccountURL = '/lightning/r/Account' + `/${item['Id']}/view`
                    itemToPush.Name = item['Name'];
                    itemToPush.Type = item['Type'];
                    itemToPush.AnnualRevenue = item['AnnualRevenue'];
                    itemToPush.Phone = item['Phone'];
                    itemToPush.Website = item['Website'];
                    itemToPush.Rating = item['Rating'];

                    // console.log(itemToPush.AnnualRevenue);

                    items.push(itemToPush);
                })
                this.accList = items;
            }
        })
        .catch(error=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}