import getProduct from "@salesforce/apex/ProductHandler.getProduct";

export const siteProducts = [];
export function productData() {
                    getProduct()
                      .then((result) => {
                        this.siteProducts = this.formatProducts(result);
                        this.errors = undefined;
                      })
                      .catch((error) => {
                        this.siteProducts = undefined;
                        this.errors = JSON.stringify(error);
                      });
                  }
export function formatProducts(siteProducts) {
                    return siteProducts.map((siteProducts) => {
                      return {
                        id: siteProducts.Id,
                        price: siteProducts.Price__c,
                        catagory: siteProducts.Catagory__c,
                        name: siteProducts.Site_Name__c,
                      };
                    });
                  }

