function RowView({ title, name, brief, maxName, maxBrief, className }) {
  const isStringBrief = typeof brief === 'string';

  return (
    <div className={`py-5 text-blue-color-primary ${className} flex-wrap`}>
      {title && (
        <h3>
          {maxName
            ? `${title?.split(" ").splice(0, maxName).join(" ")}...`
            : title}{" "}
        </h3>
      )}
      {name && <h4>{name} : </h4>}
      {brief && (
        isStringBrief ? (
          <p className="px-2 text-gray-color-primary">
            {
              maxBrief
                ? `${brief?.split(" ").splice(0, maxBrief).join(" ")}...`
                : brief
            }
          </p>
        ) : (
          <div className="px-2 text-gray-color-primary">
            {brief}
          </div>
        )
      )}
    </div>
  );
}

export default RowView;
