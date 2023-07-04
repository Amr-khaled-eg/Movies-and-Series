import styles from "@/styles/components/navigation/navigation.module.css";
import Logo from "@/public/Logo.svg";
import Image from "next/image";
import Search from "../search/search.component";
import NavLinks from "./nav-links/nav-links.component";
import burger from "@/public/burger.svg";
import SearchIcon from "@/public/search.svg";
import { useState } from "react";
import Link from "next/link";
const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className={styles.navContainer}>
      <Link href="/movies">
        <Image src={Logo} alt="logo" />
      </Link>
      <Search icon={true} show={isSearchOpen} toggleShow={toggleSearch} />
      <div className={styles.navIconsContainer}>
        <Image
          src={SearchIcon}
          alt="search icon"
          className={styles.navSearchIcon}
          onClick={toggleSearch}
        />
        <Image
          src={burger}
          alt="burger icon"
          className={styles.burger}
          onClick={toggleMenu}
        />
      </div>
      <NavLinks show={isMenuOpen} toggleShow={toggleMenu} />
    </nav>
  );
};
export default Navigation;
