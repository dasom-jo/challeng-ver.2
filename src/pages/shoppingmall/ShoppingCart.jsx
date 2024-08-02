import styled from "./css_module/ShoppingCart.module.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { cartApi } from "../../api/services/cart";
import cartBanner from "./images/cart_image.png";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]); // 장바구니 목록 
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 상품 
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 체크박스

  // 로컬 스토리지에서 토큰 가져옴
  const token = localStorage.getItem('token');

  // 페이지 이동함수
  const navigate = useNavigate();

  const getCartItems = async () => {
    // 장바구니 상품 목록을 API로부터 가져옴
    const res = await cartApi.getCartItems(token);
    // 응답 데이터로 상태 업데이트
    setProducts(res.data.payload);
  }

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 장바구니 상품 목록 가져오기
    getCartItems();
  }, []);  

  const deleteCartItems = async () => {
    // 선택된 상품들을 장바구니에서 삭제하는 함수
    
    // 각 상품 삭제 요청
    selectedItems.forEach( async(id) => {
      await cartApi.deleteCartItems(token, id);  
    });

    const updatedProducts = products.filter(p => !selectedItems.includes(p.id));
    setProducts(updatedProducts);

    setSelectedItems([]);
  }

  // 삭제버튼 클릭 시 호출
  const handleDelete = () => {
    deleteCartItems();
  }

  const handleCardClick = () => {
    // 뒤로가기 버튼 클릭 시 호출, 이전 페이지로 이동
    navigate(-1);
  }

  const handleSelectAll = () => {
    // 전체 선택 체크박스 상태 변경
    if (selectAll) {
      setSelectedItems([]); // 모든 선택 해제
    } else {
      setSelectedItems(products.map((p) => p.id)); // 모든 상품 선택
    }
    setSelectAll(!selectAll); // 체크박스 상태 토글
  }

  const handleSelectItem = (index) => {
    // 개별 상품 선택 체크박스 상태 변경
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(i => i !== index)); // 선택 해제
    } else {
      setSelectedItems([...selectedItems, index]); //선택 추가
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.overlay}></div>
            <div className={styled.banner_img_container}>
                <img
                className={styled.banner_img}
                src={cartBanner}
                />
                <p className={styled.shop_text}>Cart</p>
            </div>
      <h2 className={styled.cart_title}>장바구니</h2>
      <table className={styled.cart_form}>
        <thead className={styled.t_title}>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th className={styled.product_name}>물품명</th>
            <th className={styled.product_price}>가격</th>
            <th className={styled.product_quantity}>수량</th>
            <th className={styled.product_total}>합계</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p, index) => (
            <tr key={index} className={styled.tr_body}>
              <td>
                <input type="checkbox" checked={selectedItems.includes(p.id)} onChange={() => handleSelectItem(p.id)} />
              </td>
              <td>{p.Product.name}</td>
              <td>{p.Product.price}</td>
              <td>{p.count}</td>
              <td>{p.Product.price * p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styled.del_button_box}>
        <button className={styled.del_button} onClick={handleDelete}>삭제하기</button>
      </div>
      <div className={styled.payment}>
        <span className={styled.final_pay}>최종 결제 금액</span>
        <span className={styled.won}>{
          products?.reduce((total, p) => total + (p.Product.price * p.count), 0)
        }원</span>
      </div>
      <div className={styled.buttons}>
        <button className={styled.back_button} onClick={handleCardClick}>뒤로가기</button>
        <button className={styled.order_button}>구매하기</button>
      </div>
    </div>
  )
}

export default ShoppingCart;