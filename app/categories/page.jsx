"use client";

import CategoryForm from "@/components/categories/CategoryForm";
import Table from "@/components/shared/Table";
import { GlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";

export default function Categories() {
  const {
    categories,
    editedCategory,
    setResetData,
    setEditedCategory,
    setTitle,
    setParentCategory,
    setProperties,
  } = useContext(GlobalContext);

  async function editCategory(category) {
    setEditedCategory(category);
    setTitle(category.title);
    setParentCategory(category.parent?._id || "");
    setProperties(
      category?.properties?.map(({ name, values }) => ({
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

  return (
    <>
      <h1>Categories</h1>
      <label>{editedCategory ? "Edit Category" : "Create New Category"}</label>
      <CategoryForm></CategoryForm>
      {!editedCategory && (
        <Table
          values={categories}
          columns={["Category Title", "Parent Category"]}
          rows={["title", "parent.title"]}
          editHandler={editCategory}
          deleteHandler={deleteCategory}
        ></Table>
      )}
    </>
  );
}
