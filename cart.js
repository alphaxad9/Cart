//scripts 
import { products } from "../data/products.js";

let productsHTML = "";
products.forEach((product) => {
    productsHTML += `
    <div class="productdiv" data-product-id="${product.id}">
        <div class="productImg"><img src="${product.image}" alt=""></div>
        <div class="productName">
  ${product.name}
        </div>
        <div class="productAmount">

<div class="amount">
$${(product.priceCents / 100).toFixed(2)}
</div>

<div class="quantity"><select class="productquantity" name="" id="">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    
</select></div>
        </div>
        <div class="ratings"><img src="/images/ratings/rating-${product.rating.stars * 10}.png" alt=""></div>
        
        <button class="add-to-cart-button" >Add To Cart</button>
      </div>
    `;
})
let productsGrid = document.querySelector(".displaydiv").innerHTML = productsHTML;
let cartQuantity = document.querySelector(".cartQuantity");


let cart = [];

let closeCartBtn = document.querySelector(".closeCartBtn");
let cartIcon = document.querySelector(".cartIcon");
closeCartBtn.addEventListener("click", ()=>{
    document.querySelector(".cartDiv").classList.toggle("hideCart");
})
cartQuantity.addEventListener("click", ()=>{
    document.querySelector(".cartDiv").classList.toggle("hideCart");
})
cartIcon.addEventListener("click", ()=>{
    document.querySelector(".cartDiv").classList.toggle("hideCart");  
})

let addProductToCartBtn = document.querySelectorAll(".add-to-cart-button");
addProductToCartBtn.forEach((button) => {
    button.addEventListener("click", (event)=>{
        let productContainer = event.currentTarget.closest(".productdiv");
        let productId = productContainer.dataset.productId;
        let quantity = productContainer.querySelector(".productquantity").value;

        let product = products.find(p => p.id === productId);
        if(product){
            let existingProduct = cart.findIndex(item => item.id === product.id);
            if(existingProduct > -1){
                cart[existingProduct].quantity += parseInt(quantity);
            }else{
                cart.push({...product, quantity: parseInt(quantity)})
            }
            renderCart();
            updateCartQuantity()
            updateCartQuantity()
        }
    })
})
function renderCart(){

    let cartHtml = "";
    cart.forEach((item) => {
        cartHtml += `
          <div class="onecartproduct" data-product-id="${item.id}">

               
                    <div class="cartproductImg"><img src="${item.image}" alt=""></div>
                    <div class="cartproductdetails">
                    <div class="productName">
              ${item.name}
                    </div>
                    <div class="productAmount">
            
            <div class="amount">
            $${(item.priceCents / 100).toFixed(2)}
            </div>
            
            <div class="quantity"><select name="" id="">
                <option value="1">${item.quantity}</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                
            </select></div>
                    </div>
                  
                    
                    <button class="add-to-cart-button remove" data-product-id ="${item.id}">Remove</button>
                  

                </div>



            </div>
        `
    })

    document.querySelector(".cartItems").innerHTML = cartHtml;
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", (event)=>{
            let productContainer = event.currentTarget.closest(".onecartproduct");
            let productId = productContainer.dataset.productId;

            let productIndex = cart.findIndex(item => item.id === productId);
            if(productIndex > -1){
                cart.splice(productIndex, 1)
                updateCartQuantity()
                updateCartQuantity()
                productContainer.remove();
            }

            
        })
    });
}
function updateCartQuantity(){
    cartQuantity.innerHTML = cart.length;
     
   }
   function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart(); // A function that renders the cart items on the page
    }
}

// Call this function when the page loads
loadCartFromLocalStorage();
