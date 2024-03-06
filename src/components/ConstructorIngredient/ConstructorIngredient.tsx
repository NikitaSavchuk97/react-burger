import style from './ConstructorIngredient.module.scss';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  moveIngredientsCurrent,
  removeIngredientsCurrent,
} from '../../redux/slices/ingredientsCurrentSlice';
import { ConstructorIngredientsPropTypes, ItemPropTypes } from '../../utils/types';
import { useRef, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ConstructorIngredient: FC<ConstructorIngredientsPropTypes> = ({ ingredient, index }) => {
  const dispatch = useDispatch<any>();

  // Создание ссылки на DOM-элемент
  const ref = useRef<HTMLDivElement>(null);

  // Инициализация перетаскивания
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { index },
  });

  // Инициализация приема перетаскиваемого элемента
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    hover: (ingredient: ItemPropTypes & { index: number }, monitor) => {
      // Проверка наличия ссылки на текущий элемент
      if (!ref.current) return;

      const dragIndex: number = ingredient.index;
      const hoverIndex: number = index;

      // Позиция текущего элемента
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Позиция указателя мыши
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Определение направления перемещения и обновление порядка элементов
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      handleMoveIngredient(dragIndex, hoverIndex);
      ingredient.index = hoverIndex;
    },
  });

  // Привязка ссылок для перетаскивания и приема элемента
  dragRef(dropTarget(ref));

  const handleRemoveIngredient = (e: string) => {
    dispatch(removeIngredientsCurrent(e));
  };

  const handleMoveIngredient = (hoverIndex: number, dragIndex: number) => {
    dispatch(moveIngredientsCurrent({ hoverIndex, dragIndex }));
  };

  return (
    <section className={`${style.section} pr-3`} key={ingredient.removeId} ref={ref}>
      <DragIcon type={'primary'} />
      <ConstructorElement
        handleClose={() => handleRemoveIngredient(ingredient.removeId)}
        extraClass={style.section__element}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </section>
  );
};
export default ConstructorIngredient;
