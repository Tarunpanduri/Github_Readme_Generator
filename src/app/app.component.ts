import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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


  

  constructor(private fb: FormBuilder) {
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





  onCopy() {
    navigator.clipboard.writeText(this.markdown);
    alert('README copied to clipboard!');
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  generateMarkdown(): string {
    const d = this.readmeForm.value;

    const skillsMarkdown = this.skills
      .map((skill, i) => {
        const color = this.getSkillColor(i);
        return `<span style="padding:4px 8px; margin:2px; background-color:${color}; border-radius:6px; display:inline-block;">${skill}</span>`;
      })
      .join(' ');

    return `
<h1 align="center">Hi 👋, I'm ${d.name}</h1>
<h3 align="center">${d.tagline}</h3>
${d.addImage && d.imageurl ? `<img align="right" alt="Coding" width="400" src="${d.imageurl}">` : ''}

<p align="left"> 
  <img src="https://komarev.com/ghpvc/?username=${d.username}&label=Profile%20views&color=0e75b6&style=flat" alt="${d.username}" /> 
</p>

- 🔭 I’m currently working on *${d.currentWork}*
- 🌱 I’m currently learning *${d.learning}*
- 👯 I’m looking to collaborate on *${d.collaboration}*
- 🤝 I’m looking for help with *${d.help}*
- 👨‍💻 All of my projects are available at [${d.portfolio}](${d.portfolio})
- 💬 Ask me about *${d.ask}*
- 📫 How to reach me *${d.email}*
- ⚡ Fun fact *${d.funFact}*

</p>
<p>
<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="${d.linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" height="30" width="40" style="object-fit: contain; margin-right:10px" /></a>
<a href="${d.instagram}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" height="30" width="40" style="object-fit: contain;" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left">
  ${skillsMarkdown}
</p>

<p><img height="195" style="margin-bottom:10px;" align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=${d.username}&show_icons=true&locale=en&layout=compact" /></p>
<p>&nbsp;<img height="195" align="center" src="https://github-readme-stats.vercel.app/api?username=${d.username}&show_icons=true&locale=en" /></p>
<p><img height="195" align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${d.username}&" /></p>
`;
  }
}
