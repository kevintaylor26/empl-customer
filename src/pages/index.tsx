import { useEffect, useState } from "react";
import { request } from "../common/";
import PageFooter from "../components/index/PageFooter";
import PageNav from "../components/index/PageNav";
import LandingPage from "@components/index/LandingPage";

export default function index() {
  const [res, setRes] = useState<any>([]);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    request("home/home", {}).then((res) => {
      setRes(res.data);
    });
  }, []);

  return (
    <>
      <PageNav showLogin={showLogin} onHideLogin={() => setShowLogin(false)}/>
      <LandingPage />
      <PageFooter />
      {/* <PageFs /> */}
    </>
  );
}
