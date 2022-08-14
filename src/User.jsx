import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState({});
  const id = useLocation().pathname.split("/")[2];

  // solution 1: FETCH AND CLEAN-UP
  // useEffect(() => {
  //   let unsubscribed = false;
  //   fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!unsubscribed) {
  //         setUser(data);
  //       }
  //     });

  //   return () => {
  //     console.log("cancelled!")
  //     unsubscribed = true;
  //   };
  // }, [id]);

  // solution 2: FETCH AND ABORT REQUEST
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.name);
  //       console.log(err.message);

  //       if (err.name === "AbortError") {
  //         console.log("Request canceled!");
  //       } else {
  //         // TODO: handle error
  //       }
  //     });

  //   return () => {
  //     controller.abort();
  //   };
  // }, [id]);

  // solution 3: FETCH AND ABORT (AXIOS)
  useEffect(() => {
    console.log("useEffect mounts");
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled!");
        } else {
          // TODO: handle error
        }
      });

    return () => {
      console.log("useEffect unmounts");
      controller.abort();
    };
  }, [id]);

  //solution 3: FETCH AND ABORT (AXIOS) deprecated
  // useEffect(() => {
  //   const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();

  //   axios
  //     .get(`https://jsonplaceholder.typicode.com/users/${id}`, {
  //       cancelToken: source.token,
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) {
  //         console.log("Request canceled!");
  //       } else {
  //         // TODO: handle error
  //       }
  //     });

  //   return () => {
  //     source.cancel();
  //   };
  // }, [id]);

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Link to="/users/1">Fetch User 1</Link>
      <Link to="/users/2">Fetch User 2</Link>
      <Link to="/users/3">Fetch User 3</Link>
    </div>
  );
};

export default User;
