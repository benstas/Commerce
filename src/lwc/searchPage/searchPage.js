import { LightningElement, track } from 'lwc';
import findProduct from "@salesforce/apex/FindProductHandler.FindProduct";
import siteImage from "@salesforce/resourceUrl/siteImage";
export default class SearchPage extends LightningElement {
      i4 = `${siteImage}/siteImage/i4.jpg`;


    @track productResult = [];
    connectedCallback() {
        this.productSearchData();
//        if (storedSearchTerm) {
//            this.value = storedSearchTerm; // Değişiklik burada yapıldı
//
//        }
    }

    productSearchData() {
        var value = "dress";

        findProduct(value)
            .then((result) => {
                this.productResult = this.formatProducts(result);
                this.errors = undefined;
            })
            .catch((error) => {
                this.productResult = [];
                this.errors = JSON.stringify(error);
            });
    }

    async formatProducts(productResult) {
        // Bu kısımda 'await' kullanarak asenkron işlemi bekleyebilirsiniz
        return productResult.map(async (productResult) => {
            return {
                id: productResult.Id,
                price: productResult.Price__c,
                category: productResult.Catagory__c,
                name: productResult.Site_Name__c,
            };
        });
    }
}