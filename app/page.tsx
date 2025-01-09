import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 导航栏 */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AI Chat
            </span>
          </div>
          <div>
            <Link 
              href="/chat" 
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              开始对话
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
            与AI对话，探索无限可能
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            基于最先进的AI技术，为您提供智能、自然的对话体验
          </p>
          <div className="mt-10">
            <Link
              href="/chat"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              开始对话
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 特性展示 */}
        <div className="mt-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '智能对话',
              description: '自然流畅的对话体验，理解上下文，准确回应您的需求',
              icon: '💡'
            },
            {
              title: '多场景应用',
              description: '从学习辅导到技术咨询，满足您在不同领域的对话需求',
              icon: '🎯'
            },
            {
              title: '安全可靠',
              description: '严格的数据保护机制，确保您的对话安全且私密',
              icon: '🔒'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
