import { Navigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

export default function OAuth() {
  const code = "code";

  const sendCode = async () => {
    try {
      const response = await axios.post("/api/gmail/", { code: code });
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    sendCode();
  });

  return <Navigate to={"/home"} />;
}
