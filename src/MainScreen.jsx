import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

//lógica del token y punto 3.2 realizado después del límite de 2h
const MainScreen = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!books.length && !users.length) {
      const getData = async () => {
        const booksResponse = await fetch(
          "https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/books",
          {
            method: "GET",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        booksResponse.json().then((j) => {
          setBooks(j);
        });

        const usersResponse = await fetch(
            "https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/books",
            {
              method: "GET",
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          usersResponse.json().then((j) => {
            setUsers(j);
          });
      };

      getData();
    }
  });

  return <div>MainScreen</div>;
};

MainScreen.propTypes = {
  token: PropTypes.string.isRequired,
};

export default MainScreen;
