import { SAVE_PROD_LIST } from "../action_types";
import { action_types } from "./action_types";

export type ProductListData = {
  [key in string]: any;
};

export interface product_list_types extends action_types {
  data: ProductListData[];
}

const initState: ProductListData[] = [];

const ProductReducer = (
  preState = initState,
  actions: product_list_types
): ProductListData[] => {
  const { type, data } = actions;
  let newState: ProductListData[];
  switch (type) {
    case SAVE_PROD_LIST:
      newState = [...data];
      return newState;
    default:
      return preState;
  }
};

export default ProductReducer;
