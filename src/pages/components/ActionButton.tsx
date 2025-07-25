function ActionButton({ label }: { label: string }) {
  const handleClick = () => {
    console.log(`${label} clicked`);
    // Add axios request logic here for real testing
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
}
