// src/pages/Explore.tsx
import { Link } from "react-router-dom";
import { Header } from "../components/Header.tsx";
import { useState } from "react";

const url = 'https://imgs.search.brave.com/PPq4hTZounTgWRcgyQLvKpvchf0BdaJ3K0tZ6Dy7ofI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/L2MtMjAxOS0wMy0y/NnQxNzU4NDB6LTE2/NzUxMjc4MzAtcmMx/YmEwZWU3N2IwLXJ0/cm1hZHAtMy11c2Et/dHJ1bXAtY29uZ3Jl/c3MuanBnP2M9MXgx/JnE9aF8yNTYsd18y/NTYsY19maWxs'

interface RiskEvent {
  id: string;
  title: string;
  date: string;
  availableShares: number;
  totalShares: number;
  mintedPercentage: number;
  profileImage: string;
}

const dummyEvents: RiskEvent[] = [
  {
    id: "1",
    title: "Crypto Market Volatility Risk",
    date: "2024-12-15",
    availableShares: 750,
    totalShares: 1000,
    mintedPercentage: 25,
    profileImage: `${url}`,
  },
  {
    id: "2",
    title: "DeFi Protocol Insurance",
    date: "2024-12-20",
    availableShares: 500,
    totalShares: 1000,
    mintedPercentage: 50,
    profileImage: `${url}`,
  },
  // Add more dummy events here
];

export const ExplorePage = () => {
  const [displayCount, setDisplayCount] = useState(6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Risks</h1>
          <Link
            to="/createRisk"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Risk
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyEvents.slice(0, displayCount).map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={event.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Available Shares: {event.availableShares}/{event.totalShares}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${event.mintedPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  {event.mintedPercentage}% minted
                </p>
              </div>
            </Link>
          ))}
        </div>

        {displayCount < dummyEvents.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setDisplayCount((prev) => prev + 6)}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
