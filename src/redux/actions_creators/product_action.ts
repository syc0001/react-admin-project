import { SAVE_PROD_LIST } from "../action_types";
import {
  ProductListData,
  product_list_types,
} from "../reducers/product_reducer";

export const createSaveProductListAction = (
  value: ProductListData[]
): product_list_types => {
  return {
    type: SAVE_PROD_LIST,
    data: value,
  };
};
