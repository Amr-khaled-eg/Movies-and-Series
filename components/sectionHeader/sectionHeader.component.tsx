import styles from "@/styles/components/sectionHeader.module.css";
import { HTMLAttributes } from "react";
import Image from "next/image";
type SecionHeaderProps = {
  icon: string;
  header: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const SectionHeader = ({
  icon,
  header,
  className,
  ...other
}: SecionHeaderProps) => {
  return (
    <div
      className={
        className
          ? styles.headerContainer + " " + className
          : styles.headerContainer
      }
      {...other}
    >
      <Image src={icon} alt="string" className={styles.headingIcon} />
      <h2>{header}</h2>
    </div>
  );
};
export default SectionHeader;
