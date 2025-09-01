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
      currentWork: [''],
      learning: [''],
      collaboration: [''],
      help: [''],
      portfolio: [''],
      email: [''],
      linkedin: [''],
      instagram: [''],
      funFact: ['']
    });
  }

  onGenerate() {
    this.markdown = this.generateMarkdown();
    this.showPreview = false;
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
    return `
<h1 align="center">Hi 👋, I'm ${d.name}</h1>
<h3 align="center">${d.tagline}</h3>

<p align="left"> 
  <img src="https://komarev.com/ghpvc/?username=${d.username}&label=Profile%20views&color=0e75b6&style=flat" alt="${d.username}" /> 
</p>

- 🔭 I’m currently working on *${d.currentWork}*
- 🌱 I’m currently learning *${d.learning}*
- 👯 I’m looking to collaborate on *${d.collaboration}*
- 🤝 I’m looking for help with *${d.help}*
- 👨‍💻 All of my projects are available at [${d.portfolio}](${d.portfolio})
- 💬 Ask me about *Frontend / Angular*
- 📫 How to reach me *${d.email}*
- ⚡ Fun fact *${d.funFact}*

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="${d.linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" height="30" width="40" /></a>
<a href="${d.instagram}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" height="30" width="40" /></a>
</p>

<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=${d.username}&show_icons=true&locale=en&layout=compact" /></p>
<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=${d.username}&show_icons=true&locale=en" /></p>
<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${d.username}&" /></p>
`;
  }
}
