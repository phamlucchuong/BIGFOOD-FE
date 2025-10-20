import { getCategories } from "../../api/categoryCard/categoryApi";
import drink from "../../assets/images/drink-category.png";
import fastFood from "../../assets/images/fastFood-category.png";
import asia_eu from "../../assets/images/asia-eu-category.png";
import rice from "../../assets/images/rice-category.png";

const handleLoadCategories = async () => {
  const data = await getCategories();
  const categoryList = [];

  data.forEach((categori) => {
    let name, image;

    switch (categori.name) {
      case "Đồ uống":
        name = "drink";
        image = drink;
        break;
      case "Thức ăn nhanh":
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
      id: categori.id,
      title: categori.name,
      name,
      image,
    });
  });

  return categoryList;
};

export default handleLoadCategories;
