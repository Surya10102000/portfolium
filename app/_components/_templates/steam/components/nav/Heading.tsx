import styles from "./heading.module.scss";
import { MyLinks } from "./components/MyLinks";
import { OutlineButton } from "../buttons/OutlineButton";
import { Contact } from "@/types/userData";
import Link from "next/link";
import { StarsIcon } from "lucide-react";

export const Heading = ({ contact }: { contact: Contact }) => {
  return (
    <header className={styles.heading}>
      {contact && <MyLinks contact={contact} />}
      {contact.email && (
        <Link target="_blank" href="/">
          <OutlineButton><StarsIcon size="2.4rem"/>Portfolium</OutlineButton>
        </Link>
      )}
    </header>
  );
};
