const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const fontRegular = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
const fontBold = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';

const profile = {
  name: 'Reinis Emīls Aļļis',
  role: 'Junior Full Stack Engineer',
  location: 'Liepāja, Latvia',
  phone: '+371 25851571',
  email: 'reinisemilsa@gmail.com',
  githubText: 'github.com/WuzzyLV',
  githubUrl: 'https://github.com/WuzzyLV',
  linkedinText: 'linkedin.com/in/reinis-emīls-aļļis-279639299',
  linkedinUrl: 'https://www.linkedin.com/in/reinis-em%C4%ABls-a%C4%BC%C4%BCis-279639299/',
  summary:
    'Full Stack Engineer with 1.7+ years of professional experience building, maintaining, and deploying web applications. Strong hands-on work across React, Next.js, Node.js/Express, and Shopify-focused e-commerce development. Comfortable owning features from implementation to release and production support.',
  skills: [
    'React, Next.js, TypeScript, JavaScript',
    'Node.js, Express.js, REST APIs',
    'Shopify ecosystem, e-commerce workflows',
    'MySQL, SQL',
    'CI/CD basics, Linux server maintenance',
    'Git, Agile collaboration',
  ],
  experience: [
    'Design, develop, and deploy new web applications.',
    'Maintain and optimize existing applications for performance and reliability.',
    'Build frontend features with React and Next.js.',
    'Contribute to backend and API work with Node.js and Express.',
    'Support CI/CD pipelines and production server tasks.',
  ],
  education: [
    {
      title: 'Liepāja State Technical School - Programming Technician',
      meta: 'Sep 2021 - Jun 2025',
      points: ['Final qualification exam score: 94%', 'Focus: software documentation, MySQL, programming'],
    },
    {
      title: 'Accenture Bootcamp - Java / Software Engineering',
      meta: 'Jul 2023 - Aug 2023',
      points: ['Java OOP, Spring basics, JUnit basics', 'Built a browser strategy game in a 4-person team'],
    },
  ],
  awards: [
    '3rd Place - SkillsLatvia 2024 (Web Programming; Laravel + React project built in 2 days)',
    '3rd Place - Liepāja Computer Science Olympiad (led a team of 3; Godot + C# project)',
  ],
  languages: ['Latvian (Native)', 'English (Professional working proficiency)'],
};

function createDoc(filename) {
  const doc = new PDFDocument({ size: 'A4', margin: 36 });
  const output = path.join(__dirname, filename);
  doc.pipe(fs.createWriteStream(output));
  doc.registerFont('Regular', fontRegular);
  doc.registerFont('Bold', fontBold);
  return { doc, output };
}

function bullet(doc, text, x, y, width, color = '#1f2937', size = 9.5) {
  doc.circle(x + 2, y + 6, 1.5).fillColor(color).fill();
  doc.font('Regular').fontSize(size).fillColor(color).text(text, x + 10, y, { width: width - 10, lineGap: 1.3 });
  return doc.y + 1;
}

function heading(doc, text, x, y, width, accent = '#0f4c81') {
  doc.font('Bold').fontSize(10.5).fillColor(accent).text(text.toUpperCase(), x, y, { width });
  const lineY = doc.y + 2;
  doc.moveTo(x, lineY).lineTo(x + width, lineY).lineWidth(0.8).strokeColor('#d4dbe4').stroke();
  return lineY + 6;
}

function variantA() {
  const { doc, output } = createDoc('Reinis_Allis_CV_Variant_A_Classic.pdf');
  const w = doc.page.width - 72;

  doc.font('Bold').fontSize(24).fillColor('#111827').text(profile.name, 36, 36, { width: w });
  doc.font('Regular').fontSize(11).fillColor('#374151').text(profile.role, 36, 66, { width: w });

  doc.font('Regular').fontSize(9.5).fillColor('#4b5563').text(
    `${profile.location} | ${profile.phone} | ${profile.email}`,
    36,
    86,
    { width: w },
  );
  doc.fillColor('#0b5ca8').text(profile.githubText, 36, 101, { width: 220, underline: true, link: profile.githubUrl });
  doc.text(profile.linkedinText, 265, 101, { width: 300, underline: true, link: profile.linkedinUrl });

  let y = 128;
  y = heading(doc, 'Profile', 36, y, w, '#111827');
  doc.font('Regular').fontSize(10).fillColor('#1f2937').text(profile.summary, 36, y, { width: w, lineGap: 2 });
  y = doc.y + 8;

  y = heading(doc, 'Experience', 36, y, w, '#111827');
  doc.font('Bold').fontSize(10.2).fillColor('#111827').text('Full Stack Engineer | Libautech', 36, y, { width: w });
  doc.font('Regular').fontSize(9.2).fillColor('#6b7280').text('Sep 2024 - Present | Latvia (On-site)', 36, doc.y + 1, { width: w });
  y = doc.y + 2;
  profile.experience.forEach((p) => {
    y = bullet(doc, p, 36, y, w, '#1f2937', 9.5);
  });

  y += 7;
  y = heading(doc, 'Technical Skills', 36, y, w, '#111827');
  profile.skills.forEach((s) => {
    y = bullet(doc, s, 36, y, w, '#1f2937', 9.5);
  });

  y += 7;
  y = heading(doc, 'Education', 36, y, w, '#111827');
  profile.education.forEach((e) => {
    doc.font('Bold').fontSize(10).fillColor('#111827').text(e.title, 36, y, { width: w });
    doc.font('Regular').fontSize(9).fillColor('#6b7280').text(e.meta, 36, doc.y + 1, { width: w });
    y = doc.y + 2;
    e.points.forEach((p) => {
      y = bullet(doc, p, 36, y, w, '#1f2937', 9.3);
    });
    y += 3;
  });

  y = heading(doc, 'Awards & Languages', 36, y, w, '#111827');
  profile.awards.forEach((a) => {
    y = bullet(doc, a, 36, y, w, '#1f2937', 9.3);
  });
  profile.languages.forEach((l) => {
    y = bullet(doc, l, 36, y, w, '#1f2937', 9.3);
  });

  doc.end();
  return output;
}

function variantB() {
  const { doc, output } = createDoc('Reinis_Allis_CV_Variant_B_SidebarBold.pdf');
  const pageW = doc.page.width;
  const pageH = doc.page.height;
  const leftW = 186;

  doc.rect(0, 0, leftW, pageH).fill('#0f2d46');
  doc.rect(0, 0, pageW, 86).fill('#183f61');

  doc.font('Bold').fontSize(22).fillColor('#ffffff').text(profile.name, 22, 24, { width: pageW - 44 });
  doc.font('Regular').fontSize(11).fillColor('#cfe1f5').text(profile.role, 22, 54, { width: pageW - 44 });

  let ly = 100;
  const lx = 18;
  const lwidth = leftW - 30;

  doc.font('Bold').fontSize(10).fillColor('#ffffff').text('CONTACT', lx, ly, { width: lwidth });
  ly = doc.y + 6;
  doc.font('Regular').fontSize(9.3).fillColor('#d8e7f5').text(profile.location, lx, ly, { width: lwidth });
  doc.text(profile.phone, lx, doc.y + 2, { width: lwidth });
  doc.text(profile.email, lx, doc.y + 2, { width: lwidth });
  doc.fillColor('#a9d3ff').text(profile.githubText, lx, doc.y + 4, { width: lwidth, underline: true, link: profile.githubUrl });
  doc.text('LinkedIn profile', lx, doc.y + 2, { width: lwidth, underline: true, link: profile.linkedinUrl });
  ly = doc.y + 10;

  doc.font('Bold').fontSize(10).fillColor('#ffffff').text('SKILLS', lx, ly, { width: lwidth });
  ly = doc.y + 6;
  profile.skills.forEach((s) => {
    ly = bullet(doc, s, lx, ly, lwidth, '#e6f1ff', 9);
  });

  ly += 6;
  doc.font('Bold').fontSize(10).fillColor('#ffffff').text('LANGUAGES', lx, ly, { width: lwidth });
  ly = doc.y + 6;
  profile.languages.forEach((l) => {
    ly = bullet(doc, l, lx, ly, lwidth, '#e6f1ff', 9);
  });

  const rx = leftW + 22;
  const rwidth = pageW - rx - 28;
  let ry = 106;

  ry = heading(doc, 'Profile', rx, ry, rwidth, '#0f4c81');
  doc.font('Regular').fontSize(10).fillColor('#1f2937').text(profile.summary, rx, ry, { width: rwidth, lineGap: 2 });
  ry = doc.y + 10;

  ry = heading(doc, 'Experience', rx, ry, rwidth, '#0f4c81');
  doc.font('Bold').fontSize(10.5).fillColor('#111827').text('Full Stack Engineer | Libautech', rx, ry, { width: rwidth });
  doc.font('Regular').fontSize(9.2).fillColor('#6b7280').text('Sep 2024 - Present | Latvia (On-site)', rx, doc.y + 1, { width: rwidth });
  ry = doc.y + 3;
  profile.experience.forEach((p) => {
    ry = bullet(doc, p, rx, ry, rwidth, '#1f2937', 9.4);
  });

  ry += 8;
  ry = heading(doc, 'Education', rx, ry, rwidth, '#0f4c81');
  profile.education.forEach((e) => {
    doc.font('Bold').fontSize(10).fillColor('#111827').text(e.title, rx, ry, { width: rwidth });
    doc.font('Regular').fontSize(9).fillColor('#6b7280').text(e.meta, rx, doc.y + 1, { width: rwidth });
    ry = doc.y + 2;
    e.points.forEach((p) => {
      ry = bullet(doc, p, rx, ry, rwidth, '#1f2937', 9.2);
    });
    ry += 4;
  });

  ry = heading(doc, 'Achievements', rx, ry, rwidth, '#0f4c81');
  profile.awards.forEach((a) => {
    ry = bullet(doc, a, rx, ry, rwidth, '#1f2937', 9.2);
  });

  doc.end();
  return output;
}

function variantC() {
  const { doc, output } = createDoc('Reinis_Allis_CV_Variant_C_ModernCards.pdf');
  const x = 36;
  const w = doc.page.width - 72;

  doc.roundedRect(36, 36, w, 86, 9).fill('#111827');
  doc.font('Bold').fontSize(24).fillColor('#ffffff').text(profile.name, 52, 54, { width: w - 32 });
  doc.font('Regular').fontSize(11).fillColor('#cdd6e1').text(profile.role, 52, 84, { width: w - 32 });

  doc.roundedRect(36, 130, w, 34, 7).fill('#f3f4f6');
  doc.font('Regular').fontSize(9.2).fillColor('#374151').text(
    `${profile.location} • ${profile.phone} • ${profile.email}`,
    48,
    142,
    { width: w - 24 },
  );

  const colGap = 16;
  const colW = (w - colGap) / 2;
  let leftY = 176;
  let rightY = 176;

  function card(title, bodyLines, cx, cy, cw, accent) {
    const temp = new PDFDocument({ autoFirstPage: false });
    temp.on('error', () => {});
    temp.end();

    doc.roundedRect(cx, cy, cw, 20 + bodyLines.length * 15 + 14, 7).fill('#ffffff').strokeColor('#e5e7eb').lineWidth(1).stroke();
    doc.roundedRect(cx, cy, cw, 28, 7).fill(accent);
    doc.font('Bold').fontSize(10).fillColor('#ffffff').text(title.toUpperCase(), cx + 10, cy + 9, { width: cw - 20 });
    let yy = cy + 36;
    bodyLines.forEach((line) => {
      yy = bullet(doc, line, cx + 10, yy, cw - 20, '#1f2937', 9.1);
    });
    return cy + 20 + bodyLines.length * 15 + 20;
  }

  leftY = card('Profile', [profile.summary], x, leftY, colW, '#0f4c81');
  leftY += 10;
  leftY = card('Skills', profile.skills, x, leftY, colW, '#0f4c81');
  leftY += 10;
  leftY = card('Links', [profile.githubText, 'LinkedIn: reinis-emīls-aļļis-279639299'], x, leftY, colW, '#0f4c81');

  const expLines = ['Full Stack Engineer | Libautech', 'Sep 2024 - Present | Latvia (On-site)', ...profile.experience];
  rightY = card('Experience', expLines, x + colW + colGap, rightY, colW, '#1f2937');
  rightY += 10;
  const eduLines = [
    'Liepāja State Technical School (Programming Technician) - Sep 2021 to Jun 2025',
    'Final exam score: 94%',
    'Accenture Bootcamp (Java / Software Engineering) - Jul 2023 to Aug 2023',
    'Team browser strategy project (4-person team)',
  ];
  rightY = card('Education', eduLines, x + colW + colGap, rightY, colW, '#1f2937');
  rightY += 10;
  rightY = card('Achievements', [...profile.awards, ...profile.languages], x + colW + colGap, rightY, colW, '#1f2937');

  doc.end();
  return output;
}

const files = [variantA(), variantB(), variantC()];
for (const file of files) {
  console.log(`Created ${file}`);
}
