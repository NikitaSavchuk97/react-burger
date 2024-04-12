import style from './DraggableItem.module.scss';

import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { DraggableItemPropTypes } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const DraggableItem: FC<DraggableItemPropTypes> = ({ item, amount, onItemGrab }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'sauce',
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <section
      ref={dragRef}
      className={`${style.item}`}
      key={item._id}
      id={item._id}
      onClick={onItemGrab}
    >
      {!isDrag && (
        <>
          {amount > 0 && <p className='text text_type_digits-default pt-1 pb-1'>{amount}</p>}
          <img src={item.image} alt={item.name} />
          <b className='text text_type_digits-default pt-1 pb-1'>
            {item.price} <CurrencyIcon type='primary' />
          </b>
          <h5 className='text text_type_main-default pb-5'>{item.name}</h5>
        </>
      )}
    </section>
  );
};

export default DraggableItem;
