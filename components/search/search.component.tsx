import styles from "@/styles/components/search.module.css"
import SearchIcon from "@/public/search.svg" 
import whiteX from "@/public/whiteX.svg"
import { HTMLInputElement, InputHTMLAttributes, } from "react";
import Image from "next/image";
type SearchProps ={
    icon?:boolean;
    show?:boolean
    toggleShow?:()=>void
}&InputHTMLAttributes<HTMLInputElement>;

const Search = ({icon,show,toggleShow,...otherProps}:SearchProps)=>{
   return ( <div className={show?`${styles.searchContainer} ${styles.searchContainerOpened}`:styles.searchContainer}>
       {icon  && <Image src={SearchIcon} alt="search-icon" className={styles.searchIcon}/>}
        <input type="search" placeholder="Seach" className={styles.searchInput} {...otherProps}/>
        {show&& <Image src={whiteX} alt="exit-icon" className={` ${styles.Xicon}`} onClick={toggleShow}/>}
    </div>)
}
export default Search;