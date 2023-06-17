"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [resetData, setResetData] = useState(false);

  async function saveCategory(event) {
    event.preventDefault();
    const data = { title, parentCategory };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setTitle("");
    setResetData((s) => !s);
  }

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, [resetData]);

  async function editCategory(category) {
    setEditedCategory(category);
    setTitle(category.title);
    setParentCategory(category.parent?._id || "");
  }

  async function deleteCategory(category){
    Swal.fire({
        title: 'Delete category',
        text: `Are you sure you want to delete ${category.title}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      }).then(async result => {
        if(result.isConfirmed){
           await axios.delete("api/categories?id="+category._id)
           setResetData((s) => !s);
        }
      })
    }

  return (
    <>
      <h1>Categories</h1>
      <label>{editedCategory ? "Edit Category" : "Create New Category"}</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(event) => setParentCategory(event.target.value)}
        >
          <option value="">No parent category</option>
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
                <td>
                  <div className="flex gap-1">
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(category)} className="btn-primary">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}