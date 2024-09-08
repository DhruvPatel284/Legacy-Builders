import React from 'react';

const Dashboard = () => {
  const dashboardData = [
    { label: "Users", value: "1,230", change: "▼ 5%", icon: "fas fa-users" },
    { label: "Posts", value: "320", change: "▼ 3%", icon: "fas fa-chart-pie" },
    { label: "Events", value: "12", change: "▼ 1%", icon: "fas fa-chart-line" },
  ];

  return (
    <div>
        <section className="mt-8">
            {/* Dashboard Header */}
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            
            {/* Dashboard Cards */}
            <div className="grid grid-cols-3 gap-6">
                {dashboardData.map((item, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-3xl font-bold">{item.value}</p>
                        <p className="text-red-500 text-sm">{item.change}</p>
                    </div>
                    <i className={`${item.icon} text-purple-600 text-3xl`}></i>
                    </div>
                </div>
                ))}
            </div>
        </section>
    </div>
    
  );
};

export default Dashboard;
