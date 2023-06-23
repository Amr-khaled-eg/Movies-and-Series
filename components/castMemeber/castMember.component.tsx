import styles from "@/styles/components/castMember.module.css";
import Image from "next/image";
const CastMember = ({ member }: any) => {
  return (
    <div className={styles.memberContainer}>
      <Image
        width="100"
        height="99"
        src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
        alt={member.name}
        className={styles.castMemberImage}
      />
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberCharacter}>{member.character}</p>
      </div>
    </div>
  );
};
export default CastMember;
