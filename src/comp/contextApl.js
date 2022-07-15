import { useState, createContext } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [blog, setBlog] = useState('Pakistan')

    function getBlogs(params) {
        return blog
 
   }

return (<AppContext.Provider value={{blog, setBlog, getBlogs}}>
    {children}
</AppContext.Provider>)



}