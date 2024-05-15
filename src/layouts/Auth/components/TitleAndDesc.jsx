function TitleAndDesc({ title, description, className }) {
  return (
    <div className={`${className} `}>
      <h1 className="text-center text-blue-color-primary">{title}</h1>
      {description && (
        <p className="text-center text-gray-color-primary">{description}</p>
      )}
    </div>
  );
}

export default TitleAndDesc;
