import React from "react";
import Register from "./register/page";

export default function Home() {
  const user = null;

  return <main>{user ? <h2>home</h2> : <Register />}</main>;
}
