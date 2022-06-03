import { LightningElement, api, track } from 'lwc';

export default class Search extends LightningElement {

    @track searchKey;

    handleKeyPress(event){
        this.searchKey = event.target.value;
        const childEvent = new CustomEvent('keypress', {
            detail: this.searchKey
        });

        console.log('search' , this.searchKey);
        this.dispatchEvent(childEvent);
    }
}