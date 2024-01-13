import { LightningElement, track, api } from "lwc";
import {NavigationMixin} from 'lightning/navigation'
import siteImage from "@salesforce/resourceUrl/siteImage";
import getProduct from "@salesforce/apex/ProductHandler.getProduct";
export default class ProductPage extends NavigationMixin(LightningElement) {
  i1 = `${siteImage}/siteImage/i1.jpg`;
  i2 = `${siteImage}/siteImage/i2.jpg`;
  i3 = `${siteImage}/siteImage/i3.jpg`;
  i4 = `${siteImage}/siteImage/i4.jpg`;
  i5 = `${siteImage}/siteImage/i5.jpg`;
  i6 = `${siteImage}/siteImage/i6.jpg`;
  i7 = `${siteImage}/siteImage/i7.jpg`;
  i8 = `${siteImage}/siteImage/i8.jpg`;
  i9 = `${siteImage}/siteImage/i9.jpg`;
  i10 = `${siteImage}/siteImage/i10.jpg`;
  i11 = `${siteImage}/siteImage/i11.jpg`;
  logo = `${siteImage}/siteImage/logo.png`;
  login = `${siteImage}/siteImage/login.png`;
  user = `${siteImage}/siteImage/user.png`;
  phone = `${siteImage}/siteImage/phone.png`;
  back = `${siteImage}/siteImage/back.png`;
  support = `${siteImage}/siteImage/customer-support.png`;
  delivery = `${siteImage}/siteImage/delivery.png`;
  payment = `${siteImage}/siteImage/payment-method.png`;
  trust = `${siteImage}/siteImage/trust.png`;
  forward = `${siteImage}/siteImage/forward.png`;

  @api products = [
    {
      image: this.i1,
      name: "lorem1",
      price: 100,
    },
    {
      image: this.i2,
      name: "lorem2",
      price: 100,
    },
    {
      image: this.i7,
      name: "lorem3",
      price: 100,
    },
    {
      image: this.i10,
      name: "lorem4",
      price: 100,
    },
    {
      image: this.i10,
      name: "lorem5",
      price: 100,
    },
    {
      image: this.i4,
      name: "lorem6",
      price: 100,
    },
    {
      image: this.i5,
      name: "lorem7",
      price: 100,
    },
  ];
   @api tryproducts = [
      {
        name: "lorem1",
        price: 100,
        count: "2",
      },
      {
              name: "lorem1",
              price: 100,
              count: "2",
            },
            {
                    name: "lorem1",
                    price: 100,
                    count: "2",
                  },
                  {
                            name: "lorem1",
                            price: 100,
                            count: "2",
                          },
    ];

  @track siteProducts = [];

  connectedCallback() {
    this.productData();
    let storedCartList = localStorage.getItem("cartList");
    if (storedCartList) {
      this.cartList = JSON.parse(storedCartList);
    }
  }

  productData() {
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
  formatProducts(siteProducts) {
    return siteProducts.map((siteProducts) => {
      return {
        id: siteProducts.Id,
        price: siteProducts.Price__c,
        catagory: siteProducts.Catagory__c,
        name: siteProducts.Site_Name__c,
      };
    });
  }
  @track cartList = [];
  get numberofItemOnCart() {
    return this.cartList.length;
  }

  addToCart = (event) => {
    const cartpopOpen = this.template.querySelector(".cartPopSection");
    cartpopOpen.style.display = "block";
    event.preventDefault();
    let productId = event.target.dataset.productid;
    let productName = event.target.dataset.productname;
    let productPrice = event.target.dataset.productprice;

    // Ürünü cartList içinde arayın
    const existingProductIndex = this.cartList.findIndex(
      (item) => item.id === productId
    );

    // Eğer ürün zaten varsa sayısını artırın, aksi takdirde yeni bir öğe olarak ekleyin
    if (existingProductIndex !== -1) {
      this.cartList[existingProductIndex].count++;
    } else {
      this.cartList.push({
        id: productId,
        name: productName,
        price: productPrice,
        count: 1,
      });
    }
    console.log(JSON.stringify(this.cartList));
    localStorage.setItem("cartList", JSON.stringify(this.cartList));

  };

  removeFromCart(productIdToRemove) {
    this.cartList = this.cartList.filter(
      (item) => item.id !== productIdToRemove
    );
  }

  handleRemoveButtonClick(event) {
    let productIdToRemove = event.target.dataset.productid; // Silinecek ürünün ID'sini al
    this.removeFromCart(productIdToRemove); // removeFromCart fonksiyonunu çağır
  }

  popcartClose() {
    const cartpopClose = this.template.querySelector(".cartPopSection");
    cartpopClose.style.display = "none";
  }
  get popTotal() {
    return this.cartList.reduce(
      (total, product) => total + parseFloat(product.price * product.count),
      0
    );
  }

   handleOrderChange(event) {
          // Seçilen değeri al
          const selectedValue = event.target.value;

          // Seçilen değere göre işlem yap
          switch (selectedValue) {
              case "default":
                  // Default durumunu işle
                  console.log("Default selected");
                  break;
              case "decPrice":
                  // Decreasing price durumunu işle
                  console.log("Decreasing price selected");
                  break;
              case "incPrice":
                  // Increasing price durumunu işle
                  console.log("Increasing price selected");
                  break;
              case "comment":
                  // Number of comments durumunu işle
                  console.log("Number of comments selected");
                  break;
              case "favorited":
                  // Most favorited durumunu işle
                  console.log("Most favorited selected");
                  break;
              case "selling":
                  // Best selling durumunu işle
                  console.log("Best selling selected");
                  break;
              default:
                  // Varsayılan durumu işle
                  console.log("Unknown selection");
          }
      }

      navigateProductDetail(event){
          let productDetailId=event.currentTarget.dataset.productid

          this[NavigationMixin.Navigate]({
              type: "standard__webPage",
              attributes:{
                  url: '/productdetail?productId=' + productDetailId,
              },

          });
      }


}
