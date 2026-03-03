const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outputPath = path.join(__dirname, 'Reinis_Allis_CV.pdf');
const fontRegular = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
const fontBold = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';

const doc = new PDFDocument({
  size: 'A4',
  margin: 34,
  info: {
    Title: 'Reinis Emils Allis - CV',
    Author: 'Reinis Emils Allis',
    Subject: 'Curriculum Vitae',
  },
});

doc.pipe(fs.createWriteStream(outputPath));
doc.registerFont('Regular', fontRegular);
doc.registerFont('Bold', fontBold);

const pageWidth = doc.page.width;
const pageHeight = doc.page.height;
const margin = 34;
const gutter = 22;
const leftWidth = 168;
const rightWidth = pageWidth - margin * 2 - leftWidth - gutter;
const leftX = margin;
const rightX = margin + leftWidth + gutter;
const headerHeight = 98;

const colors = {
  header: '#1F3A5F',
  text: '#1F2937',
  muted: '#4B5563',
  accent: '#0F4C81',
  line: '#D8DEE8',
  leftBg: '#F7FAFC',
  link: '#0B5CA8',
};

function heading(x, y, title, width) {
  doc.font('Bold').fontSize(10).fillColor(colors.accent).text(title.toUpperCase(), x, y, { width });
  const lineY = doc.y + 2;
  doc.lineWidth(0.8).strokeColor(colors.line).moveTo(x, lineY).lineTo(x + width, lineY).stroke();
  return lineY + 6;
}

function paragraph(x, y, text, width, size = 10, color = colors.text, lineGap = 2) {
  doc.font('Regular').fontSize(size).fillColor(color).text(text, x, y, {
    width,
    lineGap,
  });
  return doc.y;
}

function bullet(x, y, text, width, size = 9.7) {
  const dotY = y + 6;
  doc.circle(x + 2, dotY, 1.5).fillColor(colors.text).fill();
  doc.font('Regular').fontSize(size).fillColor(colors.text).text(text, x + 10, y, {
    width: width - 10,
    lineGap: 1.3,
  });
  return doc.y + 1;
}

function subheading(x, y, title, meta, width) {
  doc.font('Bold').fontSize(10.2).fillColor(colors.text).text(title, x, y, {
    width,
  });
  doc.font('Regular').fontSize(9).fillColor(colors.muted).text(meta, x, doc.y + 1, {
    width,
  });
  return doc.y + 2;
}

// Header

doc.rect(0, 0, pageWidth, headerHeight).fill(colors.header);

doc.font('Bold').fontSize(24).fillColor('#FFFFFF').text('Reinis Emīls Aļļis', margin, 24, {
  width: pageWidth - margin * 2,
});

doc.font('Regular').fontSize(12).fillColor('#D8E7FF').text('Junior Full Stack Engineer', margin, 55, {
  width: pageWidth - margin * 2,
});

doc.font('Regular').fontSize(9.2).fillColor('#E6EEF9').text(
  'Liepāja, Latvia  •  +371 25851571  •  reinisemilsa@gmail.com',
  margin,
  76,
  { width: pageWidth - margin * 2 },
);

// Left column background
const bodyTop = headerHeight + 14;
doc.rect(leftX - 8, bodyTop - 6, leftWidth + 12, pageHeight - bodyTop - margin + 2).fill(colors.leftBg);

let leftY = bodyTop;
let rightY = bodyTop;

// Left column
leftY = heading(leftX, leftY, 'Core Stack', leftWidth);
[
  'React, Next.js, TypeScript',
  'Node.js, Express.js, REST APIs',
  'Shopify ecosystem and e-commerce',
  'MySQL, SQL',
  'Git, Agile, CI/CD basics, Linux',
].forEach((line) => {
  leftY = bullet(leftX, leftY, line, leftWidth, 9.4);
});

leftY += 6;
leftY = heading(leftX, leftY, 'Languages', leftWidth);
leftY = bullet(leftX, leftY, 'Latvian - Native', leftWidth, 9.4);
leftY = bullet(leftX, leftY, 'English - Professional working proficiency', leftWidth, 9.4);

leftY += 6;
leftY = heading(leftX, leftY, 'Links', leftWidth);

const githubLabelY = leftY;
doc.font('Bold').fontSize(9.4).fillColor(colors.text).text('GitHub', leftX, githubLabelY, { width: leftWidth });
doc.font('Regular').fontSize(9.2).fillColor(colors.link).text('github.com/WuzzyLV', leftX, doc.y + 1, {
  width: leftWidth,
  link: 'https://github.com/WuzzyLV',
  underline: true,
});
leftY = doc.y + 5;

doc.font('Bold').fontSize(9.4).fillColor(colors.text).text('LinkedIn', leftX, leftY, { width: leftWidth });
doc.font('Regular').fontSize(9.2).fillColor(colors.link).text('reinis-emīls-aļļis-279639299', leftX, doc.y + 1, {
  width: leftWidth,
  link: 'https://www.linkedin.com/in/reinis-em%C4%ABls-a%C4%BC%C4%BCis-279639299/',
  underline: true,
});
leftY = doc.y + 7;

leftY = heading(leftX, leftY, 'Strengths', leftWidth);
[
  'Fast learner in new stacks',
  'Delivery-focused execution',
  'Strong ownership in small teams',
].forEach((line) => {
  leftY = bullet(leftX, leftY, line, leftWidth, 9.4);
});

// Right column
rightY = heading(rightX, rightY, 'Profile', rightWidth);
rightY = paragraph(
  rightX,
  rightY,
  'Full Stack Engineer with 1.7+ years of professional experience building, maintaining, and deploying web applications. Strong hands-on work across React, Next.js, Node.js/Express, and Shopify-focused e-commerce development. Comfortable owning features from implementation to release and production support.',
  rightWidth,
  10,
  colors.text,
  2.1,
);

rightY += 8;
rightY = heading(rightX, rightY, 'Experience', rightWidth);
rightY = subheading(
  rightX,
  rightY,
  'Full Stack Engineer  |  Libautech',
  'Sep 2024 - Present  |  Latvia (On-site)',
  rightWidth,
);
[
  'Design, develop, and deploy new web applications.',
  'Maintain and optimize existing applications for performance and reliability.',
  'Build and improve frontend features using React and Next.js.',
  'Contribute to backend/API work with Node.js and Express.',
  'Support CI/CD and server management as part of day-to-day delivery.',
].forEach((line) => {
  rightY = bullet(rightX, rightY, line, rightWidth, 9.6);
});

rightY += 8;
rightY = heading(rightX, rightY, 'Education', rightWidth);
rightY = subheading(
  rightX,
  rightY,
  'Liepāja State Technical School  |  Programming Technician',
  'Sep 2021 - Jun 2025',
  rightWidth,
);
rightY = bullet(rightX, rightY, 'Final qualification exam score: 94%', rightWidth, 9.5);
rightY = bullet(rightX, rightY, 'Focus areas: software documentation, MySQL, programming', rightWidth, 9.5);

rightY += 3;
rightY = subheading(
  rightX,
  rightY,
  'Accenture Bootcamp  |  Java / Software Engineering',
  'Jul 2023 - Aug 2023',
  rightWidth,
);
rightY = bullet(rightX, rightY, 'Covered Java OOP, Spring basics, and JUnit basics', rightWidth, 9.5);
rightY = bullet(rightX, rightY, 'Built a browser strategy game in a 4-person team', rightWidth, 9.5);

rightY += 8;
rightY = heading(rightX, rightY, 'Achievements', rightWidth);
rightY = bullet(
  rightX,
  rightY,
  '3rd Place - SkillsLatvia 2024, Web Programming (built a YouTube-style prototype in 2 days with Laravel + React)',
  rightWidth,
  9.5,
);
rightY = bullet(
  rightX,
  rightY,
  '3rd Place - Liepāja Computer Science Olympiad (led a team of 3; built project with Godot + C#)',
  rightWidth,
  9.5,
);

doc.end();
console.log(`Created ${outputPath}`);
