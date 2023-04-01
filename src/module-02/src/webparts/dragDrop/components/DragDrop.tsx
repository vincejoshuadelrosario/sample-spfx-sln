import * as React from 'react';
import styles from './DragDrop.module.scss';
import { IDragDropProps } from './IDragDropProps';
import { useRef, useState } from 'react';

const DragDrop: React.FC<IDragDropProps> = () => {
  const dragItem = useRef<number>();
  const dragOverItem = useRef<number>();

  const [list, setList] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',]);
  
  const onItemDrag = (e: React.DragEvent<HTMLDivElement>, position: number): void => {
    dragItem.current = position;
  };
 
  const onItemEnter = (e: React.DragEvent<HTMLDivElement>, position: number): void => {
    dragOverItem.current = position;
  };

  const onItemDrop = (): void => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent); 
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const onItemOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return (<section className={styles.dragDrop}>
    <div className={styles.list}>
    {
      list &&
      list.map((item, index) => (
        <div className={styles.listItem}
          onDragStart={(e) => onItemDrag(e, index)}
          onDragEnter={(e) => onItemEnter(e, index)}
          onDragOver={(e) => onItemOver(e)}
          onDragEnd={() => onItemDrop()}
          key={index}
          draggable>
            {item}
        </div>
      )) 
    }
    </div>
  </section>);
}

export default DragDrop;