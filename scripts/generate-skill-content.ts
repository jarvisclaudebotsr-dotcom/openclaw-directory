#!/usr/bin/env tsx
/**
 * Generate AI-powered content for all skills using Gemini 3 Flash
 * 
 * Usage: 
 *   npm run generate-content
 * 
 * Requirements:
 *   - GEMINI_API_KEY environment variable
 *   - tsx installed (npm install -g tsx)
 */

import { batchGenerateSkillContent } from '../lib/gemini';
import fs from 'fs';
import path from 'path';

// Skills to generate content for
const skills = [
  {
    name: 'Email Automation Suite',
    brief: 'provides smart email filtering, auto-responses, and follow-up sequences for productivity',
    features: ['Smart filtering', 'Auto-responses', 'Follow-up sequences', 'Template library'],
  },
  {
    name: 'GitHub Repo Manager',
    brief: 'manages repos, pull requests, issues, and CI/CD workflows with one command',
    features: ['Repo management', 'PR automation', 'Issue tracking', 'CI/CD integration'],
  },
  {
    name: 'Smart Calendar Assistant',
    brief: 'schedules meetings, finds optimal times, and manages multiple calendars automatically',
    features: ['Meeting scheduling', 'Time optimization', 'Multi-calendar support', 'Conflict resolution'],
  },
  {
    name: 'API Testing & Documentation',
    brief: 'tests APIs, generates documentation, and monitors endpoints automatically',
    features: ['API testing', 'Auto-documentation', 'Endpoint monitoring', 'Response validation'],
  },
  {
    name: 'Task Manager Pro',
    brief: 'provides full project management with tasks, docs, goals, and time tracking',
    features: ['Task management', 'Documentation', 'Goal tracking', 'Time tracking'],
  },
  {
    name: 'Note Database Manager',
    brief: 'creates and manages notes, databases, pages, and blocks like Notion',
    features: ['Note creation', 'Database management', 'Page organization', 'Block editing'],
  },
  {
    name: 'AI Code Reviewer',
    brief: 'provides automated code review, security scanning, and best practices enforcement',
    features: ['Code review', 'Security scanning', 'Best practices', 'Auto-suggestions'],
  },
  {
    name: 'Database Query Optimizer',
    brief: 'analyzes and optimizes SQL queries, suggests indexes for better performance',
    features: ['Query analysis', 'Index suggestions', 'Performance optimization', 'Execution plans'],
  },
  {
    name: 'Web Scraper Pro',
    brief: 'extracts data from websites, APIs, and databases automatically',
    features: ['Web scraping', 'API extraction', 'Data transformation', 'Export formats'],
  },
  {
    name: 'Market Intelligence',
    brief: 'tracks market trends, competitor analysis, and industry insights',
    features: ['Trend tracking', 'Competitor analysis', 'Industry reports', 'Alert system'],
  },
];

async function main() {
  console.log('🤖 Generating AI-powered skill content with Gemini 3 Flash...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY environment variable not set');
    console.error('Get your API key from: https://aistudio.google.com/app/apikey');
    process.exit(1);
  }

  try {
    const results = await batchGenerateSkillContent(skills);

    // Create output directory
    const outputDir = path.join(process.cwd(), 'generated-content');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write results to file
    const outputPath = path.join(outputDir, 'skills-content.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log(`✅ Generated content for ${results.length} skills`);
    console.log(`📄 Saved to: ${outputPath}\n`);

    // Print summary
    console.log('Summary:');
    results.forEach((skill) => {
      console.log(`\n📦 ${skill.name}`);
      console.log(`   Description: ${skill.description.slice(0, 100)}...`);
      console.log(`   Tags: ${skill.tags.join(', ')}`);
    });

    console.log('\n🎉 Content generation complete!');
  } catch (error) {
    console.error('❌ Error generating content:', error);
    process.exit(1);
  }
}

main();
