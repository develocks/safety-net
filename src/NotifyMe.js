import firebase from "./firebase";
// import { useGeolocation } from "react-browser-hooks";
import Text from "antd/lib/typography/Text";

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token do usuário:", token);

    return token;
  } catch (error) {
    console.error(error);
  }
};

export default function NotifyMe() {
  return <Text>We're still building this</Text>;
}
