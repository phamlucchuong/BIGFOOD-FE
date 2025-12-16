import { createNewReview, updateReviewById } from "../../api/common/reviewApi";
export default function useReview() {
  const createReview = async (orderId, CreateReviewRequest) => {
    // Implement create review logic here
    const response = await createNewReview(orderId, CreateReviewRequest);
    if (response.ok) {
      // Optionally refresh order data
      return response.results;
    }
  };

  const updateReview = async (orderId, updateReviewRequest) => {
    // Implement create review logic here
    const response = await updateReviewById(orderId, updateReviewRequest);
    if (response.ok) {
      // Optionally refresh order data
      return response.results;
    }
  };

  return { createReview, updateReview };
}
