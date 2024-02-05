import { ThemeContext } from "../../hooks/useTheme";
import { useContext } from "react";

export default function Logo() {

  const { theme } = useContext(ThemeContext)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" fill="none" viewBox="0 0 40 24">
      <rect width="37" height="21" x="1.5" y="1.5" stroke={theme.palette.text.secondary} strokeWidth="3" rx="3.5" />
      <path fill={theme.palette.text.secondary} d="M10.275 10.2h1.463V7h2.014v3.202h1.929v1.71h-1.928v3.334c0 .418.07.732.208.94a.709.709 0 0 0 .618.314c.222 0 .396-.041.522-.123.133-.083.213-.14.238-.172l.75 1.473c-.037.038-.148.101-.332.19a3.984 3.984 0 0 1-1.71.361c-.659 0-1.21-.196-1.653-.589-.437-.393-.655-1.007-.655-1.843v-3.885h-1.464V10.2Zm6.448 0h1.5V8.035c0-.78.146-1.413.438-1.9.29-.494.661-.856 1.111-1.083a3.042 3.042 0 0 1 1.406-.352c.59 0 1.039.082 1.35.247.316.158.509.27.579.332l-.798 1.52a2.004 2.004 0 0 0-.285-.199c-.152-.101-.358-.152-.618-.152-.19 0-.374.044-.55.133-.172.089-.318.263-.438.522-.12.26-.18.64-.18 1.14V10.2h2.137v1.71h-2.137V18h-2.014v-6.09h-1.501V10.2Z" />
      <path stroke={theme.palette.text.secondary} strokeLinecap="round" strokeWidth="2" d="M24 18h5" />
    </svg>

  );
} 
