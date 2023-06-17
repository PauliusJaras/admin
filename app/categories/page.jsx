"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [resetData, setResetData] = useState(false);

  async function saveCategory(event) {
    event.preventDefault();
    await axios.post("/api/categories", { title, parentCategory });
    setTitle("");
    setResetData((s) => !s);
  }

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, [resetData]);

  return (
    <>
      <h1>Categories</h1>
      <label>New Category Title</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <select className="mb-0" value={parentCategory} onChange={(event) => setParentCategory(event.target.value)}>
          <option value=''>No parent category</option>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <option value={category._id} key={index}>
                {category.title}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Category Title</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <td>{category.title}</td>
                <td>{category?.parent?.title}</td>
                <td>edit</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
