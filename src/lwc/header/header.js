
import { LightningElement, track } from 'lwc';

export default class Header extends LightningElement {

    @track searchTerm;

    changeHandler(event){
        const inputData = event.target.value;
        this.searchTerm = inputData;
    }

    handleClick(event){
        localStorage.setItem("searchTerm", this.searchTerm);
        }

}