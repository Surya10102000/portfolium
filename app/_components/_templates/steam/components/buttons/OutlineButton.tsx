import {  MouseEventHandler, ReactNode } from "react";
import styles from "./outlinebutton.module.scss";
import { PanelLeftDashedIcon } from "lucide-react";

interface Props {
  children: string | ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const OutlineButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.outlineButton}>
      <PanelLeftDashedIcon size="2.4rem" />
      {children}
    </button>
  );
};
