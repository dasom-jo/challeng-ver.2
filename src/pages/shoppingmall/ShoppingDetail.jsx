import React, { useState } from "react";
import { Modal } from "@mui/material";
import styled from "./css_module/ShoppingDetail.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom'; // ShoppingList에서 가져옴.
import ReviewPagination from './components/ReviewPagination';
import InquiryPagination from "./components/InquiryPagination";
import { cartApi } from "../../api/services/cart";
import detailBanner from "./images/detail_banner.png";
import warningIcon from './images/warning_icon.png';
import reviewImages1 from './images/reviewsImages/review_adidas1.png';
import reviewImages2 from './images/reviewsImages/review_adidas2.png';
import reviewImages3 from './images/reviewsImages/review_adidas3.png';
import reviewImages4 from './images/reviewsImages/review_adidas4.png';
import reviewImages5 from './images/reviewsImages/review_adidas5.png';
import reviewImages6 from './images/reviewsImages/review_adidas6.png';
import reviewImages7 from './images/reviewsImages/review_adidas7.png';
import reviewImages8 from './images/reviewsImages/review_adidas8.png';
import reviewImages9 from './images/reviewsImages/review_adidas9.png';
import reviewImages10 from './images/reviewsImages/review_adidas10.png';
import reviewImages11 from './images/reviewsImages/review_adidas11.png';
import reviewImages12 from './images/reviewsImages/review_adidas12.png';
import reviewImages13 from './images/reviewsImages/review_adidas13.png';
import reviewImages14 from './images/reviewsImages/review_adidas14.png';


// 후기글 페이지네이션 임시 데이터
const reviews = [
  { name: 'User1', date: '2024.5.23', rating: "⭐", content: '배송이 느리네요...', images: [reviewImages1]},
  { name: 'User2', date: '2024.5.23', rating: "⭐⭐", content: '그냥 무난한.', images: [reviewImages2]},
  { name: 'User3', date: '2024.5.23', rating: "⭐⭐⭐", content: '배송이 빠릅니다!!.', images: [reviewImages3]},
  { name: 'User4', date: '2024.5.23', rating: "⭐⭐⭐⭐", content: '원단 좋아요.', images: [reviewImages4]},
  { name: 'User5', date: '2024.5.23', rating: "⭐⭐", content: '사이즈가 표시된거랑 다르네요.', images: [reviewImages5]},
  { name: 'User6', date: '2024.5.23', rating: "⭐", content: '품질이 너무 좋지 않네요.', images: [reviewImages13]},
  { name: 'User7', date: '2024.5.23', rating: "⭐⭐⭐⭐⭐", content: '핏도 예쁘고 딱이네요.', images: [reviewImages6]},
  { name: 'User8', date: '2024.5.23', rating: "⭐⭐⭐⭐", content: '배송이 엄청 빠릅니다.', images: [reviewImages7]},
  { name: 'User9', date: '2024.5.23', rating: "⭐⭐⭐⭐", content: '원단 좋아요.', images: [reviewImages8]},
  { name: 'User10', date: '2024.5.23', rating: "⭐⭐⭐⭐", content: '매번구매하는데 죠습니다.', images: [reviewImages9]},
  { name: 'User11', date: '2024.5.23', rating: "⭐⭐⭐", content: '무난하네요.', images: [reviewImages10]},
  { name: 'User12', date: '2024.5.23', rating: "⭐⭐", content: '그럭저럭...', images: [reviewImages11]},
  { name: 'User13', date: '2024.5.23', rating: "⭐⭐", content: '별로네요.', images: [reviewImages12]},
]

// 문의글 페이지네이션 임시데이터
const inquiries = [
  {id: 1, status: '답변완료', category: '사이즈', content: '상품 관련 문의 합니다.🔒', writer: 'dfkgj24', date: '2024-05-29'},
  {id: 2, status: '대기중', category: '배송', content: '배송기간 문의 합니다.🔒', writer: 'wkrtjdwk1', date: '2024-05-29'},
  {id: 3, status: '대기중', category: '상품', content: '상품 관련 문의 합니다.🔒', writer: 'tkdvna12', date: '2024-05-29'},
  {id: 4, status: '답변완료', category: '기타', content: '상품 관련 문의 합니다.🔒', writer: 'rlxk123', date: '2024-05-29'},
  {id: 5, status: '대기중', category: '교환', content: '교환 문의 합니다.🔒', writer: 'ryghks1', date: '2024-05-29'},
  {id: 6, status: '답변완료', category: '반품', content: '반품 문의 합니다.🔒', writer: 'qksvna2', date: '2024-05-29'},
]
// 페이지 네이션 페이지당 게시물 수
const REVIEWS_PER_PAGE = 3;
const INQUIRIES_PER_PAGE = 5;

// 작성자 아이디 일부 가리기 함수
const maskWriter = (writer) => {
  if (writer.length <= 3) return writer; // 이름이 3글자 이하인 경우 그대로 반환
  const masked = writer.slice(0, 3) + '*'.repeat(writer.length - 3);
  return masked;
};


const ShoppingDetail = () => {
  const token = localStorage.getItem('token');
  const location = useLocation(); // ShoppingList에서 카드의 정보를 가져옴.
  const { product } = location.state || {}; 
  const [quantity, setQuantity] = useState(1); // 수량

  // 모달 상태를 관리.
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const addCart = async () => {
    const data = {
      count: quantity,
      productId: product.id
    }
    const res = await cartApi.uploadCart(data, token);
    if (res.data.code === 200) {
      navigate('/shoppingcart')
    }
  }
  const handleAddToCart = () => {
    addCart();
  };

  const handleBuyNow = () => {
    setModalOpen(true); // 구매하기 클릭 시 모달 오픈
  };

  const handleCloseModal = () => {
    // 모달 닫기 버튼 클릭하면 모달 닫힘, 다른곳 눌러도 닫힌다.
    setModalOpen(false); 
  }


  // 후기글 페이지 네이션 
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastReview = currentPage * REVIEWS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 문의글 페이지 네이션
  const [currentInquiryPage, setCurrentInquiryPage] = useState(1);
  const indexOfLastInquiry = currentInquiryPage * INQUIRIES_PER_PAGE;
  const indexOfFirstInquiry = indexOfLastInquiry - INQUIRIES_PER_PAGE;
  const currentInquiries = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);
  const totalInquiryPages = Math.ceil(inquiries.length / INQUIRIES_PER_PAGE);
  const handleInquiryPageChange = (pageNumber)  => {
    setCurrentInquiryPage(pageNumber);
  };


  const [mainImage, setMainImage] = useState(product?.imageUrl);
  const [thumbnailImages, setThumbnailImages] = useState([
    mainImage,
    'http://via.placeholder.com/150',
    'http://via.placeholder.com/150',
    'http://via.placeholder.com/150',
    'http://via.placeholder.com/150',
  ])

// 썸네일 클릭 시 이미지 교체 함수 (수정된 부분)
const handleThumbnailClick = (clickedImage) => {
  // 클릭된 이미지와 메인 이미지가 같으면 아무것도 변경하지 않음
  if (clickedImage === mainImage) {
    return;
  }
  
  // 클릭된 이미지를 메인 이미지로 설정
  setMainImage(clickedImage);

  // 다른 작은 이미지는 그대로 유지하고 클릭된 이미지만 메인 이미지로 변경
  const newThumbnailImages = thumbnailImages.map(img => img);
  setThumbnailImages(newThumbnailImages);
};


  return (
    <div className={styled.container}>
        <div className={styled.overlay}></div>
            <div className={styled.banner_img_container}>
                <img
                className={styled.banner_img}
                src={detailBanner}
                />
                <p className={styled.shop_text}>Detail</p>
            </div>

      <h2 className={styled.path}></h2>
      <div className={styled.main_box}>
        <div className={styled.main_img_box}>
          {/* 아래 product?.name 처럼 이미지도 똑같이 써주면 됨 */}

          <img className={styled.main_img} src={mainImage} alt="main_img" />

        </div>
        
        <div className={styled.info_box}>
          <div className={styled.info_content}>
            {/* product 객체의 속성 접근 시 product? 형식을 이용해 안전하게 접근한다. Cart컴포넌트에서 뒤로가기 누르면 오류가 난거 해결됨. */}
            <h2 style={{ marginBottom: "20px" }}>{product?.name}</h2>
            <p style={{ marginBottom: "10px" }}>{product?.description}</p>
            <p style={{ marginBottom: "10px" }}>{product?.price}</p>
            <span className={styled.quantity_text}>수량</span>
            <select 
              className={styled.select_box}
              style={{ width: "50px" }} 
              onChange={(e) => setQuantity(Number(e.target.value))} 
              value={quantity}>
              {[1, 2, 3, 4, 5].map(number => (
                <option key={number} value={number}>{number}</option> // Key도 number(요소), value도 number(요소)
              ))}
            </select>
            <div className={styled.small_img_box}>

              {thumbnailImages.map((img, index) => (
                <img
                  key={index}
                  className={styled.small_img}
                  src={img}
                  alt="small_img"
                  onClick={() => handleThumbnailClick(img)}

            />
            ))}
          </div>
          <div className={styled.buttons}>
            <button className={styled.cart_button} onClick={handleAddToCart}>장바구니 담기</button>

            {/* ------- 마이페이지 구매목록 버튼으로 이동 시킴 --------*/}
            {/* <Link to='/ShoppingPurchase'>
              <img src="http://via.placeholder.com/30" alt="cart_icon" />
            </Link> */}
            
            <button className={styled.cart_button} onClick={handleBuyNow}>구매하기</button>
          </div>
          </div>
        </div>
      </div>
      <div className={styled.line}></div>

      {/* -------------- 상세 이미지 -------------- */}
      <div className={styled.large_img}>
        <div><img src={product?.imageUrl} alt="large_img" /></div>
        {/* <div><img src="http://via.placeholder.com/820" alt="large_img" /></div> */}
      </div>
      <div className={styled.line}></div>

      {/* --------------  후기글 --------------  */}
      <div className={styled.review_container}>
        <h3 className={styled.review_text}>구매후기</h3>
        <div className={styled.inquiry_write_wrap}>
          <button className={styled.inquiry_write_btn}>후기작성</button>
          </div>
        {currentReviews.map((review, index) =>(
        <div className={styled.review_box}> 
          <div className={styled.review_profile}>
            <p className={styled.review_name}>{review.name}</p>
            <p className={styled.review_date}>{review.date}</p>
          </div>
          {/* 이미지 , 상품정보 */}
          <div className={styled.prod_infomation}>

            <img className={styled.prod_img} src={product?.imageUrl} alt="prod_img"></img>

            <div className={styled.brief_info_wrap}>
              <a className={styled.brief_info} href='ShoppingDetail'>상품 정보</a>
            </div>
          </div>
          {/* 상품평 */}
          <div className={styled.rating_wrap}>
            <span className={styled.rating}>{review.rating}</span>
          </div>
          {/* 원단 좋아요 */}
          <div className={styled.contents_text}> 
            <p>{review.content}</p>
          </div>
          <div className={styled.photo_review}>
            <ul className={styled.photo_box}>
              {review.images.map((img, idx) => (
              <li key={idx}><img className={styled.user_photo} src={img} alt="user_photo"/></li>
              ))}
            </ul>
          </div>
        </div>
        ))}
        {/* 후기 페이지네이션 컴포넌트 */}
        <ReviewPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        styled={styled}
        />
      </div> 
      {/* -------------- Q&A 상품 문의 -------------- */}
        <div className={styled.inquiry_container}>
          <h3 style={{marginBottom: '10px'}}>Q&A 상품문의</h3>
          <div className={styled.inquiry_write_wrap}>
          <button className={styled.inquiry_write_btn}>문의하기</button>
          </div>
          <table className={styled.inquiry_table}>
            <thead className={styled.inquiry_title} >
              <tr>
                <th className={styled.inquiry_number} >번호</th>
                <th className={styled.inquiry_state} >답변상태</th>
                <th className={styled.inquiry_sortation} >구분</th>
                <th className={styled.inquiry_content} >내용</th>
                <th className={styled.inquiry_writer} >작성자</th>
                <th className={styled.inquiry_date} >등록일자</th>
              </tr>
            </thead>
            <tbody>
                {/* 문의글 임시 데이터 */}
                {currentInquiries.map((inquiry, index) => (
                  <tr key={index}>
                    <td className={styled.write_content_id}>{inquiry.id}</td>
                    <td className={styled.write_content_status}>{inquiry.status}</td>
                    <td className={styled.write_content_category}>{inquiry.category}</td>
                    <td className={styled.write_content_content}>{inquiry.content}</td>
                    <td className={styled.write_content_writer}>{maskWriter(inquiry.writer)}</td>
                    <td className={styled.write_content_date}>{inquiry.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={styled.empty}></div>
          {/* 문의 페이지네이션 컴포넌트 */}
          <InquiryPagination
            currentPage={currentInquiryPage}
            totalPages={totalInquiryPages}
            handlePageChange={handleInquiryPageChange}
            styled={styled}
          />
        </div>

      
      {/* -------------- 모달창 -------------- */}
      <Modal
        className={styled.modal}
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styled.modal_box}>

            <img className={styled.check_icon} src={warningIcon}></img>
          <div className={styled.msg_box}>
            <h3 className={styled.modal_msg}>상품이 품절되었어요.</h3>
          </div>

          <div className={styled.modal_button_wrap}>
          <button className={styled.modal_close_button} onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export default ShoppingDetail;

