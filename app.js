Vue.component('VueCart',{
    props:{
        cart: {
            type:Array,Required:true
            // default : () => {return []}
        },
        title:{
            type:String,Required:true
        },
        type:{
            type:String,Required:true
        }
    },
    methods:{
        RemoveFromCart(index){
            //arrayde gönderdiğim indexden 1 tane çıkart
            return this.cart.splice(index,1);
        },
        changeCart(index){
            const item = this.RemoveFromCart(index);
            this.$emit('ıtemchangeoncart',item[0],this.type);
        }
    } ,
    computed : {
        cartTotal(){
            let total = 0;

            
            this.cart.forEach((item) => {
                   total +=parseFloat(item.price,10);                    
            });             
            return total.toFixed(2);
        },
       isShoppingCart(){
           return this.type == 'shoppingCart'
        } ,
        isSavedCart(){
            return this.type == 'savedCart'
        }       
    },
  template:`
  <div class="cart-wrapper">
  <h2>{{title}}</h2>
  <p v-if="!cart.length">No item in {{title}}</p>
      <div class="cart">
          <div class="item" v-for="(item, index) in cart">
              <div class="image">
                  <a v-bind:href="item.url">
                      <img v-bind:src="item.image" alt="item.name">                  
                    </a>
              </div>
              <div class="info">
                  <h4>{{item.name}}</h4>
                  <p class="seller">by {{item.seller}}</p>
                  <p class="status available" v-if="item.isAvailable">In Stock</p>
                  <p class="shipping" v-if="item.isEligible">Eligible for FREE Shipping & FREE Returns</p>
                  <a href="#" v-on:click="RemoveFromCart(index)">Delete</a>
                  <a href="#" class="secondary" v-on:click="changeCart(index)" v-if="isShoppingCart">Save For Later</a>
                  <a href="#" class="secondary" v-on:click="changeCart(index)" v-if="isSavedCart">Move To Cart</a>
              </div>
              <p class="price">\${{item.price}}</p>
          </div>          
        </div>
            <div class="subtotal" v-if="cart.length">
            Subtotal ({{cart.length}} items) <span class="price">\$ {{cartTotal}}</span>
            </div>
      </div>
  `
});

window.addEventListener('load',() => {
 window.vue =new Vue({
     el:'#app',
     data:{
         isLoading : true,
         name : "Cart",
         cart : [],
         saved : []
     },
     methods:{
        handleItemChange(item,cartType){
            if(cartType === 'shoppingCart'){
                this.saved.push(item);
            }
            else{
                this.cart.push(item);
            }            
        }
     },
     created() {
        //  fetch('https://api.myjson.com/bins/11mb9u')
        fetch('https://api.myjson.com/bins/1293hm')
         .then((res) => {return res.json()})
         .then((res)=> { 
             this.isLoading = false;         
             this.cart = res.cart;
             this.saved = res.saved;             
         })
     } 
 })
});