window.onload = function(){
    var productCards = document.getElementsByClassName("productCard");
    var maxHeight = 0;
    for(let i=0;i<productCards.length;i++){
        if(productCards[i].offsetHeight>maxHeight){
            maxHeight = productCards[i].offsetHeight;
        }
    }
    for(let i=0;i<productCards.length;i++){
        productCards[i].style.height = (maxHeight+"px");
    }
}