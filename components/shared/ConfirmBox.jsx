export default function ConfirmBox({titleText, confirmHandler, declineHandler}) {
  return (
    <>
      <h1 className="text-center">
        {titleText}
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={confirmHandler}>
          Yes
        </button>
        <button className="btn-default" onClick={declineHandler}>
          No
        </button>
      </div>
    </>
  );
}
