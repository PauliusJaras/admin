import Button from "./Button";

export default function Table({ values, href, columns, rows }) {
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
              {rows?.map((row, index) => (<td key={index}>{value[row]}</td>))}
              <td className="flex flex-wrap justify-end">
                <Button
                  text={"Edit"}
                  iconName={"edit"}
                  href={href + "/edit/" + value._id}
                ></Button>
                <Button
                  text={"Delete"}
                  iconName={"delete"}
                  href={href + "/delete/" + value._id}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
