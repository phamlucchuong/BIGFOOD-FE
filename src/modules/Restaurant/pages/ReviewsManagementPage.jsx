import React, { useState, useEffect } from 'react';
import {MessageSquare , Star } from "lucide-react"
import useReview from '../../../hooks/auth/restaurant/useReview'

export const ReviewsManagementPage = () => {
  const [reviews, setReviews] = useState();
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [orderId, setOrderId] = useState('');
  const {listReview , replyUser , listReviewSort} = useReview();

  const handleLoad  = async () =>{
    const data =  await listReview();
    console.log( "review : " ,data.results)
    setReviews(data.results);
  }
  const handleReplyUser = async () =>{
      const response = await replyUser({id: orderId, replyText: replyText});
      if(response.ok){
        handleLoad();
        setShowReplyModal(false);
        setReplyText('');
      }
  }

  const getAllReviewsSort = async (filter) => {
    const data =  await listReviewSort(filter);
    setReviews(data.results);
  }

  useEffect (()=>{
    handleLoad();
  },[])

  const sentimentColors = {
    positive: 'bg-green-100 text-green-600',
    neutral: 'bg-yellow-100 text-yellow-600',
    negative: 'bg-red-100 text-red-600'
  };

  const sentimentLabels = {
    positive: 'Tích cực',
    neutral: 'Trung lập',
    negative: 'Tiêu cực'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản Lý Đánh Giá</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border rounded-lg">
            <option>Tất cả cảm xúc</option>
            <option>Tích cực</option>
            <option>Trung lập</option>
            <option>Tiêu cực</option>
          </select>
          <select onChange={(e) => getAllReviewsSort(e.target.value)}>
            <option value="all">Tất cả đánh giá</option>
            <option value="not_replied">Chưa trả lời</option>
            <option value="replied">Đã trả lời</option>
          </select>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Tích Cực</h3>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600">85%</p>
          <p className="text-sm text-gray-600 mt-1">{reviews.filter(r => r.sentiment === 'positive').length} đánh giá</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Trung Lập</h3>
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-2xl">😐</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-yellow-600">10%</p>
          <p className="text-sm text-gray-600 mt-1">{reviews.filter(r => r.sentiment === 'neutral').length} đánh giá</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Tiêu Cực</h3>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl">😞</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">5%</p>
          <p className="text-sm text-gray-600 mt-1">{reviews.filter(r => r.sentiment === 'negative').length} đánh giá</p>
        </div>
      </div> */}

      <div className="space-y-4">
        {reviews && reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                </div>
                <div>
                  <h3 className="font-bold">{review.order.user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{review.lastUpdateAt}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.reviewText}</p>

            {review.replyText ? (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <span className="text-sm text-gray-600">{review.replyAt}</span>
                <p className="text-sm font-medium text-orange-600 mb-2">Phản hồi của bạn:</p>
                <p className="text-gray-700">{review.replyText}</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => { 
                  setSelectedReview(review);
                  setShowReplyModal(true);
                  setOrderId(review.order.id);
                    }} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
                  <MessageSquare size={18} />
                  <span>Trả Lời</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Trả Lời Đánh Giá</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{selectedReview?.order?.user?.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < selectedReview?.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{selectedReview?.reviewText}</p>
            </div>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full px-4 py-3 border rounded-lg mb-4 h-32" placeholder="Nhập phản hồi của bạn..."></textarea>
            <div className="flex gap-3">
              <button onClick={() => {setShowReplyModal(false); setReplyText('');}} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Hủy</button>
              <button onClick={handleReplyUser} 
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Gửi Phản Hồi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
