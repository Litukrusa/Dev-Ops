'use client'

import Link from 'next/link'
import { BookOpen, Network, Container, GitBranch, CheckCircle } from 'lucide-react'

const modules = [
  {
    id: 1,
    title: 'HTTP Протокол',
    description: 'Основы HTTP протокола, запросы, ответы и взаимодействие клиент-сервер',
    icon: Network,
    duration: '25 мин',
    slug: 'http',
  },
  {
    id: 2,
    title: 'TCP/IP',
    description: 'Архитектура сетей, протоколы транспортного и межсетевого уровней',
    icon: GitBranch,
    duration: '30 мин',
    slug: 'tcp-ip',
  },
  {
    id: 3,
    title: 'Docker под капотом',
    description: 'Контейнеризация, изоляция процессов, namespaces и cgroups',
    icon: Container,
    duration: '20 мин',
    slug: 'docker',
  },
  {
    id: 4,
    title: 'DevOps Roadmap',
    description: 'Пошаговый путь развития в DevOps: от основ до продвинутых технологий',
    icon: BookOpen,
    duration: '17 мин',
    slug: 'devops-roadmap',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-800/30 border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3">Вводный Курс по DevOps</h1>
          <p className="text-lg text-slate-300">
            Изучите основы DevOps: от сетевых протоколов до контейнеризации и CI/CD
          </p>
        </div>
      </div>

      {/* Modules List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Программа курса</h2>
          <p className="text-slate-400">
            4 модуля • Изучайте последовательно для лучшего понимания
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Link
                key={module.id}
                href={`/module/${module.slug}`}
                className="block card hover:border-primary-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-500">
                        Модуль {index + 1}
                      </span>
                      <span className="text-sm text-slate-600">•</span>
                      <span className="text-sm text-slate-500">{module.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-400">{module.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm text-primary-400 font-medium">Начать →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Course Info */}
        <div className="mt-12 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h3 className="text-lg font-semibold mb-4">Что вы изучите</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">Основы HTTP и веб-протоколов</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">TCP/IP и сетевая архитектура</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">Контейнеризация с Docker</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">DevOps практики и инструменты</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

