import styles from "./heading.module.scss";
import { MyLinks } from "./components/MyLinks";
import { OutlineButton } from "../buttons/OutlineButton";
import { Contact } from "@/types/userData";
import Link from "next/link";

export const Heading = ({ contact }: { contact: Contact }) => {
  return (
    <header className={styles.heading}>
      {contact && <MyLinks contact={contact} />}
      {contact.email && (
        <OutlineButton>
          <Link href={`mailto:${contact?.email as string}`}>Email</Link>
        </OutlineButton>
      )}
    </header>
  );
};
