#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

// Create readline interface for user input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Template for new MDX article
function createMDXTemplate(title, description, author, tags, slug) {
  const currentDate = new Date().toISOString();

  return `export const metadata = {
  title: "${title}",
  description: "${description}",
  publishedOn: "${currentDate}",
  tags: [${tags.map((tag) => `"${tag}"`).join(', ')}],
  author: "${author}",
  isPublished: true,
}

# ${title}

${description}

## Introduction

Write your introduction here...

## Main Content

Add your main content here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- \`inline code\`

### Code Blocks

\`\`\`javascript
// Your code here
console.log("Hello, world!");
\`\`\`

### Lists

1. Numbered lists
2. Are great for
3. Step-by-step instructions

- Bullet points
- Work well for
- General lists

## Conclusion

Wrap up your article here...
`;
}

async function main() {
  console.log('🚀 Create New Blog Article\n');
  console.log('This tool will help you create a new MDX blog post template.\n');

  try {
    // Ask for article details
    const title = await askQuestion('📝 Article title: ');
    if (!title) {
      console.log('❌ Title is required');
      process.exit(1);
    }

    const description = await askQuestion('📄 Article description: ');
    if (!description) {
      console.log('❌ Description is required');
      process.exit(1);
    }

    const author =
      (await askQuestion('👤 Author name (default: Marc Lou): ')) || 'Marc Lou';

    const tagsInput = await askQuestion(
      '🏷️  Tags (comma-separated, e.g., "Next.js, React, Tutorial"): '
    );
    const tags = tagsInput
      ? tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    let slug =
      (await askQuestion(`🔗 URL slug (default: "${createSlug(title)}"): `)) ||
      createSlug(title);

    // Validate slug
    if (!slug.match(/^[a-z0-9-]+$/)) {
      console.log(
        '❌ Slug can only contain lowercase letters, numbers, and hyphens'
      );
      process.exit(1);
    }

    // Check if file already exists
    const filePath = join(
      process.cwd(),
      'app',
      'blog',
      '_content',
      `${slug}.mdx`
    );
    if (existsSync(filePath)) {
      const overwrite = await askQuestion(
        `⚠️  File "${slug}.mdx" already exists. Overwrite? (y/N): `
      );
      if (
        overwrite.toLowerCase() !== 'y' &&
        overwrite.toLowerCase() !== 'yes'
      ) {
        console.log('❌ Cancelled');
        process.exit(0);
      }
    }

    // Generate MDX content
    const mdxContent = createMDXTemplate(
      title,
      description,
      author,
      tags,
      slug
    );

    // Write file
    writeFileSync(filePath, mdxContent, 'utf8');

    console.log('\n✅ Article created successfully!');
    console.log(`📁 File: app/blog/_content/${slug}.mdx`);
    console.log(`🌐 URL: /blog/${slug}`);
    console.log('\n📝 Next steps:');
    console.log('1. Edit the MDX file to add your content');
    console.log('2. Start the development server: npm run dev');
    console.log(`3. Visit http://localhost:3000/blog/${slug} to preview`);
  } catch (error) {
    console.error('❌ Error creating article:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
main();
