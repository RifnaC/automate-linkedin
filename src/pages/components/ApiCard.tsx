import { useState } from 'react';

const ApiCard = ({ title, onExecute }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await onExecute();
      setResponse(res.data);
    } catch (e) {
      setResponse(e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow mb-4 bg-white">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Running...' : 'Execute'}
      </button>
      {response && (
        <pre className="mt-2 p-2 bg-gray-100 text-sm overflow-auto max-h-60">{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
};

export default ApiCard;
