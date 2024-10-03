import React from "react";

const Navigation: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <nav className="nav-bar">{children}</nav>;
};

export default Navigation;
