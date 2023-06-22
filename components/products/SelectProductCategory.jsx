export default function SelectProductCategory({
  setCategory,
  category,
  categories,
}) {
  return (
    <>
    <label>Category</label>
    <select
      value={category}
      onChange={(event) => {
        setCategory(event.target.value);
      }}
    >
      <option value="">No category</option>
      {categories.length > 0 &&
        categories.map((category, index) => (
          <option key={index} value={category._id}>
            {category.title}
          </option>
        ))}
    </select>
    </>
  );
}
