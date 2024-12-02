import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getStoredObjectIds } from "@/lib/utils";

const url =
  "https://imgs.search.brave.com/PPq4hTZounTgWRcgyQLvKpvchf0BdaJ3K0tZ6Dy7ofI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/L2MtMjAxOS0wMy0y/NnQxNzU4NDB6LTE2/NzUxMjc4MzAtcmMx/YmEwZWU3N2IwLXJ0/cm1hZHAtMy11c2Et/dHJ1bXAtY29uZ3Jl/c3MuanBnP2M9MXgx/JnE9aF8yNTYsd18y/NTYsY19maWxs";

interface Activity {
  user: string;
  action: string;
  target: string;
  amount: number;
  timeAgo: string;
}

interface RiskEvent {
  id: string;
  title: string;
  date: string;
  availableShares: number;
  totalShares: number;
  mintedPercentage: number;
  profileImage: string;
}

const recentActivities: Activity[] = [
  {
    user: "kraked devs",
    action: "bought insurance for",
    target: "tomato farm",
    amount: 5,
    timeAgo: "1hr ago",
  },
  {
    user: "kraked devs",
    action: "bought insurance for",
    target: "tomato farm",
    amount: 5,
    timeAgo: "2hr ago",
  },
  {
    user: "kraked devs",
    action: "bought insurance for",
    target: "tomato farm",
    amount: 5,
    timeAgo: "3hr ago",
  },
  {
    user: "kraked devs",
    action: "bought insurance for",
    target: "tomato farm",
    amount: 5,
    timeAgo: "4hr ago",
  },
];

export const ExplorePage = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<RiskEvent[]>([]);

  useEffect(() => {
    // Get stored objectIds and create events array
    const storedIds = getStoredObjectIds();
    console.log(storedIds);
    
    const generatedEvents = storedIds.map((id) => ({
      id: id,
      title: "Crypto Market Volatility Risk",
      date: "2024-12-15",
      availableShares: 750,
      totalShares: 1000,
      mintedPercentage: 75,
      profileImage: url,
    }));
    setEvents(generatedEvents);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* Top Section */}
          <div className="flex justify-between items-center">
            <div className="w-full max-w-md">
              <Input
                type="text"
                placeholder="Search risks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Link to="/createRisk">
              <Button className="bg-pink-600 hover:bg-pink-700">
                CREATE RISK
              </Button>
            </Link>
          </div>

          {/* Filter Tags */}
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              All Risks
            </Button>
            <Button variant="outline" size="sm">
              Popular
            </Button>
            <Button variant="outline" size="sm">
              Recent
            </Button>
            <Button variant="outline" size="sm">
              Ending Soon
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Risk Cards Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, displayCount).map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
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
                          Available Shares: {event.availableShares}/
                          {event.totalShares}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-600 h-2 rounded-full"
                            style={{ width: `${event.mintedPercentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">
                          {event.mintedPercentage}% minted
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {displayCount < events.length && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setDisplayCount((prev) => prev + 6)}
                  >
                    Show More
                  </Button>
                </div>
              )}
            </div>

            {/* Recent Activities Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Activities</h2>
                  <Button variant="ghost" size="sm">
                    See All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <p>
                        {activity.user} {activity.action} {activity.target} for{" "}
                        {activity.amount} shares · {activity.timeAgo}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
