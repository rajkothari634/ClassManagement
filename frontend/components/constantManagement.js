const { publicRuntimeConfig } = getConfig();
import getConfig from 'next/config'
const API = publicRuntimeConfig.PRODUCTION 
    ? publicRuntimeConfig.API_PRODUCTION 
    : publicRuntimeConfig.API_DEVELOPMENT;

const logoLink = publicRuntimeConfig.LOGOLINK;
const size = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "500px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px",
};
      
const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`,
};
const colorCode = {
    white: "#ffffff",
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
    black: "#000000"
}
const lightTheme = {
    name: 'light',
    primary: "#191A1F",
    primary25: "rgba(25,26,31,0.25)",
    primary50: "#1a90ff",
    secondary: "#0079C1",
    dark: "#FFFFFF",
    light: "#F0F0F0",
    code_background: "#2d2b55",
    background: "#efefef",
    code_text: "#e5f5fc",
    disabled: "#CACACA",
    transparent: "#00000000",
    ...colorCode
}

const UserLabel = [
    { label: "Instructor", value: "instructor" },
    { label: "Student", value: "student" }
]

const LevelLabel = [
    {label: "Beginner",value: "Beginner"},
    {label: "Intermediate", value: "Intermediate"},
    {label: "Advance", value: "Advance"}
]


export { device, UserLabel, LevelLabel ,lightTheme, API, logoLink}