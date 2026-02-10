'use client'

import { Package, CheckCircle, Clock } from 'lucide-react'

interface AdminStatsProps {
  pendingSubmissions: number
  totalSkills: number
  approvedSkills: number
}

export function AdminStats({ pendingSubmissions, totalSkills, approvedSkills }: AdminStatsProps) {
  const stats = [
    {
      label: 'Total Skills',
      value: totalSkills,
      icon: Package,
      color: 'text-blue-400',
    },
    {
      label: 'Approved Skills',
      value: approvedSkills,
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      label: 'Pending Submissions',
      value: pendingSubmissions,
      icon: Clock,
      color: 'text-yellow-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
              </div>
              <Icon className={`${stat.color}`} size={32} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
