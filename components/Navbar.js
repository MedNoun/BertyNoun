import React from "react";
import styles from "../styles/navbar.module.css";
import Item from "./Item";


export default function Navbar({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.empty}></div>
      <div className="title">{data.title}</div>
      <div className={styles.items}>
        {data.items.map((e) => {
          return <Item data={e} />;
        })}
      </div>
    </div>
  );
}
