import React, { ReactNode } from "react";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles["layout"]}>
      {/* <header></header> */}
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
