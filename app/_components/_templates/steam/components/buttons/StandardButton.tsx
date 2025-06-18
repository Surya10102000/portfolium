import { MouseEventHandler, ReactNode } from "react";
import styles from "./standardbutton.module.scss";

interface Props {
  children: string | ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const StandardButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.standardButton}>
      {children}
    </button>
  );
};
