// "use client";

// import { createContext, useState, useContext, useEffect } from "react";

// // Theme type definition removed

// // ThemeContextType type definition removed

// const ThemeContext = createContext(undefined);

// export const ThemeProvider = ({
//   children,
// }) => {
//   // Type argument removed from useState
//   const [theme, setTheme] = useState("light"); 
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     // Type casting 'as Theme | null' removed
//     const savedTheme = localStorage.getItem("theme");
//     const initialTheme = savedTheme || "light"; // Default to light theme

//     setTheme(initialTheme);
//     setIsInitialized(true);
//   }, []);

//   useEffect(() => {
//     if (isInitialized) {
//       localStorage.setItem("theme", theme);
//       if (theme === "dark") {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     }
//   }, [theme, isInitialized]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };