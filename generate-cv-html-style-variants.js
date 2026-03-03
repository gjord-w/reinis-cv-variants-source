const fs = require('fs');
const path = require('path');

const data = {
  name: 'Reinis Emīls Aļļis',
  role: 'Junior Full Stack Engineer',
  location: 'Liepāja, Latvia',
  phone: '+371 25851571',
  email: 'reinisemilsa@gmail.com',
  github: 'https://github.com/WuzzyLV',
  linkedin: 'https://www.linkedin.com/in/reinis-em%C4%ABls-a%C4%BC%C4%BCis-279639299/',
  summary:
    'Full Stack Engineer with 1.7+ years of professional experience building, maintaining, and deploying web applications. Strong hands-on work across React, Next.js, Node.js/Express, and Shopify-focused e-commerce development. Comfortable owning features from implementation to release and production support.',
  experience: [
    'Design, develop, and deploy new web applications.',
    'Maintain and optimize existing applications for performance and reliability.',
    'Build frontend features using React and Next.js.',
    'Contribute to backend/API work with Node.js and Express.',
    'Support CI/CD pipelines and production server maintenance.',
  ],
  skills: {
    Frontend: 'React, Next.js, TypeScript, JavaScript, HTML, CSS',
    Backend: 'Node.js, Express.js, REST APIs, Java (basics), Spring Boot (basics)',
    Data: 'MongoDB, MySQL, SQL',
    DevOps: 'CI/CD pipelines, Linux server maintenance, deployment support',
    Product: 'Shopify ecosystem, e-commerce implementation, Git, Agile workflow',
  },
};

function list(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function stackRows() {
  return Object.entries(data.skills)
    .map(([k, v]) => `<div class="row"><div class="label">${k}</div><div class="value">${v}</div></div>`)
    .join('');
}

function awardsBlock() {
  return `
    <div class="award-item">
      <h4>SkillsLatvia 2024 - Web Programming (3rd Place)</h4>
      <p>Built a YouTube-style prototype in 2 days using Laravel + React. Delivered full-stack functionality under strict time constraints and ranked among the top national participants.</p>
    </div>
    <div class="award-item">
      <h4>Liepāja Computer Science Olympiad (3rd Place)</h4>
      <p>Led a 3-person team and delivered a complete project using Godot + C#, combining technical implementation with coordination and delivery ownership.</p>
    </div>
  `;
}

const variantE = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CV Variant E Editorial</title>
<style>
  :root { --ink:#1d2430; --muted:#5a6472; --line:#d9dfe8; --accent:#2e4f91; --paper:#fff; --bg:#f5f7fb; }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--bg);font-family:Inter,Segoe UI,Arial,sans-serif;color:var(--ink)}
  .page{width:210mm;min-height:297mm;margin:0 auto;background:var(--paper);padding:13mm}
  .top{padding-bottom:10px;border-bottom:1px solid var(--line)}
  .name{font-family:Georgia,Times New Roman,serif;font-size:36px;line-height:1;margin:0;letter-spacing:-0.4px}
  .role{margin-top:6px;color:var(--accent);font-weight:700;font-size:14px;letter-spacing:.4px;text-transform:uppercase}
  .meta{margin-top:8px;font-size:12px;color:var(--muted)}
  .main{display:grid;grid-template-columns:1.45fr .95fr;gap:14px;margin-top:12px}
  .section{margin-top:10px}
  .h{font-size:10.8px;font-weight:800;color:var(--accent);letter-spacing:1px;text-transform:uppercase;display:flex;gap:8px;align-items:center}
  .h::after{content:'';height:1px;background:var(--line);flex:1}
  p{margin:6px 0 0;font-size:12.2px;line-height:1.5}
  ul{margin:7px 0 0;padding-left:18px}
  li{font-size:12px;line-height:1.42;margin-bottom:4px}
  .role-title{margin-top:7px;font-size:13px;font-weight:800}
  .role-meta{font-size:11.2px;color:var(--muted);margin-top:3px}
  .edu h4,.award-item h4{margin:7px 0 0;font-size:12.4px}
  .edu p,.award-item p{font-size:11.2px;color:#4f5b6d;line-height:1.45;margin-top:4px}
  .stack .row{display:grid;grid-template-columns:82px 1fr;gap:8px;padding:6px 0;border-bottom:1px dashed #e0e6ef}
  .stack .row:last-child{border-bottom:none}
  .label{font-size:10.2px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:#2f3f59}
  .value{font-size:11.5px;line-height:1.45;font-weight:600;color:#24324a}
  .socials a{display:block;font-size:12px;color:#174eb6;text-decoration:none;font-weight:700;margin-top:6px}
  .lang{display:flex;justify-content:space-between;font-size:11.7px;margin-top:6px}
  .quote{margin-top:8px;font-size:11.2px;color:#47566d;padding:8px;border-left:3px solid #d8e2f5;background:#f9fbff}
  @page{size:A4;margin:0}
</style>
</head>
<body>
  <div class="page">
    <div class="top">
      <h1 class="name">${data.name}</h1>
      <div class="role">${data.role}</div>
      <div class="meta">${data.location} | ${data.phone} | ${data.email}</div>
    </div>
    <div class="main">
      <section>
        <div class="section"><div class="h">Profile</div><p>${data.summary}</p></div>
        <div class="section"><div class="h">Experience</div>
          <div class="role-title">Full Stack Engineer - Libautech</div>
          <div class="role-meta">Sep 2024 - Present | Latvia (On-site)</div>
          <ul>${list(data.experience)}</ul>
        </div>
        <div class="section"><div class="h">Education</div>
          <div class="edu"><h4>Liepāja State Technical School - Programming Technician</h4><p>Sep 2021 - Jun 2025 | Final qualification exam score: 94%</p></div>
          <div class="edu"><h4>Accenture Bootcamp - Java / Software Engineering</h4><p>Jul 2023 - Aug 2023 | Java OOP, Spring basics, JUnit basics.</p></div>
        </div>
        <div class="section"><div class="h">Awards & Competition Highlights</div>${awardsBlock()}</div>
      </section>
      <aside>
        <div class="section"><div class="h">Tech Stack</div><div class="stack">${stackRows()}</div></div>
        <div class="section socials"><div class="h">Socials</div>
          <a href="${data.github}">GitHub</a>
          <a href="${data.linkedin}">LinkedIn</a>
        </div>
        <div class="section"><div class="h">Languages</div>
          <div class="lang"><strong>Latvian</strong><span>Native</span></div>
          <div class="lang"><strong>English</strong><span>Professional working proficiency</span></div>
        </div>
        <div class="quote">Fast learner with strong delivery focus. Comfortable taking ownership from feature implementation through deployment and production support.</div>
      </aside>
    </div>
  </div>
</body>
</html>`;

const variantF = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CV Variant F Contrast</title>
<style>
  :root{--dark:#0f172a;--dark2:#111f36;--light:#f8fafc;--paper:#fff;--ink:#111827;--muted:#556176;--line:#dce3ef;--accent:#3b82f6}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:#eef2f8;font-family:Inter,Segoe UI,Arial,sans-serif;color:var(--ink)}
  .page{width:210mm;min-height:297mm;margin:0 auto;background:var(--paper);display:grid;grid-template-columns:72mm 1fr}
  .left{background:linear-gradient(180deg,var(--dark),var(--dark2));padding:14mm 10mm;color:#dbe7ff}
  .name{font-size:30px;line-height:1.03;margin:0;color:#fff;font-weight:800}
  .role{margin-top:6px;color:#8bb6ff;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.7px}
  .contact{margin-top:13px;font-size:11px;line-height:1.6}
  .left h3{margin:16px 0 8px;color:#fff;font-size:10px;letter-spacing:1px;text-transform:uppercase}
  .pill{display:block;background:#162847;border:1px solid #26416e;color:#e6efff;border-radius:8px;padding:6px 8px;font-size:10.6px;margin-bottom:6px;font-weight:600;line-height:1.4}
  .social a{display:block;color:#9fc4ff;text-decoration:none;font-size:11px;margin-bottom:6px;font-weight:700}
  .right{padding:14mm 11mm 11mm}
  .section{margin-bottom:12px}
  .title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#1e40af;display:flex;gap:8px;align-items:center}
  .title:after{content:'';height:1px;background:var(--line);flex:1}
  p{margin:7px 0 0;font-size:12.2px;line-height:1.5}
  .job{margin-top:7px;padding:9px;border:1px solid var(--line);border-radius:10px;background:#fbfdff}
  .job h4{margin:0;font-size:13px}
  .meta{margin-top:3px;font-size:11.1px;color:var(--muted);font-weight:600}
  ul{margin:8px 0 0;padding-left:18px}
  li{font-size:12px;line-height:1.42;margin-bottom:4px}
  .edu,.award{margin-top:8px;padding:8px;border-left:3px solid #d8e6ff;background:#f9fbff;border-radius:2px}
  .edu h4,.award h4{margin:0;font-size:12.5px}
  .edu p,.award p{margin:4px 0 0;font-size:11.2px;color:#4f5d72;line-height:1.45}
  @page{size:A4;margin:0}
</style>
</head>
<body>
  <div class="page">
    <aside class="left">
      <h1 class="name">${data.name}</h1>
      <div class="role">${data.role}</div>
      <div class="contact">${data.location}<br/>${data.phone}<br/>${data.email}</div>

      <h3>Tech Stack</h3>
      ${Object.entries(data.skills)
        .map(([k, v]) => `<span class="pill"><strong>${k}:</strong> ${v}</span>`)
        .join('')}

      <h3>Socials</h3>
      <div class="social">
        <a href="${data.github}">GitHub</a>
        <a href="${data.linkedin}">LinkedIn</a>
      </div>

      <h3>Languages</h3>
      <span class="pill">Latvian - Native</span>
      <span class="pill">English - Professional working proficiency</span>
    </aside>

    <main class="right">
      <div class="section">
        <div class="title">Profile</div>
        <p>${data.summary}</p>
      </div>

      <div class="section">
        <div class="title">Experience</div>
        <div class="job">
          <h4>Full Stack Engineer - Libautech</h4>
          <div class="meta">Sep 2024 - Present | Latvia (On-site)</div>
          <ul>${list(data.experience)}</ul>
        </div>
      </div>

      <div class="section">
        <div class="title">Education</div>
        <div class="edu"><h4>Liepāja State Technical School - Programming Technician</h4><p>Sep 2021 - Jun 2025 | Final qualification exam score: 94%</p></div>
        <div class="edu"><h4>Accenture Bootcamp - Java / Software Engineering</h4><p>Jul 2023 - Aug 2023 | Java OOP, Spring basics, JUnit basics.</p></div>
      </div>

      <div class="section">
        <div class="title">Awards & Competition Highlights</div>
        ${awardsBlock().replaceAll('award-item', 'award')}
      </div>
    </main>
  </div>
</body>
</html>`;

const variantG = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CV Variant G Timeline</title>
<style>
  :root{--ink:#1b2332;--muted:#5a667b;--line:#dde4ef;--accent:#2563eb;--bg:#f4f7fc;--paper:#fff}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--bg);font-family:Inter,Segoe UI,Arial,sans-serif;color:var(--ink)}
  .page{width:210mm;min-height:297mm;margin:0 auto;background:var(--paper);padding:12mm 13mm}
  .top{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:end;padding-bottom:10px;border-bottom:2px solid #edf2fa}
  .name{margin:0;font-size:34px;line-height:1;letter-spacing:-.5px}
  .role{margin-top:6px;color:var(--accent);font-size:14px;font-weight:700}
  .contact{font-size:11px;color:var(--muted);text-align:right;line-height:1.6}
  .grid{display:grid;grid-template-columns:1.1fr .9fr;gap:14px;margin-top:11px}
  .h{font-size:10.8px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#1e40af;margin:0 0 7px;display:flex;align-items:center;gap:7px}
  .h:after{content:'';height:1px;background:var(--line);flex:1}
  p{margin:0;font-size:12.2px;line-height:1.5}
  .timeline{position:relative;padding-left:16px}
  .timeline:before{content:'';position:absolute;left:3px;top:4px;bottom:4px;width:2px;background:#dbe5f6}
  .item{position:relative;margin-bottom:10px}
  .item:before{content:'';position:absolute;left:-16px;top:5px;width:8px;height:8px;border-radius:50%;background:#2a66d8;box-shadow:0 0 0 3px #ecf2ff}
  .item h4{margin:0;font-size:12.8px}
  .meta{margin-top:2px;font-size:11px;color:var(--muted);font-weight:600}
  ul{margin:6px 0 0;padding-left:18px}
  li{font-size:12px;line-height:1.42;margin-bottom:4px}
  .card{border:1px solid var(--line);border-radius:12px;padding:10px 11px;background:#fff}
  .stack .row{display:grid;grid-template-columns:80px 1fr;gap:8px;padding:6px 0;border-bottom:1px dashed #e2e8f2}
  .stack .row:last-child{border-bottom:none}
  .label{font-size:10.2px;font-weight:800;text-transform:uppercase;color:#30425f;letter-spacing:.4px}
  .value{font-size:11.4px;line-height:1.45;font-weight:600;color:#24324a}
  .social a{display:block;margin-top:6px;color:#174eb6;text-decoration:none;font-size:11.8px;font-weight:700}
  .lang{display:flex;justify-content:space-between;margin-top:7px;font-size:11.6px}
  .award{margin-top:8px;padding:8px;border-left:3px solid #d8e6ff;background:#f9fbff}
  .award h4{margin:0;font-size:12.5px}
  .award p{margin-top:4px;font-size:11.2px;color:#4f5d72;line-height:1.45}
  @page{size:A4;margin:0}
</style>
</head>
<body>
  <div class="page">
    <div class="top">
      <div>
        <h1 class="name">${data.name}</h1>
        <div class="role">${data.role}</div>
      </div>
      <div class="contact">${data.location}<br/>${data.phone}<br/>${data.email}</div>
    </div>

    <div class="grid">
      <section>
        <div class="h">Profile</div>
        <p>${data.summary}</p>

        <div style="height:10px"></div>
        <div class="h">Experience & Education Timeline</div>
        <div class="timeline">
          <div class="item">
            <h4>Full Stack Engineer - Libautech</h4>
            <div class="meta">Sep 2024 - Present | Latvia (On-site)</div>
            <ul>${list(data.experience)}</ul>
          </div>
          <div class="item">
            <h4>Liepāja State Technical School - Programming Technician</h4>
            <div class="meta">Sep 2021 - Jun 2025 | Final qualification exam score: 94%</div>
          </div>
          <div class="item" style="margin-bottom:0">
            <h4>Accenture Bootcamp - Java / Software Engineering</h4>
            <div class="meta">Jul 2023 - Aug 2023 | Java OOP, Spring basics, JUnit basics</div>
          </div>
        </div>

        <div style="height:10px"></div>
        <div class="h">Awards & Competition Highlights</div>
        ${awardsBlock().replaceAll('award-item', 'award')}
      </section>

      <aside>
        <div class="card stack">
          <div class="h">Tech Stack</div>
          ${stackRows()}
        </div>

        <div class="card social" style="margin-top:10px">
          <div class="h">Socials</div>
          <a href="${data.github}">GitHub</a>
          <a href="${data.linkedin}">LinkedIn</a>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="h">Languages</div>
          <div class="lang"><strong>Latvian</strong><span>Native</span></div>
          <div class="lang"><strong>English</strong><span>Professional working proficiency</span></div>
        </div>
      </aside>
    </div>
  </div>
</body>
</html>`;

const variants = [
  ['Reinis_Allis_CV_Variant_E_Editorial.html', variantE],
  ['Reinis_Allis_CV_Variant_F_ContrastSidebar.html', variantF],
  ['Reinis_Allis_CV_Variant_G_Timeline.html', variantG],
];

for (const [file, content] of variants) {
  fs.writeFileSync(path.join(__dirname, file), content);
  console.log(`Created ${file}`);
}
