import React, { useState } from 'react';
import styled from "./css_module/ShoppingPurchase.module.css";
import purchaseImg from "./images/purchase.png";
import adidasPants from './images/adidas_pants2.png';
import nikeShose from './images/nike_shose.png';
import umbroShort from './images/umbro_short.png';


const ShoppingPurchase = () => {

  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 
  const [filteredOrders, setFilteredOrders] = useState([]); // 필터된 주문 상태 

  const orders = [
    {
      date: new Date('2024-05-22'),
      imgSrc: adidasPants,
      info: '아디다스 트랙 팬츠',
      state: '배송완료'
    },
    {
      date: new Date('2024-05-22'),
      imgSrc: nikeShose,
      info: '나이키 팬텀 GX2',
      state: '배송중'
    },
    {
      date: new Date('2024-05-23'),
      imgSrc: umbroShort,
      info: '엄브로 반팔티',
      state: '배송 준비중'
    },
  ];

  // 날짜별로 주문 내역을 그룹화하는 함수
  const groupByDate = (orders) => {
    return orders.reduce((groups, order) => {
      const date = order.date.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  };

  const groupedOrders = groupByDate(filteredOrders.length > 0 ? filteredOrders : orders);

  // 검색어 입력 핸들러
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 버튼 핸들러
  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = orders.filter(order => 
      order.info.toLowerCase().includes(term) ||
      order.state.toLowerCase().includes(term) ||
      order.date.toLocaleDateString().includes(term)
    );
    setFilteredOrders(filtered);
  };

  // 초기화 버튼 핸들러
  const handleReset = () => {
    setSearchTerm('');
    setFilteredOrders([]);
  };

  // 인풋 창에서 엔터누르면 검색 
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className={styled.container}>
  <div className={styled.overlay}></div>
            <div className={styled.banner_img_container}>
                <img
                className={styled.banner_img}
                src={purchaseImg}
                />
                <p className={styled.shop_text}>Purchase List</p>
            </div>

      <h2 className={styled.purchase_title}>구매목록</h2>
      <div className={styled.form}>
        <div className={styled.search_list}>
          <div>
            <h3>주문내역 검색</h3>
          </div>
        </div>
        <div className={styled.sort_box}>
          <div className={styled.search_box}>
            <div className={styled.input_button}>
              <input 
              className={styled.input}
              placeholder='상품명/주문상태/날짜 입력'
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}/>
              <button className={styled.search_button} onClick={handleSearch}>검색</button>
              <button className={styled.reset_button} onClick={handleReset}>초기화</button>
            </div>
          </div>
        </div>
        <h3 className={styled.order_list}>주문내역</h3>

        {Object.keys(groupedOrders).map(date => (
          <div key={date} className={styled.table_container}>
            <table className={styled.table}>
              <thead className={styled.order_title}>
                <tr>
                  <th className={styled.order_date}>{date}</th>
                  <th className={styled.order_info}></th>
                  <th className={styled.order_state}>배송상태</th>
                  <th className={styled.order_detail}>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {groupedOrders[date].map((order, index) => (
                  <tr className={styled.add_prd} key={index}>
                    <td className={styled.small_img}>
                      <img src={order.imgSrc} alt='상품 이미지' className={styled.resizedImage}></img>
                    </td>
                    <td className={styled.info}>{order.info}</td>
                    <td className={styled.status}>{order.state}</td>
                    <td className={styled.detail}>
                      <div className={styled.button_box}>
                        <button className={styled.button}>구매확정</button>
                        <button className={styled.button}>반품/교환</button>
                        <button className={styled.button}>후기작성</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ShoppingPurchase;

