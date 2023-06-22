export default function SelectProductProperties({
  productProperties,
  setProductProperties,
  propertiesToFill,
}) {
  
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  return (
    <>
      {propertiesToFill?.length > 0 && <label>Properties</label>}
      {propertiesToFill?.length > 0 &&
        propertiesToFill.map((p, index) => (
          <div className="" key={index}>
            <label className="capitalize text-sm text-gray-600">{p.name}</label>
            <select
              value={productProperties[p.name]}
              onChange={(event) => setProductProp(p.name, event.target.value)}
            >
              {p.values.map((v, index) => (
                <option key={index}>{v}</option>
              ))}
            </select>
          </div>
        ))}
    </>
  );
}
