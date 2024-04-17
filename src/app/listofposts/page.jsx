"use client";
import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

const getPostsData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

const getUsersData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

const getTodosData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  return res.json();
};

const ListOfPosts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, usersData, todosData] = await Promise.all([
          getPostsData(),
          getUsersData(),
          getTodosData()
        ]);
        setPosts(postsData);
        setUsers(usersData);
        setTodos(todosData);
        setLoading(false); // Data fetching is complete
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false); // Data fetching failed
      }
    };

    fetchData();
  }, []); // Run once on component mount

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BeatLoader color="#36D7B7" loading={loading} size={40} />
      </div>
    );
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Author: {users.find(user => user.id === post.userId)?.name}</p>
        </div>
      ))}

      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}

      <h1>Todos</h1>
      {todos.map(todo => (
        <div key={todo.id}>
          <h2>User ID: {todo.userId}</h2>
          <p>Title: {todo.title}</p>
          <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default ListOfPosts;
