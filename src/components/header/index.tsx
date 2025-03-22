import { useState } from "react";

const Header = () => {
    const themeFlag = useState('light');
    const changeTheme = () => {
        if(themeFlag[0] === 'dark'){
            document.documentElement.removeAttribute('theme-mode');
            themeFlag[1]('light');
            console.log(111);
            
        }else{
            document.documentElement.setAttribute('theme-mode', 'dark');
            themeFlag[1]('dark');
            console.log(222);
            
        }
    }
    return (
        <header className=" text-white border-b-[1px] py-2 flex justify-between px-10">
            <span>search</span>
            <span onClick={changeTheme}>change({themeFlag[0]})</span>
        </header>
    );
};

export default Header;