import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { roleSelectors, useAppDispatch } from "../../../redux";
import { IRole } from "../../../interfaces";
import config from "../../../config/routes";
import RoleSlice, { fetchAllRole } from "../../../redux/slices/RoleSlice";
import { db } from "../../../firebase";
import "./ListRole.css"
import PathSlice from "../../../redux/slices/PathSlice";
import Table from "../../../components/Table";
import Search from "../../../components/Search";
import useDebug from "../../../hooks/useDebug";
import { AddSquare } from "../../../assect/img/1index";

function ListRole() {
  const { roles, loading } = useSelector(roleSelectors);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<IRole[]>([]);
  const [searchText, setSearchText] = useState("");
  const debugValue = useDebug(searchText, 500);
  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Số người dùng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      render: (record: IRole) => (
        <Link
          onClick={() => handleClickUpdate(record)}
          to={config.routes.updateRole}
          className="btn-link"
        >
          Cập nhật
        </Link>
      ),
    },
  ];


  useEffect(() => {
    snapshotDatabase();
    dispatch(fetchAllRole());
  }, [dispatch]);

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugValue, roles]);

  const snapshotDatabase = () => {
    onSnapshot(collection(db, "roles"), (snapshot) => {
      let data: IRole[] = [];
      snapshot.docs.map((doc) => {
        return data.push({
          _id: doc.id,
          key: doc.id,
          ...doc.data(),
        } as IRole);
      });
      setDataSource(data.sort((a, b) => a.roleName.localeCompare(b.roleName)));
    });
  };

  const handleFilter = () => {
    setDataSource(
      roles.filter((role) =>
        role.roleName.toUpperCase().includes(debugValue.toUpperCase())
      )
    );
  };

  const handleClickUpdate = (record: IRole) => {
    dispatch(RoleSlice.actions.setInfoUpdate(record));
    dispatch(
      PathSlice.actions.appendPath({
        name: "Cập nhật vai trò",
        link: "",
      })
    );
  };

  return (
    <div className="wrapper_roleL">
      <header className="header_roleL">
        <h1 className="heading_roleL">Danh sách vai trò</h1>
        <div className="search_roleL">
          <span className="title_roleL">Từ khoá</span>
          <Search
            placeholder="Nhập từ khóa"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </header>
      <div className="wrap_roleL">
        <Table
          columns={columns}
          rows={dataSource}
          pagination={false}
          loading={loading}
        />
        <Link
          onClick={() =>
            dispatch(
              PathSlice.actions.appendPath({
                name: "Thêm vai trò",
                link: "",
              })
            )
          }
          to={config.routes.addRole}
          className="addRole-btn_roleL"
        >
          <img src={AddSquare} alt="" />
          <span>
            Thêm <br /> vai trò
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ListRole;
