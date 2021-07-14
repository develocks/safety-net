import "./App.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./firebase";
import Map from "./Map";
import NotifyMe from "./NotifyMe";
import Report from "./Report";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import firebase from "./firebase";
import Loading from "./Loading";
import { Layout, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import Profile from "./Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
const { Header, Content, Footer } = Layout;

function AuthenticatedRoute({ children, ...rest }) {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (error) return <span>An error occurred</span>;
  if (loading) return <Loading />;
  return <Route {...rest}>{user ? children : <Login />}</Route>;
}

function App() {
  const { pathname } = useLocation();
  const { push: navigate } = useHistory();
  const [user] = useAuthState(firebase.auth());
  useEffect(() => {
    if (!window.location.host.includes("localhost"))
      firebase.analytics().logEvent("page_view", {
        page_path: pathname,
      });
  }, [pathname]);

  function onProfileClick() {
    firebase.auth().signOut();
  }

  return (
    <div className="safety-net">
      <Layout>
        <Header>
          <Title>Safety Net</Title>
          <Menu
            theme="dark"
            mode="horizontal"
            onSelect={({ key }) => navigate(key)}
            selectedKeys={[pathname]}
          >
            <Menu.Item key="/">Map</Menu.Item>
            {/* <Menu.Item key="/report" >Report</Menu.Item> */}
            {/* <Menu.Item key="/notify" >Notify me</Menu.Item> */}
            {!!user && (
              <Menu.Item key="profile" onClick={onProfileClick}>
                <Profile />
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content>
          <div>
            <Switch>
              <AuthenticatedRoute path="/notify">
                <NotifyMe />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/report">
                <Report />
              </AuthenticatedRoute>
              <Route path="/">
                <Map />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          We unfortunately cannot verify that all data is accurate and/or complete. Please be cautious and remain vigilant.
          <br />A{" "}
          <a href="https://develocks.dev">
            <img height="25" src="/develocks.png" alt="Develocks" />
          </a>{" "}
          initiative
          <br />
          Thanks to Devin Hitchings for the base map
        </Footer>
      </Layout>
    </div>
  );
}

export default function RouteredApp({ children }) {
  return (
    <Router>
      <App />
    </Router>
  );
}
