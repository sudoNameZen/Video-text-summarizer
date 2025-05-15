import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      {/* Full-width background for the pricing heading */}
      <div className="bg-indigo-600 py-6 w-full">
        <h1 className="text-4xl font-bold text-white text-center">Pricing</h1>
      </div>

      {/* White background section for the "Choose a plan..." text */}
      <div className="bg-white py-4 w-full">
        <p className="text-xl mt-4 text-black text-center">Choose a plan that works best for you!</p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-900">Basic Plan</h3>
          <p className="text-gray-600 mt-2">For individuals or small teams.</p>
          <p className="text-xl font-bold mt-4 text-gray-900">$10/month</p>
          <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Choose Plan
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-900">Standard Plan</h3>
          <p className="text-gray-600 mt-2">For growing businesses.</p>
          <p className="text-xl font-bold mt-4 text-gray-900">$25/month</p>
          <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Choose Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-900">Premium Plan</h3>
          <p className="text-gray-600 mt-2">For large organizations.</p>
          <p className="text-xl font-bold mt-4 text-gray-900">$50/month</p>
          <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
