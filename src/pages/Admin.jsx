import { Outlet } from "react-router-dom";
import styles from "./admin.module.scss";
import Sidebar from "../admin/sidebar/Sidebar";


const Admin = () => {
  return (
    <div className={styles.adminPage}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
