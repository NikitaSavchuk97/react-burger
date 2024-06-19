import { RefObject, ReactNode, MouseEventHandler } from 'react';

export interface ItemPropTypes {
  removeId: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export interface ModalPropTypes {
  title: string | null | undefined;
  children: ReactNode;
  closeModal: () => void;
}

export interface ModalOverlayPropTypes {
  closeModal: () => void;
}

export interface ConstructorIngredientsPropTypes {
  ingredient: ItemPropTypes;
  index: number;
}

export interface ProductListPropTypes {
  refProp: RefObject<HTMLElement>;
  title: string;
  type: string;
  id: string;
}

export interface ProductPropType {
  _id: string;
}

export interface IngredientPropType {
  _id: string;
}

export interface DropItemPropTypes {
  item: ItemPropTypes;
}

export interface DraggableItemPropTypes {
  item: ItemPropTypes;
  amount: number;
  onItemGrab: MouseEventHandler<HTMLElement>;
}

export interface IngredientsSlicePropTypes {
  ingredients: Array<ItemPropTypes> | null;
  status: string;
}

export interface OrdersListsSlicePropTypes {
  userCurrentOrders: Array<ItemPropTypes> | null;
  allOrders: Array<ItemPropTypes> | null;
}

export interface CenterElementsPropTypes {
  children: ReactNode;
}

export interface OrderCurrentInProgressPropTypes {
  success: boolean;
  name: string;
  order: { number: number };
}

export interface IngredientsCurrentSlicePropTypes {
  bunCurrent: ItemPropTypes | null;
  ingredientsCurrent: Array<ItemPropTypes>;
  orderCurrentList: Array<ItemPropTypes>;
  orderCurrentInProgress: OrderCurrentInProgressPropTypes | null;
  totalPrice: number;
  status: string | null;
}

export interface IngredientsDetailsSlicePropTypes {
  ingredientDetails: object | null;
  status: string;
}
export interface OrderDetailsSlicePropTypes {
  orderDetails: OrderPropTypes | null;
  uploadedOrderDetails: OrderPropTypes | null;
  status: string;
}

export interface UseFormPropTypes {
  [key: string]: string;
}

export interface ProtectedRoutePropTypes {
  element: ReactNode;
  anonymous?: boolean;
}

export interface UserCurrentSlicePropTypes {
  userCurrentLoggedIn: boolean;
  userCurrent: { name: string; email: string } | null;
  userCurrentRegistrSuccessServerAnswer: boolean;
  userCurrentForgotPassServerAnswer: boolean;
  userCurrentResetPassServerAnswer: boolean;
  status: string;
}

export interface OrderPropTypes {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface WebSocketPropTypes {
  socketUserOrders: Array<OrderPropTypes> | null;
  socketAllOrders: Array<OrderPropTypes> | null;
  socketTotalOrders: number | null;
  socketTotalTodayOrders: number | null;
}

export interface UserPropTypes {
  email: string;
  name: string;
}

export interface GetCurrentUserPropTypes {
  success: boolean;
  user: UserPropTypes;
}

export interface GetCurrentOrderDataPropTypes {
  success: boolean;
  orders: OrderPropTypes[];
}

export interface GetCurrentOrderIdPropTypes {
  id: string;
}

export interface PatchInfoUserDataPropTypes {
  success: boolean;
  user: UserPropTypes;
}

export interface PatchInfoUserChangedDataPropTypes {
  nameValue: string;
  emailValue: string;
  passValue: string;
}

export interface PostForgotPassDataPropTypes {
  success: boolean;
  message: string;
}

export interface PostForgotPassEmailPropTypes {
  email: string;
}

export interface PostLoginUserDataPropTypes {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserPropTypes;
}

export interface PostLoginUserValuesPropTypes {
  emailValue: string;
  passValue: string;
}

export interface PostLogoutUserPropTypes {
  success: boolean;
  message: string;
}

export interface PostOrderUserDataPropTypes {
  success: boolean;
  order: OrderPropTypes;
  name: string;
}

export interface PostRegisterUserDataPropTypes {
  success: true;
  user: UserPropTypes;
  accessToken: string;
  refreshToken: string;
}

export interface PostRegisterUserValuesPropTypes {
  nameValue: string;
  emailValue: string;
  passValue: string;
}

export interface PostResetPassValuesPropTypes {
  keyValue: string;
  passValue: string;
}

export interface PostResetPassDataPropTypes {
  success: boolean;
  message: string;
}

export interface GetIngredientsPropTypes {
  success: boolean;
  data: Array<ItemPropTypes>;
}

export interface WebSocketActionHandlers {
  cookieName?: string | undefined;
  webSocketType?: string;
  webSocketUrl: string;
  connectActionType: string;
  openAction: () => void;
  errorAction: () => void;
  messageAction: (data: string) => void;
  closeAction: () => void;
}
