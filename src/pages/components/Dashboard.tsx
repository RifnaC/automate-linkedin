import ApiCard from './ApiCard';

const Dashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">LinkedIn API Test UI</h1>
      <ApiCard title="Login to LinkedIn" onExecute={() => loginToLinkedIn({ username: 'your_email', password: 'your_password' })} />
      <ApiCard title="Fetch Own Profile" onExecute={fetchProfile} />
      {/* Add more ApiCard components for each API */}
    </div>
  );
};

export default Dashboard;
