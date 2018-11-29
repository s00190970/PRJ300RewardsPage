import React from 'react';
import { DropdownList } from 'react-widgets'
import './App.css';
import './Checkbox.css';
import 'react-widgets/dist/css/react-widgets.css';
import jsonProds from './mockData';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import FirebaseServices from './firebase/services';

const firebaseServices = new FirebaseServices(); 

library.add(faCheck);


class Picture extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    const productPicture = this.props.url;
    const productName = this.props.name;
    return(
      <img width="80" height="80" src={productPicture} alt={productName}/>
      );
    }
  }

  class ProductProgressbar extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      const quantity = this.props.quantity;
      const remaining = this.props.remaining;
      const percent = remaining*100/quantity;
      const progressStyle = {
        width: percent+"%"
      }
      return(
        <div className="progress">
          <div className={"progress-bar progress-bar-striped "+
            (percent<60 ? percent<30 ? "bg-danger" : "bg-warning" : "bg-success")} role="progressbar" 
          aria-valuenow={percent} aria-valuemin="0" 
          aria-valuemax="100" style={progressStyle}>{remaining + "/" + quantity}</div>
        </div>
      );
    }
  }

  class ProductPrice extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      const price = this.props.price;
      return(
        <p>{price} Kudos</p>
      )
    }
  }

  class WishlistButton extends React.Component{
    productKey="";
    userKey="";
    wishlist=[];
    constructor(props){
      super(props);
      this.addToWishlist = this.addToWishlist.bind(this);
      this.isInWishlist = this.isInWishlist.bind(this);
      this.state = {
        isInWishlist: false
      }
    }
    componentDidMount(){
      this.productKey = this.props.productKey;
      this.userKey = this.props.userKey;
      firebaseServices.getWishlist(this.userKey).subscribe(items =>{
        this.setState({isInWishlist: false});
        this.wishlist = items;
        this.isInWishlist();
      })
    }
    addToWishlist(){
      firebaseServices.addToWishlist(this.productKey, this.userKey);
    }
    isInWishlist(){
      if(this.wishlist.includes(this.productKey)){
        this.setState({isInWishlist: true});
      }
    }
    render(){
      const inWishlist = this.state.isInWishlist;
      return(
        <button className="wishlistButton btn btn-primary" 
          role="button" onClick={this.addToWishlist} disabled={inWishlist}> 
          {inWishlist ? "Item in Wishlist" : "Add to Wishlist"}
        </button>
      )
    }
  }

class Product extends React.Component{
  constructor(props){
    super(props);
    this.isInWishlist = this.isInWishlist.bind(this);
    this.productKey = this.props.product.key;
    this.state = {
      isInWishlist: false
    }
    this.userKey = this.props.user.key;
    firebaseServices.getWishlist(this.userKey).subscribe(items =>{
      this.setState({isInWishlist: false});
      this.wishlist = items;
      this.isInWishlist();
    })
  }

  isInWishlist(){
    if(this.wishlist.includes(this.productKey)){
      this.setState({isInWishlist: true});
    }
  }

  render(){
    const product = this.props.product;
    const wishlist = this.props.wishlist;
    const user = this.props.user;
    const userKey = user.key;
    const productName = product.name;
    const productDescription = product.description;
    const picURL = product.picURL;
    const brandURL = product.brand.picURL;
    const brandName = product.brand.name;
    const price = product.price;
    const quantity = product.quantity;
    const remaining = product.remaining;
    const productKey = product.key;
    const inWishlist = this.state.isInWishlist;
    return(
      <div className={"productCard container border rounded d-flex align-items-center justify-content-center "+
            (inWishlist ? "inWishlist" : '')}>
        <div className="productCardContent">
          <div className="row">
            <div className="col-md-3 d-flex justify-content-start"> 
              <Picture className="productPicture" url={picURL} name={productName}></Picture> 
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <h5>{productName}</h5>
            </div>
            <div className="col-md-3 d-flex justify-content-end">
              <Picture className="brandPicture" url={brandURL} name={brandName}></Picture>
            </div>
          </div>
          <div className="row">
            <div className="col-md d-flex justify-content-center">
            <p>{productDescription}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md d-flex justify-content-end">
              <ProductPrice price={price}></ProductPrice>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <ProductProgressbar quantity={quantity} remaining={remaining}></ProductProgressbar>
            </div>
            <div className="col-md d-flex justify-content-end">
              <WishlistButton productKey={productKey} userKey={userKey} wishlist={wishlist}></WishlistButton>
            </div>
          </div>
        </div>
      </div>
    )};
  }

  class Dropdown extends React.Component {    
    constructor(props){
      super(props);

      this.doOrderBy=this.doOrderBy.bind(this);
      this.doOrder=this.doOrder.bind(this);
    }

    doOrderBy(e){
      const newOrderBy = e.target.getAttribute('data-value');
      this.props.doOrderBy(newOrderBy);
    }
    doOrder(e){
      const newOrder = e.target.checked;
      this.props.doOrder(newOrder);
    }

    render() {   
      const { orderBy, doOrderBy, doOrder } = this.props;   
      const checked = <FontAwesomeIcon icon="check" />
      return (
        <div className="dropdown">
          <button className="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort products 
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
          <h6 className="dropdown-header">Order by</h6>
            <li><button className="dropdown-item" onClick={ doOrderBy } data-value="price">Price {orderBy==="price" ? checked : null}</button></li>
            <li><button className="dropdown-item" onClick={ doOrderBy } data-value="remaining">In stock {orderBy==="remaining" ? checked : null}</button></li>
          
            <div className="dropdown-divider"></div>
            <h6 className="dropdown-header">Order</h6>
            <label className="tgl dropdown-item">
                <input type="checkbox" onClick={doOrder}/>
                <span data-on="Descending" data-off="Ascending"></span>
            </label>
          </ul>
        </div>  
     )   
    }
  }


  class Filters extends React.Component{
    constructor(props){
      super(props);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.handleAffordableChange = this.handleAffordableChange.bind(this);
      this.doOrderBy=this.doOrderBy.bind(this);
      this.doOrder=this.doOrder.bind(this);
    }

    doOrderBy(e){
      const newOrderBy = e.target.getAttribute('data-value');
      this.props.doOrderBy(newOrderBy);
    }
    doOrder(e){
      const newOrder = e.target.checked;
      this.props.doOrder(newOrder);
    }

    handleCategoryChange(e) {
      this.props.onCategoryChange(e);
    }
    handleAffordableChange(e){
      this.props.onAffordableChange(e);
    }
    
    render(){
      const rewardsType = ['Electronics', 'Shoes', 'Sports', 'Others', 'All'];
      const { orderBy, order, doOrderBy, doOrder } = this.props;
      const DropdownListStyle = {width:'80%'}

      return(
        <div className="container">
          <div className="row">
            <div className="col-md">
            <DropdownList data={rewardsType} onChange={this.handleCategoryChange} style={DropdownListStyle}
            value={this.props.categoryFilter} placeholder="Type of reward"/>
            </div>
            <div className="col-md">
              <Dropdown 
                doOrderBy={ doOrderBy }
                doOrder={ doOrder }
                orderBy={ orderBy }
                order={ order } />
            </div>           
            <div className="col-md">
              <label className="tgl">
                <input type="checkbox" onClick={this.handleAffordableChange}/>
                <span data-on="Affordable" data-off="All Products"></span>
              </label>
            </div>
          </div>
        </div>
      );
    }
  }

  class ProductContainer extends React.Component{
    constructor(props){
      super(props);  
    }

    filterbyCategory(str){
      return function(product){
        if(str && str!=='All'){
          
          return product.category.toLowerCase().includes(str.toLowerCase())
        }
        return true;
      }
    }
    filterbyAffordable(coins){
      return function(product){
        return product.price>coins ? 0 : 1;
      }
    }
    sortbyPrice(a, b){
      return (a.price > b.price) ? 1 : ((a.price < b.price) ? -1 : 0);   
    }

    sortbyRemaining(a, b){
      return (a.remaining > b.remaining) ? 1 : ((a.remaining < b.remaining) ? -1 : 0);   
    }

    render(){
      const user = this.props.user;
      const userCoins = user.coins;
      var products = this.props.productList;
      const wishlist = this.props.wishlist;
      if(this.props.affordableChecked){
        products = products.filter(this.filterbyAffordable(userCoins));
      }
      products = products.filter(this.filterbyCategory(this.props.categoryFilter));

      if(this.props.orderBy==="price"){
        products = products.sort(this.sortbyPrice);
        if(this.props.order===true){
          products = products.reverse();
        }
      }
      else{
        products=products.sort(this.sortbyRemaining);
        if(this.props.order===true){
          products = products.reverse();
        }
      }

      const listProducts = products.map((product, index)=>
        <div className="col-md-4" key={index}>
          <Product product={product} user={user} wishlist={wishlist}></Product>
        </div>
      );
      return(
        <div className="container">
          <div className="row ">
              {listProducts}
          </div>
        </div>
      );
    }
  }

  class Page extends React.Component{
    constructor(props){
      super(props);
      
      this.state = {
        categoryFilter: '',
        affordableChecked:false,
        orderBy: "price",
        order: false,
        productList:[],
        wishlist:[],
        user: {
          name: '',
          coins: 0,
          doc:'',
          key: ''
        }
      };
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.handleAffordableChange = this.handleAffordableChange.bind(this);
      this.doOrderBy = this.doOrderBy.bind(this);
      this.doOrder = this.doOrder.bind(this);
    }

    componentDidMount(){   
      firebaseServices.getUser("LXCYHelb75dWxPRZhhB5")
        .subscribe(user => this.setState({user: user}));
      firebaseServices.getProducts()
        .subscribe(products => this.setState({productList: products}));
      firebaseServices.getWishlist("LXCYHelb75dWxPRZhhB5")
        .subscribe(items => this.setState({wishlist: items}));
    }

    doOrderBy(e){
      const newOrderBy = e.target.getAttribute('data-value');
      this.setState({orderBy : newOrderBy});
    }
    doOrder(e){
      const newOrder = e.target.checked;
      this.setState({order : newOrder});
    }

    handleCategoryChange(e){
      this.setState({categoryFilter: e});
    }
    handleAffordableChange(e){
      this.setState({affordableChecked:e.target.checked})
    }

    addFirebaseData(){
      jsonProds.forEach(prod => firebaseServices.addProduct(prod));
    }

    render(){
      const products = this.state.productList;
      const categoryFilter = this.state.categoryFilter;
      const affordableChecked = this.state.affordableChecked;

      const orderBy = this.state.orderBy;
      const order = this.state.order;
      const wishlist = this.state.wishlist;
      const user = this.state.user;
      const userCoins = user.coins;
      const userName = user.name;
      return(
        
        <div className="container">
        <button className="btn btn-primary" type="button" onClick={this.addFirebaseData}>Add data to Firebase</button>
        Hello, {userName}, you have {userCoins} Coins
          <Filters user={user} wishlist={wishlist}
            productList={products} 
            categoryFilter={categoryFilter} onCategoryChange={this.handleCategoryChange}
            affordableChecked={affordableChecked} onAffordableChange={this.handleAffordableChange}

            doOrderBy={ this.doOrderBy } orderBy={ orderBy }
            doOrder={ this.doOrder } order={ order }>
            
          </Filters>
          <ProductContainer user={user} wishlist={wishlist}
            productList={products} 
            categoryFilter={categoryFilter}
            affordableChecked={affordableChecked}
            orderBy={ orderBy }
            order={ order }>
          </ProductContainer>
        </div>
      )
    }
  }
export default Page;
