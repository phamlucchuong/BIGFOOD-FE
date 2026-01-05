import { getCategories } from "../../api/common/categoryApi";

const handleLoadCategories = async () => {
  const response = await getCategories();
  return response.results;
};

export default handleLoadCategories;
