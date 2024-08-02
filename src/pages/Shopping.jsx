import React from "react";
import ProductCard from "./shoppingmall/ShoppingProduct";
import styled from "./shoppingmall/css_module/Shopping.module.css";
import bannerImage from "./shoppingmall/images/shop.png";


const Shopping = () => {
    return (
        <div className={styled.container} >
            <div className={styled.overlay}></div>
            <div className={styled.banner_img_container}>
                <img
                className={styled.banner_img}
                src={bannerImage}
                />
                <p className={styled.shop_text}>Shop</p>
            </div>

            {/* <div className="button-box" 
            style={{
                marginBottom: "20px", 
                width: "940px", 
                margin: "auto"
            }}>
            </div> */}
            
            <ProductCard />

        </div>
    );
}


export default Shopping;
