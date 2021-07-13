import { Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import firebase from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) return <Spin />;
  if (error) return null;
  let content = "Login";
  let avatar = <Avatar icon={<UserOutlined />} />;
  if (user) {
    const { photoURL, displayName } = user;
    content = <>Welcome {displayName}, Logout</>;
    if (photoURL) avatar = <Avatar src={photoURL} />;
  }

  return (
    <div className="profile">
      {avatar}
      {content}
    </div>
  );
}
