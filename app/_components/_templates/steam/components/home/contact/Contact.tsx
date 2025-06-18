import { Mail } from "lucide-react";
import { Reveal } from "../../utils/Reveal";
import styles from "./contact.module.scss";
import Link from "next/link";
import { Contact as IContact } from "@/types/userData";

export const Contact = ({ contact }: { contact: IContact }) => {
  const { email, github, linkedIn, twitter } = contact;
  return (
    <section className="section-wrapper" id="contact">
      <div className={styles.contactWrapper}>
        <Reveal width="100%">
          <h4 className={styles.contactTitle}>
            Contact<span>.</span>
          </h4>
        </Reveal>
        <Reveal width="100%">
          <p className={styles.contactCopy}>
            Have an idea to discuss? Shoot me an email if you want to connect!
            You can also find me on{" "}
            {linkedIn && (
              <span>
                <Link href={linkedIn} target="_blank" rel="nofollow">
                  Linkedin
                </Link>{" "}
              </span>
            )}
            {twitter && (
              <span>
                {twitter && linkedIn &&<span>or </span>}
                <Link href={twitter} target="_blank" rel="nofollow">
                  Twitter
                </Link>{" "}
              </span>
            )}
            if that&apos;s more your speed.
          </p>
        </Reveal>

        {email && <Reveal width="100%">
          <Link href={`mailto:${email}`}>
            <div className={styles.contactEmail}>
              <Mail size="2.4rem" />
              <span>Send Email</span>
            </div>
          </Link>
        </Reveal>}
      </div>
    </section>
  );
};
