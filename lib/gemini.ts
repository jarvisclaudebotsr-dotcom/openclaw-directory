/**
 * Gemini 3 Flash Integration
 * AI-powered content generation for OpenClaw Directory
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Use Gemini 3 Flash for fast, cheap generation
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

/**
 * Generate a compelling skill description
 */
export async function generateSkillDescription(
  skillName: string,
  briefDescription: string,
  features?: string[]
): Promise<string> {
  const prompt = `Generate a compelling 200-word description for an OpenClaw skill called "${skillName}" that ${briefDescription}.

Include:
- What problem it solves
- Key features: ${features ? features.join(', ') : 'to be determined'}
- Who it's for
- Why it's valuable

Write in a direct, developer-focused tone. No marketing fluff.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

/**
 * Generate SEO meta description (155 chars max)
 */
export async function generateMetaDescription(
  skillName: string,
  briefDescription: string
): Promise<string> {
  const prompt = `Write a 155-character meta description for "${skillName}" - an OpenClaw skill that ${briefDescription}.

Make it compelling and SEO-friendly. Must be under 155 characters.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text().slice(0, 155);
}

/**
 * Generate category page introduction
 */
export async function generateCategoryIntro(category: string): Promise<string> {
  const prompt = `Write a 300-word introduction for the "${category}" skills category on OpenClaw Directory.

Explain:
- What these skills do
- Common use cases
- Who uses them
- Why they're valuable

Write in a professional, informative tone.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

/**
 * Generate related skills suggestions
 */
export async function generateRelatedSkills(
  currentSkill: string,
  category: string,
  tags: string[]
): Promise<string[]> {
  const prompt = `Given a skill in ${category} category with tags [${tags.join(', ')}], suggest 4 related skills that users might also be interested in.

Return ONLY the skill names, one per line, no explanations.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response
    .text()
    .split('\n')
    .filter((line) => line.trim())
    .slice(0, 4);
}

/**
 * Enhance a basic skill description with AI
 */
export async function enhanceSkillDescription(
  basicDescription: string
): Promise<{
  enhanced: string;
  features: string[];
  useCases: string[];
}> {
  const prompt = `Enhance this skill description and extract key features and use cases:

"${basicDescription}"

Return in this format:
ENHANCED:
[Enhanced 200-word description]

FEATURES:
- [Feature 1]
- [Feature 2]
- [Feature 3]

USE_CASES:
- [Use case 1]
- [Use case 2]
- [Use case 3]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Parse the response
  const enhancedMatch = text.match(/ENHANCED:\s*([\s\S]*?)FEATURES:/);
  const featuresMatch = text.match(/FEATURES:\s*([\s\S]*?)USE_CASES:/);
  const useCasesMatch = text.match(/USE_CASES:\s*([\s\S]*?)$/);

  return {
    enhanced: enhancedMatch?.[1].trim() || basicDescription,
    features: featuresMatch?.[1]
      .split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.replace(/^-\s*/, '').trim()) || [],
    useCases: useCasesMatch?.[1]
      .split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.replace(/^-\s*/, '').trim()) || [],
  };
}

/**
 * Generate skill tags from description
 */
export async function generateSkillTags(
  skillName: string,
  description: string
): Promise<string[]> {
  const prompt = `Generate 5-7 relevant tags for this OpenClaw skill:

Name: ${skillName}
Description: ${description}

Return ONLY lowercase tags, comma-separated (e.g., marketing, automation, research)`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response
    .text()
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
}

/**
 * Batch generate skill content
 */
export async function batchGenerateSkillContent(skills: {
  name: string;
  brief: string;
  features?: string[];
}[]): Promise<
  {
    name: string;
    description: string;
    metaDescription: string;
    tags: string[];
  }[]
> {
  const results = [];

  for (const skill of skills) {
    try {
      const [description, metaDescription, tags] = await Promise.all([
        generateSkillDescription(skill.name, skill.brief, skill.features),
        generateMetaDescription(skill.name, skill.brief),
        generateSkillTags(skill.name, skill.brief),
      ]);

      results.push({
        name: skill.name,
        description,
        metaDescription,
        tags,
      });

      // Rate limiting - wait 1 second between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error generating content for ${skill.name}:`, error);
      results.push({
        name: skill.name,
        description: skill.brief,
        metaDescription: skill.brief.slice(0, 155),
        tags: [],
      });
    }
  }

  return results;
}
