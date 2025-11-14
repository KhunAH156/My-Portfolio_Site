import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Mail, FolderKanban, TrendingUp, Clock } from "lucide-react";
import { analyticsAPI, contactAPI } from "../utils/api";

interface Analytics {
  totalContacts: number;
  newContacts: number;
  totalProjects: number;
  contactsByMonth: { month: string; count: number }[];
  recentContacts: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
    status: string;
  }[];
}

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await analyticsAPI.get();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <p className="text-white">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <p className="text-white">Failed to load analytics</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white mb-2">Portfolio Dashboard</h1>
          <p className="text-white/70">Track your portfolio performance and manage contacts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 mb-1">Total Contacts</p>
                <p className="text-white">{analytics.totalContacts}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
            </div>
            {analytics.newContacts > 0 && (
              <p className="text-cyan-400 text-sm mt-2">
                {analytics.newContacts} new
              </p>
            )}
          </Card>

          <Card className="bg-white/5 border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 mb-1">Total Projects</p>
                <p className="text-white">{analytics.totalProjects}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FolderKanban className="text-white" size={24} />
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 mb-1">Engagement</p>
                <p className="text-white">Active</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-600">
              Contact Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-white mb-6">Contact Submissions (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.contactsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-white mb-6">Recent Contact Messages</h3>
              {analytics.recentContacts.length === 0 ? (
                <p className="text-white/60 text-center py-8">No contact messages yet</p>
              ) : (
                <div className="space-y-4">
                  {analytics.recentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white">{contact.name}</p>
                          <p className="text-white/60 text-sm">{contact.email}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Clock size={14} />
                          {new Date(contact.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-white/80 mb-2">{contact.subject}</p>
                      <p className="text-white/60 text-sm">{contact.message}</p>
                      {contact.status === 'new' && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-600 text-white rounded">
                          New
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <a href="/">Back to Portfolio</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
