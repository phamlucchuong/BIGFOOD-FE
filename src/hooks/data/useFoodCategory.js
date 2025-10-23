import { getCategories } from "../../api/common/categoryApi";
import drink from "../../assets/images/drink-category.png";
import fastFood from "../../assets/images/fastFood-category.png";
import asia_eu from "../../assets/images/asia-eu-category.png";
import rice from "../../assets/images/rice-category.png";

const handleLoadCategories = async () => {
  const response = await getCategories();
  const data =  response.results;
  const categoryList = [];

  data.forEach((category) => {
    let name, image;

    switch (category.name) {
      case "Đồ Uống":
        name = "drink";
        image = drink;
        break;
      case "Thức Ăn Nhanh":
        name = "fastFood";
        image = fastFood;
        break;
      case "Món Á-Âu":
        name = "euFood";
        image = asia_eu;
        break;
      case "Cơm":
        name = "rice";
        image = rice;
        break;
      default:
        name = "other";
        image = null;
        break;
    }

    categoryList.push({
      id: category.id,
      title: category.name,
      image,
    });
  });

  return categoryList;
};

export default handleLoadCategories;
