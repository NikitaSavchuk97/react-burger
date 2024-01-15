export interface ModalPropTypes {
  children: React.ReactNode;
}

export interface BurgerIngredientsPropTypes {
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface ProductListPropTypes {
  refProp: any;
  title: string;
  type: string;
  id: string;
}

export interface BurgerConstructorPropTypes {
  openModal: ({ type, id }: { type: string; id: string }) => void;
}

export interface ItemPropTypes {
  removeId: number;
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
