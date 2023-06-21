"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [resetData, setResetData] = useState(false);

  async function saveCategory(event) {
    event.preventDefault();
    const data = {
      title,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setTitle("");
    setProperties([]);
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
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  async function deleteCategory(category) {
    const alerOptions = {
      title: "Delete category",
      text: `Are you sure you want to delete ${category.title}?`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete!",
      confirmButtonColor: "#d55",
      reverseButtons: true,
    };

    Swal.fire(alerOptions).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete("api/categories?id=" + category._id);
        setResetData((s) => !s);
      }
    });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(index) {
    setProperties((prev) => {
      const newProperties = [...prev];
      newProperties.splice(index, 1);
      return newProperties;
    });
  }

  return (
    <>
      <h1>Categories</h1>
      <label>{editedCategory ? "Edit Category" : "Create New Category"}</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <select
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
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add New Property
          </button>
          {properties.length > 0 &&
            properties.map((prop, index) => (
              <div className="flex gap-1 mb-2" key={index}>
                <input
                  onChange={(event) =>
                    handlePropertyNameChange(index, prop, event.target.value)
                  }
                  type="text"
                  value={prop.name}
                  placeholder="property name (example: color)"
                  className="mb-0"
                />
                <input
                  onChange={(event) =>
                    handlePropertyValuesChange(index, prop, event.target.value)
                  }
                  type="text"
                  value={prop.values}
                  placeholder="values, comma seperated"
                  className="mb-0"
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btn-red text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          <button type="submit" className="btn-primary py-1">
            {editedCategory ? "Update" : "Save"}
          </button>
          {editedCategory && (
            <button
              type="button"
              className="btn-default"
              onClick={() => {
                setEditedCategory(null);
                setTitle("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {!editedCategory && (
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
                    <div className="flex flex-wrap justify-end gap-1">
                      <button
                        onClick={() => editCategory(category)}
                        className="btn-action mr-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="btn-action"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}
