import { Avatar, Input, Typography } from "antd";
import { useSelector } from "react-redux";
import { userSelectors } from "../../redux/selectors";
import { CameraIcon } from "../../components/icons";
import "./Profile.css";

function Profile() {
  const { currentUser } = useSelector(userSelectors);
  return (
    <div className="wrapper_profile">
      <div className="user_avatar">
        <div className="wrap_avatar">
          <Avatar
            className="avatar_Profile"
            src={currentUser?.photoURL}
            icon={
              <span className="span_profile">
                {currentUser?.displayName?.charAt(0)?.toUpperCase()}
              </span>
            }
          />
          <CameraIcon className="icon_camera" />
        </div>
        <Typography.Title className="name_profile" level={2}>
          {currentUser?.displayName}
        </Typography.Title>
      </div>
      <div className="user_info">
        <div className="wrap_info">
          <Typography.Text className="title">Tên người dùng</Typography.Text>
          <Input disabled={true} value={currentUser?.displayName} />
        </div>
        <div className="wrap_info">
          <Typography.Text className="title">Tên đăng nhập</Typography.Text>
          <Input disabled={true} value={currentUser?.userName} />
        </div>
        <div className="wrap_info">
          <Typography.Text className="title">Số điện thoại</Typography.Text>
          <Input disabled={true} value={currentUser?.phone} />
        </div>
        <div className="wrap_info">
          <Typography.Text className="title">Mật khẩu</Typography.Text>
          <Input disabled={true} value={currentUser?.password} />
        </div>
        <div className="wrap_info">
          <Typography.Text className="title">Email:</Typography.Text>
          <Input disabled={true} value={currentUser?.email} />
        </div>
        <div className="wrap_info">
          <Typography.Text className="title">Vai trò:</Typography.Text>
          <Input disabled={true} value={currentUser?.role} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
