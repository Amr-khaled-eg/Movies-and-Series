import styles from "@/styles/components/navigation/nav-links.module.css"
import Link from "next/link";
import  redX from "@/public/redX.svg"
import Image from "next/image";
import { useRouter } from "next/router";
type NavLinksProps = {
    show:boolean
    toggleShow:()=>void
}
const NavLinks = ({show,toggleShow}:NavLinksProps)=>{
    const {asPath } = useRouter()
   return ( <>
  
    <div className={show?`${ styles.blur} ${ styles.blurOpened}`: styles.blur}></div>
   <ul className={show?`${styles.navLinksList} ${styles.navLinksListOpened}`:styles.navLinksList}>
        <Image src={redX} alt="exit" className={styles.redX} onClick={toggleShow}/>
        <li><Link href="" className={asPath.split("/")[1]==="movies" ||asPath==="/"?`${styles.navLink} ${styles.navLinkActive}`:styles.navLink}>Movies</Link></li>
        <li><Link href="" className={asPath.split("/")[1]==="seires"?`${styles.navLink} ${styles.navLinkActive}`:styles.navLink}>Seires</Link></li>
        <li><Link href="" className={asPath.split("/")[1]==="favorites"?`${styles.navLink} ${styles.navLinkActive}`:styles.navLink}>Favorite</Link></li>
        <li><Link href="" className={asPath.split("/")[1]==="history"?`${styles.navLink} ${styles.navLinkActive}`:styles.navLink}>History</Link></li>
    </ul></>)
}
export default NavLinks;