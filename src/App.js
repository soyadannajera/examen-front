import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Archivo CSS externo para estilos personalizados

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userIdFilter, setUserIdFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [bodyFilter, setBodyFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
      setPosts(response.data);
      setFilteredPosts(response.data);
    });
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (userIdFilter) {
      filtered = filtered.filter(post => post.userId.toString() === userIdFilter);
    }

    if (titleFilter) {
      filtered = filtered.filter(post => post.title.includes(titleFilter));
    }

    if (bodyFilter) {
      filtered = filtered.filter(post => post.body.includes(bodyFilter));
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else {
      filtered.sort((a, b) => (a.title < b.title ? 1 : -1));
    }

    setFilteredPosts(filtered);
  }, [userIdFilter, titleFilter, bodyFilter, sortOrder, posts]);

  const handleSortChange = e => {
    setSortOrder(e.target.value);
  };

  const getCardBorderStyle = userId => {
    if (userId % 2 === 0) {
      return "border-info";
    } else {
      return "border-warning";
    }
  };

  return (
    <div className="container-fluid p-0" id="main-container">
      <div className="container mt-5">
        <h1 className="text-center mb-5">Blog Posts</h1>
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Filter by User ID"
              value={userIdFilter}
              onChange={e => setUserIdFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Filter by Title"
              value={titleFilter}
              onChange={e => setTitleFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Filter by Body"
              value={bodyFilter}
              onChange={e => setBodyFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </div>
        </div>
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className={`card mb-3 ${getCardBorderStyle(post.userId)}`}
          >
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <p className="card-text">
                <small className="text-muted">User ID: {post.userId}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
