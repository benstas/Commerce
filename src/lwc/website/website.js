import { LightningElement, wire, track } from 'lwc';
import siteImage from '@salesforce/resourceUrl/siteImage'
import getPopularProduct from "@salesforce/apex/ProductHandler.getPopularProduct";


export default class Website extends LightningElement {
    i1 = `${siteImage}/siteImage/i1.jpg`
    i2 = `${siteImage}/siteImage/i2.jpg`
    i3 = `${siteImage}/siteImage/i3.jpg`
    i4 = `${siteImage}/siteImage/i4.jpg`
    i5 = `${siteImage}/siteImage/i5.jpg`
    i6 = `${siteImage}/siteImage/i6.jpg`
    i7 = `${siteImage}/siteImage/i7.jpg`
    i8 = `${siteImage}/siteImage/i8.jpg`
    i9 = `${siteImage}/siteImage/i9.jpg`
    i10 = `${siteImage}/siteImage/i10.jpg`
    i11 = `${siteImage}/siteImage/i11.jpg`
    logo = `${siteImage}/siteImage/logo.png`
    login = `${siteImage}/siteImage/login.png`
    user = `${siteImage}/siteImage/user.png`
    phone = `${siteImage}/siteImage/phone.png`
    back = `${siteImage}/siteImage/back.png`
    support = `${siteImage}/siteImage/customer-support.png`
    delivery = `${siteImage}/siteImage/delivery.png`
    payment = `${siteImage}/siteImage/payment-method.png`
    trust = `${siteImage}/siteImage/trust.png`
    forward = `${siteImage}/siteImage/forward.png`


    imgs=[
        {"i":this.i1},
        {"i":this.i2},
        {"i":this.i3},
        {"i":this.i4},
        {"i":this.i5},
        {"i":this.i6},
        {"i":this.i7},
        {"i":this.i8},
        {"i":this.i1},
        {"i":this.i2},
        {"i":this.i3},
        {"i":this.i4},
        {"i":this.i5},
        {"i":this.i6},
        {"i":this.i7},
        {"i":this.i8},
    ]
    revimgs=[
            {"i":this.i8},
            {"i":this.i7},
            {"i":this.i6},
            {"i":this.i5},
            {"i":this.i3},
            {"i":this.i4},
            {"i":this.i5},
            {"i":this.i3},
            {"i":this.i3},
            {"i":this.i2},
            {"i":this.i1},
            {"i":this.i4},
            {"i":this.i5},
            {"i":this.i3},
            {"i":this.i4},
            {"i":this.i6},
        ]

    slides= [
            {
                "image":this.i1,
                "heading":"sss",
                "description":"Grow Up Your Driving Skills"
            },
            {
                "image":this.i2,
                "heading":"Learn To Drive With Confidence",
                "description":"Grow Up Your Driving Skills"
            },
            {
                "image":this.i3,
                "heading":'Learn To Drive With Confidence',
                "description":'Grow Up Your Driving Skills'
            }
        ]

        products = [
                {
                    image: this.i1,
                    name: "lorem1",
                    price: 100
                },
                {
                    image: this.i2,
                    name: "lorem2",
                    price: 100
                },
                {
                    image: this.i7,
                    name: "lorem3",
                    price: 100
                },
                {
                    image: this.i10,
                    name: "lorem4",
                    price: 100
                },
{
                    image: this.i10,
                    name: "lorem5",
                    price: 100
                },
{
                    image: this.i4,
                    name: "lorem6",
                    price: 100
                },
{
                    image: this.i5,
                    name: "lorem7",
                    price: 100
                },
            ];


            @track popularProducts = [];
            connectedCallback(){
                this.popularProductData();
            }
            popularProductData() {
                getPopularProduct()
                  .then((result) => {
                    this.popularProducts = this.formatProducts(result);
                    this.errors = undefined;
                  })
                  .catch((error) => {
                    this.popularProducts = undefined;
                    this.errors = JSON.stringify(error);
                  });
              }
              formatProducts(popularProducts) {
                return popularProducts.map((popularProducts) => {
                  return {
                    id: popularProducts.Id,
                    price: popularProducts.Price__c,
                    catagory: popularProducts.Catagory__c,
                    name: popularProducts.Site_Name__c,
                  };
                });
              }
              @track cartList = [];
              get numberofItemOnCart() {
                return this.cartList.length;
              }










    displayCatagory(event){
        const showcatagory = this.template.querySelector('.popMenu');
        const slider = this.template.querySelector('c-custom-carousel')
        showcatagory.style.height='85vh';
        slider.style.width='74%';
    }
    hideCatagory(event){
        const hidecatagory = this.template.querySelector('.popMenu');
        hidecatagory.style.height='0';
        const slider = this.template.querySelector('c-custom-carousel')
        slider.style.width='100%';
    }

   handleBackClick() {
       const viewportWidth = window.innerWidth; // Viewport genişliğini alır
       const scrollAmount = -0.30 * viewportWidth; // -900 değerine denk gelecek şekilde hesaplar
       this.scrollGallery(scrollAmount);
   }

   handleForwardClick() {
       const viewportWidth = window.innerWidth;
       const scrollAmount = 0.30 * viewportWidth;

       this.scrollGallery(scrollAmount);
   }
    scrollGallery(change) {
                     const gallery = this.template.querySelector('.gallery');
                     const startTime = performance.now();
                     const startScroll = gallery.scrollLeft;
                     const duration = 1000; // Geçiş süresi (ms) - 3 saniye olarak ayarlandı

                     function updateGallery(timestamp) {
                         const elapsed = timestamp - startTime;
                         gallery.scrollLeft = easeInOut(elapsed, startScroll, change, duration);

                         if (elapsed < duration) {
                             requestAnimationFrame(updateGallery);
                         }
                     }

                     function easeInOut(t, b, c, d) {
                         // Easing fonksiyonu (isteğe bağlı olarak kullanabilirsiniz)
                         t /= d / 2;
                         if (t < 1) return (c / 2) * t * t + b;
                         t--;
                         return (-c / 2) * (t * (t - 2) - 1) + b;
                     }

                     requestAnimationFrame(updateGallery);
                 }




//       --------------------------------------
       handleBackClick2() {
                  const viewportWidth = window.innerWidth; // Viewport genişliğini alır
                  const scrollAmount = -0.30 * viewportWidth; // -900 değerine denk gelecek şekilde hesaplar
              this.scrollGallery2(scrollAmount);
              }

              handleForwardClick2() {
              const viewportWidth = window.innerWidth; // Viewport genişliğini alır
              const scrollAmount = 0.30 * viewportWidth; // -900 değerine denk gelecek şekilde hesaplar

              this.scrollGallery2(scrollAmount);
              }

              scrollGallery2(change) {
                  const gallery2 = this.template.querySelector('.gallery2');
                  const startTime = performance.now();
                  const startScroll = gallery2.scrollLeft;
                  const duration = 1000; // Geçiş süresi (ms) - 3 saniye olarak ayarlandı

                  function updateGallery2(timestamp) {
                      const elapsed = timestamp - startTime;
                      gallery2.scrollLeft = easeInOut(elapsed, startScroll, change, duration);

                      if (elapsed < duration) {
                          requestAnimationFrame(updateGallery2);
                      }
                  }

                  function easeInOut(t, b, c, d) {
                      // Easing fonksiyonu (isteğe bağlı olarak kullanabilirsiniz)
                      t /= d / 2;
                      if (t < 1) return (c / 2) * t * t + b;
                      t--;
                      return (-c / 2) * (t * (t - 2) - 1) + b;
                  }

                  requestAnimationFrame(updateGallery2);
              }

//--------------------------------------------------------------------------------


       handleMouseEnter(event) {
               const clickedElement = event.target;
               const clickedClassName = clickedElement.className;
               const liList = this.template.querySelectorAll('.disCatagory li');
               liList.forEach((li)=>{
                   li.style.background='none';
               });
               clickedElement.style.background = 'red';

           }

































//   --------------------------------------------------------
//  connectedCallback() {
//      this.autoScrollInterval = setInterval(() => {
//          this.handleAutoScroll();
//      }, 4000);
//  }
//
//  handleAutoScroll() {
//      const viewWidth = window.innerWidth;
//      const scrollAmount = 0.1 * viewWidth;
//      this.scrollAutoGallery1(scrollAmount);
//      this.scrollAutoGallery2(scrollAmount);
//  }
//
//  scrollAutoGallery1(change) {
//      const gallery1 = this.template.querySelector('.insRow1');
//      const duration = 1000;
//      let startTime1 = null;
//      let startScroll1 = null;
//
//      function startAnimation1() {
//          startTime1 = performance.now();
//          startScroll1 = gallery1.scrollLeft;
//          requestAnimationFrame(updateGallery1);
//      }
//
//      function updateGallery1(timestamp) {
//          const elapsed1 = timestamp - startTime1;
//          const fullScroll1 = gallery1.scrollWidth - gallery1.clientWidth;
//
//          if (elapsed1 < duration) {
//              gallery1.scrollLeft = easeInOut(elapsed1, startScroll1, change, duration);
//          }
//
//          if (gallery1.scrollLeft >= fullScroll1) {
//              gallery1.scrollLeft = 0;
//              startScroll1 = 0;
//              startTime1 = performance.now();
//          }
//
//          if (elapsed1 < duration * 2) {
//              requestAnimationFrame(updateGallery1);
//          }
//      }
//
//      function easeInOut(t, b, c, d) {
//          t /= d / 2;
//          if (t < 1) return (c / 2) * t * t + b;
//          t--;
//          return (-c / 2) * (t * (t - 2) - 1) + b;
//      }
//
//      startAnimation1();
//  }
//
//  scrollAutoGallery2(change) {
//      const gallery2 = this.template.querySelector('.insRow2');
//      const duration = 1000;
//      let startTime2 = null;
//      let startScroll2 = null;
//
//      function startAnimation2() {
//          startTime2 = performance.now();
//          startScroll2 = gallery2.scrollLeft;
//          requestAnimationFrame(updateGallery2);
//      }
//
//      function updateGallery2(timestamp) {
//          const elapsed2 = timestamp - startTime2;
//          const fullScroll2 = gallery2.scrollWidth - gallery2.clientWidth;
//
//          if (elapsed2 < duration) {
//              gallery2.scrollLeft = easeInOut(elapsed2, startScroll2, -change, duration);
//              requestAnimationFrame(updateGallery2);
//          }
//      }
//
//
//      function easeInOut(t, b, c, d) {
//          t /= d / 2;
//          if (t < 1) return (c / 2) * t * t + b;
//          t--;
//          return (-c / 2) * (t * (t - 2) - 1) + b;
//      }
//
//      startAnimation2();
//  }
}