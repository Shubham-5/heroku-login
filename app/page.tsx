import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import Register from "./register/page";
import Login from "./login/page";
import { auth } from "./firebase";

// type User = {};

export default function Home() {
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser): User => {
  //     setUser(currentUser ? currentUser : null);
  //     console.log(currentUser);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <main>
      <h2>home</h2>
    </main>
  );
}
