import { Avatar, Input, Typography } from "antd";
import { useSelector } from "react-redux";
import "./Profile.css";
import { userSelectors } from "../../redux";
import { CameraIcon } from "../../components/icons";

function Profile() {
  const { currentUser } = useSelector(userSelectors);
  return (
    <div className="wrapper_profile">
      <div className="user_avatar_profile">
        <div className="wrap_avatar_profile">
          <Avatar
            className="avatar_profile"
            src={currentUser?.photoURL}
            icon={
              <span className="span_profile">
                {currentUser?.displayName?.charAt(0)?.toUpperCase()}
              </span>
            }
          />
          <CameraIcon className="icon_camera_profile" />
        </div>
        <Typography.Title className="name_profile" level={2}>
          {currentUser?.displayName}
        </Typography.Title>
      </div>
      <div className="user_info_profile">
        <div className="wrap_info_profile">
          <Typography.Text className="title_profile">
            Tên người dùng
          </Typography.Text>
          <Input disabled={true} value={currentUser?.displayName} />
        </div>
        <div className="wrap_info_profile">
          <Typography.Text className="title_profile">
            Tên đăng nhập
          </Typography.Text>
          <Input disabled={true} value={currentUser?.userName} />
        </div>
        <div className="wrap_info_profile">
          <Typography.Text className="title_profile">
            Số điện thoại
          </Typography.Text>
          <Input disabled={true} value={currentUser?.phone} />
        </div>
        <div className="wrap_info_profile">
          <Typography.Text className="title_profile">Mật khẩu</Typography.Text>
          <Input disabled={true} value={currentUser?.password} />
        </div>
        <div className="wrap_info_profile">
          <Typography.Text className="title_profile">Email:</Typography.Text>
          <Input disabled={true} value={currentUser?.email} />
        </div>
        <div className="wrap_info_profile">
          <Typography.Text className="title_profile">Vai trò:</Typography.Text>
          <Input disabled={true} value={currentUser?.role} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
