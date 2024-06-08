function NoItems({ icon, text }) {
    return (
        <div className="flex items-center justify-center gap-3 py-6">
            <span>{icon}</span>
            <p className="font-bold">{text}</p>
        </div>
    );
}

export default NoItems;
