import { FaSun, FaMoon, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import tw from "tailwind-styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import { FlexRowCenteredY } from "@/components/styled-global-components";
import LanguageSwitcher from "../LanguageSwitcher";
import JSCookies from "js-cookie"
import { logOut } from "@/requests/auth";
import { LoadingContext } from "@/context/LoadingContext";

const NavItemContainer = tw.div`
  flex
  items-center
  gap-2
  relative
`

const IconBackground = tw.button`
  flex
  items-center
  justify-center
  bg-slate-200 
  dark:bg-gray-700
  text-base
  p-2
  rounded-full
  focus:outline-none
  focus:ring-4
  focus:ring-gray-300
  dark:focus:ring-gray-600
`

const Dropdown = tw.div`
  z-10
  absolute
  right-2
  top-8
  bg-white
  divide-y
  divide-gray-100
  rounded-lg
  shadow
  w-44
  dark:bg-gray-700
  dark:divide-gray-600
`

const ListItem = tw.li`
    flex 
    items-center 
    gap-2 
    p-2 
    hover:bg-slate-200
    dark:hover:bg-slate-600
`

const ListContainer = tw.ul`
    flex 
    flex-col 
    text-sm
`

interface DropDownProps {
    onDarkModeToggle: () => void;
    darkMode: boolean;
}

const NavDropdown = ({ onDarkModeToggle, darkMode }: DropDownProps,) => {
    const { setIsLoading } = useContext(LoadingContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Specify the type for the ref

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        try {
            setIsLoading(true)
            await logOut();
            // redirect to sign in page with a full page reload
            window.location.href = '/sign-in';
        } catch (error) {
            setIsLoading(false)
            console.error('Failed to sign out:', error);
            // Here you could set an error state, show a toast notification, etc.
        }
    };

    return (
        <NavItemContainer>
            <IconBackground onClick={() => setIsOpen(!isOpen)}>
                <FaUser />
            </IconBackground>
            {isOpen && (
                <Dropdown ref={dropdownRef}>
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <span className="block text-sm">
                            {JSCookies.get("full_name") ? JSCookies.get("full_name") : ""}
                        </span>
                        <span className="block truncate text-sm font-bold">
                            {JSCookies.get("public_email") ? JSCookies.get("public_email") : ""}
                        </span>
                    </div>
                    <ListContainer>
                        <ListItem>
                            <Toggle
                                onChange={onDarkModeToggle}
                                checked={darkMode}
                            />
                        </ListItem>
                        <ListItem>
                            <FaCog />
                            <a href="#" className="w-full">
                                Settings
                            </a>
                        </ListItem>
                        <li className="p-2">
                            <LanguageSwitcher />
                        </li>
                    </ListContainer>
                    <FlexRowCenteredY
                        className="p-2 gap-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                        onClick={handleSignOut}
                    >
                        <FaSignOutAlt />
                        <span>Sign out</span>
                    </FlexRowCenteredY>
                </Dropdown>
            )}
        </NavItemContainer>
    );
};

interface ToggleProps {
    checked: boolean;
    onChange: () => void;
}


const Toggle = ({ checked, onChange }: ToggleProps) => {
    return (
        <FlexRowCenteredY
            className="cursor-pointer w-full"
            onClick={(e) => {
                e.stopPropagation();
                onChange();
            }}
        >
            {checked ? (
                <FlexRowCenteredY className="gap-2 w-full">
                    <FaSun className="text-slate-50" />
                    <span>Light</span>
                </FlexRowCenteredY>
            ) : (
                <FlexRowCenteredY className="gap-2 w-full">
                    <FaMoon className="text-slate-600" />
                    <span>Dark</span>
                </FlexRowCenteredY>
            )}
        </FlexRowCenteredY>
    );
};


export default NavDropdown;
