import styles from "@/src/utils/style";
import NavItems from "./NavItems";
import ProfileDropDown from "./ProfileDropDown";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-b from-[#0F1524] to-[#0b0b0b]">
      <div className="w-[90%] h-20 m-auto flex items-center justify-between">
        <h1 className={`${styles.logo}`} >FastFoodGo</h1>
        <NavItems activeItem={1}/>
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
