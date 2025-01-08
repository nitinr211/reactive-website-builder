import React from "react";
import ReactDOM from "react-dom";


function InlineHtmlIframe() {
  const htmlContent = `<div id='product-component-1710658596212'></div>
  <script type="text/javascript">
  /*<![CDATA[*/
  (function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
    function loadScript() {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: 'edf84b-3.myshopify.com',
        storefrontAccessToken: '82499a30f697e819ac49828c2b6a64a5',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '8937233842466',
          node: document.getElementById('product-component-1710658596212'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
    "product": {
      "styles": {
        "product": {
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "0",
            "margin-bottom": "50px"
          },
          "text-align": "left"
        },
        "title": {
          "font-size": "26px"
        },
        "button": {
          "font-family": "Montserrat, sans-serif",
          "font-size": "16px",
          "padding-top": "16px",
          "padding-bottom": "16px",
          ":hover": {
            "background-color": "#3a522c"
          },
          "background-color": "#405b31",
          ":focus": {
            "background-color": "#3a522c"
          }
        },
        "quantityInput": {
          "font-size": "16px",
          "padding-top": "16px",
          "padding-bottom": "16px"
        },
        "price": {
          "font-size": "18px"
        },
        "compareAt": {
          "font-size": "15.299999999999999px"
        },
        "unitPrice": {
          "font-size": "15.299999999999999px"
        }
      },
      "layout": "horizontal",
      "contents": {
        "img": false,
        "imgWithCarousel": true,
        "description": true
      },
      "width": "100%",
      "text": {
        "button": "Add to cart"
      },
      "googleFonts": [
        "Montserrat"
      ]
    },
    "productSet": {
      "styles": {
        "products": {
          "@media (min-width: 601px)": {
            "margin-left": "-20px"
          }
        }
      }
    },
    "modalProduct": {
      "contents": {
        "img": false,
        "imgWithCarousel": true,
        "button": false,
        "buttonWithQuantity": true
      },
      "styles": {
        "product": {
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "0px",
            "margin-bottom": "0px"
          }
        },
        "button": {
          "font-family": "Montserrat, sans-serif",
          "font-size": "16px",
          "padding-top": "16px",
          "padding-bottom": "16px",
          ":hover": {
            "background-color": "#3a522c"
          },
          "background-color": "#405b31",
          ":focus": {
            "background-color": "#3a522c"
          }
        },
        "quantityInput": {
          "font-size": "16px",
          "padding-top": "16px",
          "padding-bottom": "16px"
        },
        "title": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "bold",
          "font-size": "26px",
          "color": "#4c4c4c"
        },
        "price": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "18px",
          "color": "#4c4c4c"
        },
        "compareAt": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "15.299999999999999px",
          "color": "#4c4c4c"
        },
        "unitPrice": {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "15.299999999999999px",
          "color": "#4c4c4c"
        }
      },
      "googleFonts": [
        "Montserrat"
      ],
      "text": {
        "button": "Add to cart"
      }
    },
    "option": {
      "styles": {
        "label": {
          "font-size": "17px"
        }
      }
    },
    "cart": {
      "styles": {
        "button": {
          "font-family": "Montserrat, sans-serif",
          "font-size": "16px",
          "padding-top": "16px",
          "padding-bottom": "16px",
          ":hover": {
            "background-color": "#3a522c"
          },
          "background-color": "#405b31",
          ":focus": {
            "background-color": "#3a522c"
          }
        }
      },
      "text": {
        "total": "Subtotal",
        "button": "Checkout"
      },
      "googleFonts": [
        "Montserrat"
      ]
    },
    "toggle": {
      "styles": {
        "toggle": {
          "font-family": "Montserrat, sans-serif",
          "background-color": "#405b31",
          ":hover": {
            "background-color": "#3a522c"
          },
          ":focus": {
            "background-color": "#3a522c"
          }
        },
        "count": {
          "font-size": "16px"
        }
      },
      "googleFonts": [
        "Montserrat"
      ]
    }
  },
        });
      });
    }
  })();
  /*]]>*/
  </script>`;

  return (
    <iframe
      width="100%"
      height="500"
      srcDoc={htmlContent}
      title="Inline HTML Content"
    ></iframe>
  );
}

export default InlineHtmlIframe;