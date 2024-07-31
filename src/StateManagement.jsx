import { useState, useEffect } from "react";

const StateManagement = () => {
  const fallbackBooks = {
    response: [
      {
        id: 1,
        title: "Clean Code",
        author: {
          id: 1,
          name: "Uncle Bob",
        },
      },
      {
        id: 2,
        title: "Clean Architecture",
        author: {
          id: 1,
          name: "Uncle Bob",
        },
      },
    ],
  };

  const fallbackUsers = {
    response: [
      {
        id: 1,
        email: "chano@amalgama.co",
        nickname: "Chano",
        favorite_books: [
          {
            id: 1,
            title: "Clean Code",
            author: {
              id: 1,
              name: "Uncle Bob",
            },
          },
        ],
      },
      {
        id: 2,
        email: "sebastian@amalgama.co",
        nickname: "Biche",
        favorite_books: [
          {
            id: 1,
            title: "Clean Code",
            author: {
              id: 1,
              name: "Uncle Bob",
            },
          },
          {
            id: 2,
            title: "Clean Architecture",
            author: {
              id: 1,
              name: "Uncle Bob",
            },
          },
        ],
      },
    ],
  };

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchPromise = (uri, fallback) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => resolve(fallback.response), 1500);
      } catch {
        reject(`Error en búsqueda: ${uri}`);
      }
    });
  };

  useEffect(() => {
    if (!books.length && !users.length) {
      const getData = async () => {
        await Promise.all([
          fetchPromise("https://api.org/books", fallbackBooks),
          fetchPromise("https://api.org/users", fallbackUsers),
        ])
          .then(([booksResponse, usersResponse]) => {
            setBooks(booksResponse);
            setUsers(usersResponse);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }
  }, []);

  return <div>
    {
        !books.length && !users.length ? <div>Cargando...</div> : <div>Contenido cargado!</div>
    }
    </div>;
};

export default StateManagement;
