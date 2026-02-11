import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertise on OpenClaw Directory',
  description: 'Reach engaged AI agent developers and builders on OpenClawDirectory.ai',
};

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Advertise on OpenClaw Directory
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Reach an Engaged AI Builder Audience</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          OpenClaw Directory attracts developers, AI researchers, and technical decision-makers 
          who are actively building with AI agents and seeking ways to enhance their agent workflows and productivity.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Our community consists of early adopters, engineering leaders, and innovators who are at the 
          forefront of AI agent development and actively influence technology choices within their organizations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Advertise With Us</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Our community is highly engaged with AI agent tools, development frameworks, and productivity enhancers. 
          If you're offering developer tools, AI APIs, cloud services, or any tech product, our platform provides 
          direct access to your ideal audience.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Our users are early adopters who actively influence technology choices within their organizations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Audience</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2">
          <li>AI Developers & Agent Builders (60%)</li>
          <li>Engineering Leaders & Technical Managers (25%)</li>
          <li>Startup Founders & CTOs (10%)</li>
          <li>Other Technical Professionals (5%)</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-6">
          Our visitors come from leading tech companies, innovative startups, and development agencies worldwide, 
          all united by their interest in AI agent development and workflow optimization.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Advertising Options</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          We offer various advertising opportunities including:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2">
          <li>Featured listings in our directory</li>
          <li>Sponsored content and tutorials</li>
          <li>Newsletter sponsorships</li>
          <li>Custom partnership opportunities</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-6">
          Contact us at{' '}
          <a 
            href="mailto:ads@openclawdirectory.ai" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ads@openclawdirectory.ai
          </a>
          {' '}to discuss how we can help you reach our engaged developer community.
        </p>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Ready to reach thousands of AI agent developers and builders?
        </p>
        <a
          href="mailto:ads@openclawdirectory.ai?subject=Advertising%20on%20OpenClaw%20Directory"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Contact Us
        </a>
      </section>

      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>This site is not affiliated with, endorsed by, or sponsored by Anthropic Inc.</p>
      </div>
    </div>
  );
}
