import React from "react";

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <main className="main">{children}</main>;
};

export default Main;
