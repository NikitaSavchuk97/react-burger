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
  children: React.ReactNode;
  closeModal: () => void;
}

export interface ModalOverlayPropTypes {
  closeModal: () => void;
}

export interface BurgerIngredientsPropTypes {
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface ConstructorIngredientsPropTypes {
  ingredient: ItemPropTypes;
  index: number;
}

export interface BurgerConstructorPropTypes {
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface ProductListPropTypes {
  refProp: any;
  title: string;
  type: string;
  id: string;
  openModal: ({ type, id }: { type: string; id: string }) => void;
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
  onItemGrab: (e: any) => void;
}

export interface IngredientsSlicePropTypes {
  ingredients: Array<object>;
  status: string;
}

export interface IngredientsCurrentSlicePropTypes {
  bunCurrent: Array<object>;
  ingredientsCurrent: Array<object>;
  orderCurrentList: Array<object>;
  orderCurrentInProgress: object;
  totalPrice: number;
  status: string;
}

export interface IngredientsDetailsSlicePropTypes {
  ingredientDetails: object;
  status: string;
}
