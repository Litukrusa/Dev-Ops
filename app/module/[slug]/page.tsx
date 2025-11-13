'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Check, X, RotateCcw, ExternalLink, Clock, ArrowRight, Play } from 'lucide-react'
import { modules } from '@/data/modules'

interface PageProps {
  params: {
    slug: string
  }
}

// Порядок модулей в курсе
const moduleOrder = ['http', 'tcp-ip', 'docker', 'devops-roadmap']

export default function ModulePage({ params }: PageProps) {
  const module = modules[params.slug]
  const currentModuleIndex = moduleOrder.indexOf(params.slug)
  const nextModuleSlug = currentModuleIndex >= 0 && currentModuleIndex < moduleOrder.length - 1 
    ? moduleOrder[currentModuleIndex + 1] 
    : null
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz'>('theory')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Модуль не найден</h1>
          <Link href="/" className="btn-primary inline-block">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    setShowExplanation(true)
    const isCorrect = selectedAnswer === module.quiz[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < module.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Переход к экрану результатов
      setCurrentQuestion(module.quiz.length)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizStarted(true)
  }

  const isLastQuestion = currentQuestion === module.quiz.length - 1
  const allQuestionsAnswered = answeredQuestions.filter(Boolean).length === module.quiz.length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-800/30 border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад к курсам
              </Link>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            </div>
            <a
              href={module.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Play className="w-4 h-4" />
              Смотреть видео
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6 border-b border-slate-700/50">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-colors border-b-2 ${
              activeTab === 'theory'
                ? 'border-primary-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Теория
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz')
              if (!quizStarted) setQuizStarted(true)
            }}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-colors border-b-2 ${
              activeTab === 'quiz'
                ? 'border-primary-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Check className="w-4 h-4" />
            Тест
          </button>
        </div>

        {/* Theory Content */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {module.theory.map((section, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>{section.time}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-300 leading-relaxed space-y-4">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quiz Content */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            {!quizStarted ? (
              <div className="card text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Готовы проверить свои знания?
                </h2>
                <p className="text-slate-400 mb-6">
                  Тест содержит {module.quiz.length} вопросов по материалу модуля
                </p>
                <button onClick={() => setQuizStarted(true)} className="btn-primary">
                  Начать тест
                </button>
              </div>
            ) : currentQuestion < module.quiz.length ? (
              <div className="card">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-slate-400">
                      Вопрос {currentQuestion + 1} из {module.quiz.length}
                    </span>
                    <span className="text-sm font-semibold text-primary-400">
                      Правильных: {score}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestion + 1) / module.quiz.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-6">
                  {module.quiz[currentQuestion].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {module.quiz[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrect = index === module.quiz[currentQuestion].correctAnswer
                    const showResult = showExplanation

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showResult
                            ? isCorrect
                              ? 'border-green-500 bg-green-500/20'
                              : isSelected
                              ? 'border-red-500 bg-red-500/20'
                              : 'border-slate-700 bg-slate-800/50'
                            : isSelected
                            ? 'border-primary-500 bg-primary-500/20'
                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && isCorrect && (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {showExplanation && (
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2 text-primary-400">Объяснение:</h4>
                    <p className="text-slate-300">
                      {module.quiz[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  {!showExplanation ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Проверить ответ
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary flex-1"
                    >
                      {isLastQuestion ? 'Посмотреть результаты' : 'Следующий вопрос'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center">
                {/* Уведомление о результате */}
                {score >= module.quiz.length * 0.8 ? (
                  <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg">
                    <p className="text-green-400 font-semibold text-lg">
                      ✅ Поздравляем! Тест успешно пройден!
                    </p>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg">
                    <p className="text-red-400 font-semibold text-lg">
                      ❌ Тест не пройден. Необходимо набрать минимум 80% для продолжения.
                    </p>
                  </div>
                )}

                <h2 className="text-3xl font-bold mb-4">Тест завершён!</h2>
                <div className="text-6xl font-bold text-primary-400 mb-4">
                  {score} / {module.quiz.length}
                </div>
                <p className="text-xl text-slate-300 mb-2">
                  {score === module.quiz.length
                    ? 'Отличный результат! Вы ответили правильно на все вопросы! 🎉'
                    : score >= module.quiz.length * 0.8
                    ? 'Хороший результат! Вы отлично усвоили материал! 👏'
                    : score >= module.quiz.length * 0.6
                    ? 'Неплохо! Рекомендуем повторить материал. 📚'
                    : 'Стоит ещё раз изучить теорию и повторить тест. 💪'}
                </p>
                <p className="text-slate-400 mb-8">
                  Правильных ответов: {Math.round((score / module.quiz.length) * 100)}%
                </p>
                
                {score >= module.quiz.length * 0.8 ? (
                  // Если результат 80% или больше - показываем кнопку перехода к следующему модулю
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button onClick={handleRestartQuiz} className="btn-secondary inline-flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Пройти ещё раз
                    </button>
                    {nextModuleSlug ? (
                      <Link 
                        href={`/module/${nextModuleSlug}`} 
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        Перейти к следующему модулю
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link href="/" className="btn-primary inline-flex items-center gap-2">
                        Завершить курс
                        <Check className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                ) : (
                  // Если результат меньше 80% - только повторить тест или вернуться назад
                  <div className="space-y-4">
                    <div className="flex gap-4 justify-center flex-wrap">
                      <button 
                        onClick={() => setActiveTab('theory')} 
                        className="btn-secondary inline-flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        Повторить теорию
                      </button>
                      <button onClick={handleRestartQuiz} className="btn-primary inline-flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Пройти тест заново
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

