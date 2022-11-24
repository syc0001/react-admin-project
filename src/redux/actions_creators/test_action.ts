import { test1, test2 } from "../action_types";

export const createDemo1Action = (value: string) => ({
  type: test1,
  data: value,
});
export const createDemo2Action = (value: string) => ({
  type: test2,
  data: value,
});
