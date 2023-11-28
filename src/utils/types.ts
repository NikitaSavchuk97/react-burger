export interface ModalPropTypes {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
}

export interface BurgerIngredientsPropTypes {
  ingredients: Array<ItemPropTypes>;
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface ProductListPropTypes {
  title: string;
  type: string;
  id: string;
  ingredients: Array<ItemPropTypes>;
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface BurgerConstructorPropTypes {
  ingredients: Array<ItemPropTypes>;
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface ItemPropTypes {
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
