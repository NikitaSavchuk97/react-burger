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
  status: string;
}

export interface IngredientsDetailsSlicePropTypes {
  ingredientDetails: object | null;
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
