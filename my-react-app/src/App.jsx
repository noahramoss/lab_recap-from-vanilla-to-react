import { useState, useEffect } from "react";
import "./App.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();
      setUsers((prevUsers) => {
        return [...prevUsers, ...data.users];
      });
      setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   return (
  //     users.map((user) => {
  //     <div key={user.id} className="user-card">
  //       <img src={user.image} alt="" />
  //       <h3>{user.firstName} {user.lastName}</h3>
  //     </div>;
  //   })
  //   <button
  //   onClick={fetchUsers}
  //   >

  //   </button>
  // );

  return (
    <div>
      <h1>User Profiles</h1>
      <div id="user-list-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.image} alt={user.firstName} />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
        ))}
      </div>
      {loading ? (
        <p>Loading users</p>
      ) : (
        <button id="load-more-btn" onClick={fetchUsers}>
          Load More
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <UserList></UserList>
    </>
  );
}

export default App;
