import { Button, Checkbox, Input } from "antd";
import { useNavigate } from "react-router-dom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { roleSelectors, useAppDispatch } from "../../../redux";
import "./AddRole.css";
import MessageNotify from "../../../components/Message";
import { addRole } from "../../../redux/slices/RoleSlice";
import { IRole } from "../../../interfaces";

const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];

function AddRole() {
  const { loading } = useSelector(roleSelectors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkAll, setCheckAll] = useState({
    checkAllGroup1: false,
    checkAllGroup2: false,
    checkAllGroup3: false,
  });
  const [state, setState] = useState({
    roleName: "",
    description: "",
    roles: {
      group1: [] as CheckboxValueType[],
      group2: [] as CheckboxValueType[],
      group3: [] as CheckboxValueType[],
    },
  });

  const {
    roleName,
    description,
    roles: { group1, group2, group3 },
  } = state;
  const { checkAllGroup1, checkAllGroup2, checkAllGroup3 } = checkAll;

  const handleCheckedFunc = (
    list: CheckboxValueType[],
    key1: "group1" | "group2" | "group3",
    key2: "checkAllGroup1" | "checkAllGroup2" | "checkAllGroup3"
  ) => {
    const copyGroup: any = { ...state.roles };
    const copyState: any = { ...checkAll };
    copyGroup[key1] = [...list];
    copyState[key2] = list.length === plainOptions.length;
    setState({
      ...state,
      roles: {
        ...copyGroup,
      },
    });
    setCheckAll(copyState);
  };

  const handleCheckedAll = (
    e: CheckboxChangeEvent,
    key1: string,
    key2: "group1" | "group2" | "group3"
  ) => {
    const copyState: any = { ...checkAll };
    const copyGroup = { ...state.roles };

    if (e.target.checked) {
      copyGroup[key2] = plainOptions;
    } else {
      copyGroup[key2] = [];
    }

    copyState[key1] = e.target.checked;
    setState({
      ...state,
      roles: {
        ...copyGroup,
      },
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: "roleName" | "description"
  ) => {
    const copyState = { ...state };
    copyState[key] = e.target.value;
    setState(copyState);
  };

  const handleAddRole = async () => {
    if (
      !roleName ||
      (group1.length === 0 && group2.length === 0 && group3.length === 0)
    ) {
      MessageNotify(
        "error",
        <p>
          Các trường dấu <span className="required">*</span> là bắt buộc
        </p>,
        "topRight"
      );
      return;
    }

    const response = await dispatch(
      addRole({ ...state, quantity: 0 } as IRole)
    );
    if (response.payload) {
      MessageNotify("success", "Đã thêm vai trò mới", "topRight");
      navigate(-1);
    } else MessageNotify("error", "Đã có lỗi xảy ra!", "topRight");
  };

  return (
    <div className="wrapper_roleA">
      <h1 className="heading_roleA">Danh sách vai trò</h1>
      <div className="wrap_roleA">
        <h2 className="sub-heading_roleA">Thông tin vai trò</h2>
        <div className="wrap-content_roleA">
          <div className="content_roleA">
            <p className="title_roleA">
              Tên vai trò
              <span className="required_roleA">*</span>
            </p>
            <Input
              className="input_roleA"
              placeholder="Nhập tên vai trò"
              spellCheck={false}
              value={roleName}
              onChange={(e) => handleOnChange(e, "roleName")}
            />
            <p className="title_roleA">Mô tả:</p>
            <Input.TextArea
              className="desc_roleA"
              placeholder="Nhập mô tả"
              spellCheck={false}
              value={description}
              onChange={(e) => handleOnChange(e, "description")}
            />
            <p className="title_roleA">
              <span className="required_roleA">*</span> Là trường thông tin bắt
              buộc
            </p>
          </div>
          <div className="content_roleA">
            <p className="title_roleA">
              Phân quyền chức năng
              <span className="required_roleA">*</span>
            </p>
            <div className="group-func_roleA">
              <div className="func_roleA">
                <h2 className="sub-heading_roleA">Nhóm chức năng A</h2>
                <Checkbox
                  onChange={(e) =>
                    handleCheckedAll(e, "checkAllGroup1", "group1")
                  }
                  checked={checkAllGroup1}
                >
                  Tất cả
                </Checkbox>
                <Checkbox.Group
                  options={plainOptions}
                  value={group1}
                  onChange={(value) =>
                    handleCheckedFunc(value, "group1", "checkAllGroup1")
                  }
                />
              </div>
              <div className="func_roleA">
                <h2 className="sub-heading_roleA">Nhóm chức năng B</h2>
                <Checkbox
                  onChange={(e) =>
                    handleCheckedAll(e, "checkAllGroup2", "group2")
                  }
                  checked={checkAllGroup2}
                >
                  Tất cả
                </Checkbox>
                <Checkbox.Group
                  options={plainOptions}
                  value={group2}
                  onChange={(value) =>
                    handleCheckedFunc(value, "group2", "checkAllGroup2")
                  }
                />
              </div>
              <div className="func_roleA">
                <h2 className="sub-heading_roleA">Nhóm chức năng C</h2>
                <Checkbox
                  onChange={(e) =>
                    handleCheckedAll(e, "checkAllGroup3", "group3")
                  }
                  checked={checkAllGroup3}
                >
                  Tất cả
                </Checkbox>
                <Checkbox.Group
                  options={plainOptions}
                  value={group3}
                  onChange={(value) =>
                    handleCheckedFunc(value, "group3", "checkAllGroup3")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_roleA">
        <button onClick={() => navigate(-1)} className="cancel-btn_roleA">
          Hủy bỏ
        </button>
        <Button
          className="add-btn_roleA"
          loading={loading}
          onClick={handleAddRole}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

export default AddRole;
