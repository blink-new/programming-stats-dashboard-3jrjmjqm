import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp, 
  Code2, 
  Users, 
  Star, 
  GitBranch, 
  Activity,
  Search,
  Filter,
  Globe,
  Zap
} from 'lucide-react'

// Mock data for programming statistics
const languagePopularity = [
  { name: 'JavaScript', popularity: 68.5, growth: 2.3, users: '17.4M' },
  { name: 'Python', popularity: 48.2, growth: 8.7, users: '15.7M' },
  { name: 'TypeScript', popularity: 38.9, growth: 12.4, users: '12.1M' },
  { name: 'Java', popularity: 35.1, growth: -1.2, users: '9.6M' },
  { name: 'C#', popularity: 27.9, growth: 1.8, users: '6.5M' },
  { name: 'Go', popularity: 13.2, growth: 15.6, users: '2.8M' },
  { name: 'Rust', popularity: 9.3, growth: 22.1, users: '2.2M' },
  { name: 'Swift', popularity: 8.1, growth: 3.2, users: '2.1M' }
]

const frameworkTrends = [
  { month: 'Jan', React: 74, Vue: 41, Angular: 22, Svelte: 8 },
  { month: 'Feb', React: 76, Vue: 43, Angular: 21, Svelte: 9 },
  { month: 'Mar', React: 78, Vue: 45, Angular: 20, Svelte: 11 },
  { month: 'Apr', React: 79, Vue: 47, Angular: 19, Svelte: 13 },
  { month: 'May', React: 81, Vue: 49, Angular: 18, Svelte: 15 },
  { month: 'Jun', React: 82, Vue: 51, Angular: 17, Svelte: 17 }
]

const salaryData = [
  { language: 'Rust', salary: 87000 },
  { language: 'Go', salary: 85000 },
  { language: 'TypeScript', salary: 78000 },
  { language: 'Swift', salary: 76000 },
  { language: 'Python', salary: 74000 },
  { language: 'JavaScript', salary: 70000 },
  { language: 'Java', salary: 69000 },
  { language: 'C#', salary: 68000 }
]

const contributionData = [
  { name: 'Public Repos', value: 45 },
  { name: 'Private Repos', value: 30 },
  { name: 'Forks', value: 15 },
  { name: 'Stars Given', value: 10 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const statsCards = [
  {
    title: 'Total Developers',
    value: '31.1M',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    description: 'Active developers worldwide'
  },
  {
    title: 'New Repositories',
    value: '4.7M',
    change: '+12.4%', 
    trend: 'up',
    icon: GitBranch,
    description: 'Created this month'
  },
  {
    title: 'Code Commits',
    value: '287M',
    change: '+5.1%',
    trend: 'up', 
    icon: Activity,
    description: 'Commits this week'
  },
  {
    title: 'Stars Given',
    value: '1.2B',
    change: '+3.8%',
    trend: 'up',
    icon: Star,
    description: 'Total GitHub stars'
  }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  useEffect(() => {
    // Animate progress bars
    const timeout = setTimeout(() => {
      const values: Record<string, number> = {}
      languagePopularity.forEach(lang => {
        values[lang.name] = lang.popularity
      })
      setAnimatedValues(values)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  const filteredLanguages = languagePopularity.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Programming Stats
                </h1>
                <p className="text-sm text-gray-500">Real-time coding insights</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-gray-500">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="languages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="languages" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Languages
            </TabsTrigger>
            <TabsTrigger value="frameworks" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Frameworks
            </TabsTrigger>
            <TabsTrigger value="salaries" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Salaries
            </TabsTrigger>
            <TabsTrigger value="contributions" className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="languages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Language Popularity List */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Language Popularity
                  </CardTitle>
                  <CardDescription>
                    Based on GitHub activity and Stack Overflow surveys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                          <span className="font-medium">{lang.name}</span>
                          <Badge 
                            variant={lang.growth > 0 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {lang.growth > 0 ? '+' : ''}{lang.growth}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{lang.popularity}%</div>
                          <div className="text-xs text-gray-500">{lang.users}</div>
                        </div>
                      </div>
                      <Progress 
                        value={animatedValues[lang.name] || 0} 
                        className="h-2"
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Language Trends Chart */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growth Trends
                  </CardTitle>
                  <CardDescription>
                    Year-over-year growth percentage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={languagePopularity.slice(0, 6)}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="growth" 
                        fill="url(#colorGrowth)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="frameworks" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Framework Trends
                </CardTitle>
                <CardDescription>
                  Monthly adoption trends for popular frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={frameworkTrends}>
                    <defs>
                      <linearGradient id="colorReact" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#61DAFB" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#61DAFB" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorVue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4FC08D" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4FC08D" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorAngular" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#DD0031" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#DD0031" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorSvelte" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF3E00" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF3E00" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="React" stackId="1" stroke="#61DAFB" fill="url(#colorReact)" />
                    <Area type="monotone" dataKey="Vue" stackId="1" stroke="#4FC08D" fill="url(#colorVue)" />
                    <Area type="monotone" dataKey="Angular" stackId="1" stroke="#DD0031" fill="url(#colorAngular)" />
                    <Area type="monotone" dataKey="Svelte" stackId="1" stroke="#FF3E00" fill="url(#colorSvelte)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salaries" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Average Developer Salaries</CardTitle>
                <CardDescription>
                  Annual salary by programming language (USD)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={salaryData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" />
                    <YAxis dataKey="language" type="category" width={80} />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']}
                    />
                    <Bar dataKey="salary" fill="url(#colorSalary)" radius={[0, 4, 4, 0]} />
                    <defs>
                      <linearGradient id="colorSalary" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34D399" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Repository Distribution</CardTitle>
                  <CardDescription>
                    Types of repositories created this year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={contributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Activity Insights</CardTitle>
                  <CardDescription>
                    Developer engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Daily Active Users</span>
                    <span className="text-2xl font-bold">2.4M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pull Requests</span>
                    <span className="text-2xl font-bold">847K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Issues Opened</span>
                    <span className="text-2xl font-bold">234K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Code Reviews</span>
                    <span className="text-2xl font-bold">1.2M</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App