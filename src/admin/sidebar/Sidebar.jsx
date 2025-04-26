import { NavLink } from "react-router";
import styles from "./sidebar.module.scss";
import { logo } from "../../assets";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchUserById } from "../../redux/usersSlice";
const Sidebar = () => {
  const [userAdmin, setUserAdmin] = useState(false);
  const dispatch = useDispatch();

  const { user, userStatus } = useSelector((state) => state.user);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUserById());
    }
  }, [dispatch, userStatus]);

  if (userStatus === "loading") {
    return <p>Loading....</p>;
  }

  if (userStatus === "succeeded") {
    if (user?.roles?.includes("Admin")) {
      setUserAdmin(true);
    }
  }

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles["sidebar-links"]}>
        <h2>القائمه</h2>
        <ul>
          <li>
            <NavLink to="/">
              <span>الصفحة الرئيسية</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span>الطلبات</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span>المبيعات</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/my-group"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span>مجموعتي</span>
            </NavLink>
          </li>
          <li>
            {userAdmin && (
              <NavLink
                to="/admin/categories"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>الفئات</span>
              </NavLink>
            )}
          </li>
          <li>
            {userAdmin && (
              <NavLink
                to="/admin/saler"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>البائعين</span>
              </NavLink>
            )}
          </li>
          <li>
            {userAdmin && (
              <NavLink
                to="/admin/all-products"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>المنتجات</span>
              </NavLink>
            )}
          </li>
          <li>
            {userAdmin && (
              <NavLink
                to="/admin/account"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>البروفيل</span>
              </NavLink>
            )}
          </li>
        </ul>

        <div className={styles["logout"]}>
          <button className="--btn">تسجيل الخروج</button>
          <RiLogoutCircleRLine color="" />
        </div>
      </div>
    </div>
  );
};

/*
 const sidebarLinks = [
    {
      id: 0,
      name: "الصفحة الرئيسية",
      path: "/",
    },
    {
      id: 1,
      name: "الطلبات ",
      path: "/admin/orders",
    },
    {
      id: 2,
      name: "المبيعات ",
      path: "/admin/sales",
    },
    {
      id: 3,
      name: " مجموعتي",
      path: "/admin/products",
    },
    {
      id: 4,
      name: "البائعين ",
      path: "/admin/saler",
    },
    {
      id: 5,
      name: "البروفيل ",
      path: "/admin/account",
    },
    {
      id: 6,
      name: " ",
      path: "/admin/",
    },
    {
      name: " ",
      path: "/admin/",
    },
  ];

  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate()

  const handelLiClick = (sidebarLink)=>{
    navigate(sidebarLink.path)
    setActiveLink(sidebarLink.id)
  }
  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles["sidebar-links"]}>
        <h2>القائمة</h2>
        <ul>
          {sidebarLinks.map((sidebarLink) => (
            <li
              key={sidebarLink.id}
              onClick={() => handelLiClick(sidebarLink)}
              className={activeLink === sidebarLink.id ? styles.activeLink : ""}
            >
              
                <span>{sidebarLink.name}</span>
         
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
*/

export default Sidebar;
