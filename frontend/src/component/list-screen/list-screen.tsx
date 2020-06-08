import React from "react";
import cn from "classnames";

import styles from "./list-screen.module.css";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import ListItem from "../list-item/list-item";
import Headline from "../headline/headline";
import StoreIcon from "../store-icon/store-icon";

export type Item = {
  id: string;
  icon?: JSX.Element;
  label: string;
  text: string;
  action: () => void;
};

interface ListScreenProps {
  backToIndex: () => void;
  label: string;
  list: Item[];
  selected?: Item;
}

const ListScreen: React.FC<ListScreenProps> = ({
  backToIndex,
  label,
  list,
  selected,
}) => {
  return (
    <div className={styles.root}>
      <Headline>
        <h1>{label}</h1>
      </Headline>

      <div className={styles.main}>
        <Spacer />

        <ul className={styles.list}>
          {list.map((item) => (
            <li
              key={`${item.label}-${item.text}`}
              className={cn(
                styles.item,
                selected?.id === item.id && styles.active
              )}
              onClick={item.action}
            >
              <ListItem
                label={item.label}
                text={item.text}
                icon={<StoreIcon name={item.label} />}
              />
            </li>
          ))}
        </ul>

        <Spacer />

        <Button
          className={styles.button}
          variant="secondary"
          onClick={backToIndex}
        >
          <span>Zurück zum Anfang</span>
        </Button>
      </div>
    </div>
  );
};

export default ListScreen;
