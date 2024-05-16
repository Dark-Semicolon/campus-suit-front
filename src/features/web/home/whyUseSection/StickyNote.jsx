function StickyNote({ title, icon, description }) {
  return (
    <div className="relative flex items-center justify-center">
      <img
        src="/images/home/whyUseSection/stickyNote.svg"
        alt="Sticky Note image design"
        className="w-full transition-transform hover:-rotate-3"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute flex flex-col items-center justify-center pt-5">
        <img
          src={icon}
          alt={`Sticky Note for ${title}`}
          loading="lazy"
          decoding="async"
        />
        <h3 className="py-3 text-blue-color-primary">{title}</h3>
        <p className="w-48 text-center text-wrap text-gray-color-primary">
          {description}
        </p>
      </div>
    </div>
  );
}

export default StickyNote;
