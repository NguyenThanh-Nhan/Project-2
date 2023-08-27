import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { roleSelectors, useAppDispatch, userSelectors } from "../../../redux";
import { IDropdown, IUser } from "../../../interfaces";
import UserSlice, { fetchAllUsers } from "../../../redux/slices/UserSlice";
import { fetchAllRole } from "../../../redux/slices/RoleSlice";
import config from "../../../config/routes";
import PathSlice from "../../../redux/slices/PathSlice";
import { db } from "../../../firebase";
import Dropdown from "../../../components/Dropdown";
import "./ListAccount.css";
import Search from "../../../components/Search";
import Table from "../../../components/Table";
import { AddSquare } from "../../../assect/img/1index";
import useDebug from "../../../hooks/useDebug";

function Account() {
  const dispatch = useAppDispatch();
  const { roles } = useSelector(roleSelectors);
  const { users, loading } = useSelector(userSelectors);
  const [searchValue, setSearchValue] = useState("");
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const [roleList, setRoleList] = useState<IDropdown[]>([
    {
      label: "Tất cả",
      value: "Tất cả",
    },
  ]);
  const debugValue = useDebug(searchValue, 500);
  useEffect(() => {
    snapshotDB();
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(
      users.filter((item) =>
        item.displayName.toUpperCase().includes(debugValue.toUpperCase())
      )
    );
  }, [debugValue, users]);

  useEffect(() => {
    dispatch(fetchAllRole());
    let data: IDropdown[] = [];
    roles.forEach((role) => {
      data.push({
        label: role.roleName,
        value: role.roleName,
      });
    });
    setRoleList([{ label: "Tất cả", value: "Tất cả" }, ...data]);
  }, [dispatch, roles, roles.length]);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Họ tên",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <div
          className={
            text?.toUpperCase() === "Hoạt động"?.toUpperCase()
              ? "status active"
              : "status stopped"
          }
        >
          {text}
        </div>
      ),
    },
    {
      render: (record: IUser) => (
        <Link
          className="btn-link"
          to={config.routes.updateAccount}
          onClick={() => {
            dispatch(
              PathSlice.actions.appendPath({
                name: "Cập nhật tài khoản",
                link: "",
              })
            );
            dispatch(UserSlice.actions.setUserUpdate(record));
          }}
        >
          Cập nhật
        </Link>
      ),
    },
  ];

  const snapshotDB = () => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      let data: IUser[] = [];
      snapshot.docs.map(
        (doc) =>
          ({
            _id: doc.id,
            key: doc.id,
            ...doc.data(),
          } as IUser)
      );
      setDataSource(
        data.sort((a, b) => a.displayName.localeCompare(b.displayName))
      );
    });
  };

  const handleFilter = (value: React.ChangeEvent<HTMLInputElement>) => {
    String(value) === "Tất cả"
      ? setDataSource(users)
      : setDataSource(
          users.filter((item: IUser) => item.role === String(value))
        );
  };

  return (
    <div className="wrapper_accountL">
      <h1 className="heading_accountL">Danh sách tài khoản</h1>
      <div className="filter_accountL">
        <div>
          <span className="title_accountL">Tên vai trò</span>
          <Dropdown
            options={roleList}
            onChange={(value) => handleFilter(value)}
          />
        </div>
        <div>
          <span className="title_accountL">Từ khoá</span>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Nhập vào họ tên"
          />
        </div>
      </div>
      <div className="wrap_accountL">
        <Table columns={columns} rows={dataSource} loading={loading} />
        <Link
          onClick={() =>
            dispatch(
              PathSlice.actions.appendPath({
                name: "Thêm tài khoản",
                link: "",
              })
            )
          }
          to={config.routes.addAccount}
          className="add-btn_accountL"
        >
          <img src={AddSquare} alt="" /> <span>Thêm tài khoản</span>
        </Link>
      </div>
    </div>
  );
}

export default Account;
