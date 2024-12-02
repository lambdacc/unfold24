import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getStoredObjectIds } from "@/lib/utils";
import { fetchSuiObject } from "@/apiService";

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
  description: string;
  createdAt: Date; // Added createdAt field
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
  {
    user: "jane farmer",
    action: "bought insurance for",
    target: "wheat field",
    amount: 10,
    timeAgo: "5hr ago",
  },
  {
    user: "tom agritech",
    action: "bought insurance for",
    target: "cattle farm",
    amount: 20,
    timeAgo: "6hr ago",
  },
  {
    user: "green grower",
    action: "bought insurance for",
    target: "corn crops",
    amount: 8,
    timeAgo: "7hr ago",
  },
  {
    user: "mary cooper",
    action: "bought insurance for",
    target: "apple orchard",
    amount: 15,
    timeAgo: "8hr ago",
  },
  {
    user: "happy harvesters",
    action: "bought insurance for",
    target: "rice fields",
    amount: 25,
    timeAgo: "9hr ago",
  },
  {
    user: "blue barn",
    action: "bought insurance for",
    target: "dairy cows",
    amount: 12,
    timeAgo: "10hr ago",
  },
  {
    user: "agri-tech pros",
    action: "bought insurance for",
    target: "sunflower farm",
    amount: 7,
    timeAgo: "11hr ago",
  },
  {
    user: "rural protectors",
    action: "bought insurance for",
    target: "potato crops",
    amount: 9,
    timeAgo: "12hr ago",
  },
];

export const ExplorePage = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<RiskEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const storedIds = getStoredObjectIds();

      const eventPromises = storedIds.map(async (id) => {
        const suiObject = await fetchSuiObject(id);
        const availableShares = parseInt(suiObject.rem_shares);
        const totalShares = parseInt(suiObject.total_shares);

        return {
          id,
          title: suiObject.name,
          description: suiObject.description,
          date: new Date().toISOString().split("T")[0],
          availableShares,
          totalShares,
          mintedPercentage:
            totalShares > 0
              ? ((totalShares - availableShares) / totalShares) * 100
              : 0,
          // profileImage: `https://ipfs.io/ipfs/${suiObject.ipfs_hash}`,
          profileImage: `https://blogs.microsoft.com/wp-content/uploads/prod/sites/5/2024/01/African-Landscape-at-Sunset-HERO-Image.jpg`,
          createdAt: new Date(suiObject.created_at || Date.now()), // Parse creation date from suiObject or use current time as fallback
        };
      });

      try {
        const generatedEvents = await Promise.all(eventPromises);
        // Sort events by createdAt date in descending order (newest first)
        const sortedEvents = generatedEvents.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                CREATE RISK EVENT
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
                {filteredEvents.slice(0, displayCount).map((event) => (
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

              {displayCount < filteredEvents.length && (
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

                <div className="overflow-hidden h-40 relative">
                  <div className="animate-marquee space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <p>
                          {activity.user} {activity.action} {activity.target}{" "}
                          for{" "}
                          <span className="font-semibold">
                            {activity.amount}{" "}
                          </span>
                          shares ·{" "}
                          <p className="font-semibold"> {activity.timeAgo}</p>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <style jsx>{`
                  .animate-marquee {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    animation: marquee 15s linear infinite;
                  }

                  @keyframes marquee {
                    0% {
                      transform: translateY(10%);
                    }
                    100% {
                      transform: translateY(-100%);
                    }
                  }
                `}</style>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
