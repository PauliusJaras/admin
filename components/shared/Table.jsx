import Button from "./Button";

export default function Table({
  values,
  href,
  columns,
  rows,
  editHandler,
  deleteHandler,
})

{

  const getNestedValue = (obj, field) => {
    const fieldParts = field.split('.');
    let value = obj;
    for (let part of fieldParts) {
      value = value[part] === null ? '' : value[part];
    }
    return value;
  };

  return (
    <>
      <table className="basic mt-2">
        <thead>
          <tr>
            {columns?.map((colName, index) => (
              <td key={index}>{colName}</td>
            ))}
            <td></td>
          </tr>
        </thead>
        <tbody>
          {values?.map((value, index) => (
            <tr key={index}>
              {rows?.map((row, index) => (
                <td key={index}>{row.length > 1 ? getNestedValue(value, row) : value[row]}</td>
              ))}
              <td className="flex flex-wrap justify-end">
                <Button
                  text={"Edit"}
                  iconName={"edit"}
                  href={href ? href + "/edit/" + value._id : "#"}
                  handler={editHandler ? () => editHandler(value) : null}
                ></Button>
                <Button
                  text={"Delete"}
                  iconName={"delete"}
                  href={href ? href + "/delete/" + value._id : "#"}
                  handler={deleteHandler ? () => deleteHandler(value) : null}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
