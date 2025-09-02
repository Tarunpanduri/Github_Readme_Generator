import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BadgeService } from './services/skills.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  readmeForm: FormGroup;
  markdown = '';
  showPreview = false;


  

  constructor(private fb: FormBuilder, private badgeService: BadgeService) {
    this.readmeForm = this.fb.group({
      name: [''],
      username: [''],
      tagline: [''],
      addImage: [false],
      imageurl: [''],
      currentWork: [''],
      learning: [''],
      collaboration: [''],
      help: [''],
      ask: [''],
      portfolio: [''],
      email: [''],
      linkedin: [''],
      instagram: [''],
      funFact: ['']
    });
  }

  skills: string[] = [];
  newSkill = '';

  // Fixed palette of light colors
  skillColors: string[] = [
    "#E0F7FA", // light cyan
    "#FFF9C4", // light yellow
    "#F8BBD0", // light pink
    "#C8E6C9", // light green
    "#D1C4E9", // light purple
    "#FFE0B2", // light orange
    "#B3E5FC", // light blue
    "#DCEDC8"  // light lime
  ];

  getSkillColor(index: number): string {
    return this.skillColors[index % this.skillColors.length];
  }

  addSkill() {
    if (this.newSkill.trim() && !this.skills.includes(this.newSkill.trim())) {
      this.skills.push(this.newSkill.trim());
    }
    this.newSkill = '';
  }

  removeSkill(skill: string) {
    this.skills = this.skills.filter(s => s !== skill);
  }


  selectedTab: 'code' | 'preview' = 'code';

onGenerate() {
  this.markdown = this.generateMarkdown(); 
  this.selectedTab = 'code'; 
}

suggestions: {name: string, badge: string}[] = [];

onSkillInput(value: string) {
  this.suggestions = this.badgeService.getSuggestions(value);
}


selectSuggestion(s: { name: string; badge: string }) {
  if (!this.skills.includes(s.name)) {
    this.skills.push(s.name);
  }
  this.newSkill = '';
  this.suggestions = [];
}



  onCopy() {
    navigator.clipboard.writeText(this.markdown);
    alert('README copied to clipboard!');
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  generateMarkdown(): string {
  const d = this.readmeForm.value;

// skills as Shields.io badges
const skillsMarkdown = this.skills
  .map(skill => {
    const badgeUrl = this.badgeService.getBadge(skill);
    return badgeUrl
      ? `<img src="${badgeUrl}"/>`
      : `<img src="https://img.shields.io/badge/${encodeURIComponent(skill)}-lightgrey?style=for-the-badge"/>`;
  })
  .join("\n  ");


  return `
<h1 align="center">Hi 👋, I'm ${d.name}</h1>
<h3 align="center">${d.tagline}</h3>
${d.addImage && d.imageurl ? `<img align="right" alt="Coding" width="340" src="${d.imageurl}">` : ""}

<p align="left">
<img src="https://komarev.com/ghpvc/?username=${d.username}&label=Profile%20views&color=0e75b6&style=flat" alt="profile views" />
</p>

- 🔭 I’m currently working on **${d.currentWork}**

- 🌱 I’m learning **${d.learning}**

- 👯 I’m looking to collaborate on **${d.collaboration}**

- 🤝 I’m open to help with **${d.help}**

- 👨‍💻 Check my work here: [Portfolio](${d.portfolio})

- 💬 Ask me about **${d.ask}**

- 📫 Reach me at **${d.email}**

- ⚡ Fun fact: **${d.funFact}**

---

### 🌐 Connect with me:
<p align="left">
<a href="${d.linkedin}" target="blank">
  <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white" height="30"/>
</a>
<a href="${d.instagram}" target="blank">
  <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=instagram&logoColor=white" height="30"/>
</a>
</p>

---

### 🛠️ Languages and Tools:
<p align="left">
  ${skillsMarkdown}
</p>

---

### 📊 GitHub Stats:
<p>
<img height="195" src="https://github-readme-stats.vercel.app/api/top-langs?username=${d.username}&show_icons=true&locale=en&layout=compact" />

<img height="195" src="https://github-readme-streak-stats.herokuapp.com/?user=${d.username}" />
</p>
`;
}

}
