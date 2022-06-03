
import { LightningElement, api, wire, track } from 'lwc';

export default class Card extends LightningElement {

    searchKey;

    handleEvent(event){
        this.searchKey = event.detail;
        this.template.querySelector('c-datatable').setKeyValue(this.searchKey);
        console.log('card' , this.searchKey);
        
    }

}