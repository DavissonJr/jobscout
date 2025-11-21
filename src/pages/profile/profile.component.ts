import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NavSection {
  id: string;
  label: string;
  icon: string;
}

interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  duration: string;
  description: string;
  skills: string[];
}

interface Skill {
  name: string;
  level: number;
}

interface Preferences {
  employmentTypes: string[];
  workModes: string[];
  salaryRange: string;
  seniority: string;
}

interface UserProfile {
  avatar: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  bio: string;
  connections: number;
  views: number;
  experiences: Experience[];
  preferences: Preferences;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  activeSection = 'personal';
  profileCompletion = 75;

  navSections: NavSection[] = [
    { id: 'personal', label: 'Informações Pessoais', icon: 'bi-person' },
    { id: 'experience', label: 'Experiência', icon: 'bi-briefcase' },
    { id: 'skills', label: 'Habilidades', icon: 'bi-tools' },
    { id: 'preferences', label: 'Preferências', icon: 'bi-gear' },
  ];

  completionTips = [
    { text: 'Adicionar foto de perfil', completed: true },
    { text: 'Completar bio profissional', completed: true },
    { text: 'Adicionar pelo menos 2 experiências', completed: false },
    { text: 'Definir habilidades principais', completed: true },
    { text: 'Configurar preferências de vaga', completed: false },
  ];

  userProfile: UserProfile = {
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    fullName: 'João Silva',
    title: 'Desenvolvedor Front-end Senior',
    email: 'joao.silva@email.com',
    phone: '+55 (11) 99999-9999',
    location: 'São Paulo, SP',
    linkedin: 'https://linkedin.com/in/joaosilva',
    bio: 'Desenvolvedor Front-end com 5+ anos de experiência em Angular, React e Vue.js. Especializado em criar aplicações web escaláveis e performáticas. Apaixonado por UX/UI e sempre buscando aprender novas tecnologias.',
    connections: 127,
    views: 543,
    experiences: [
      {
        position: 'Senior Front-end Developer',
        company: 'Tech Solutions Inc.',
        startDate: 'Jan 2022',
        endDate: 'Presente',
        current: true,
        duration: '2 anos',
        description:
          'Liderança do desenvolvimento front-end de aplicações enterprise usando Angular e RxJS. Mentoria de desenvolvedores juniores e implementação de boas práticas de código.',
        skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Jest'],
      },
      {
        position: 'Front-end Developer',
        company: 'Startup Inovadora',
        startDate: 'Mar 2020',
        endDate: 'Dez 2021',
        current: false,
        duration: '1 ano 9 meses',
        description:
          'Desenvolvimento de aplicações web responsivas usando React e Vue.js. Colaboração com equipe de design para implementação de interfaces modernas e acessíveis.',
        skills: ['React', 'Vue.js', 'JavaScript', 'CSS3', 'Webpack'],
      },
    ],
    preferences: {
      employmentTypes: ['CLT', 'PJ'],
      workModes: ['Remoto', 'Híbrido'],
      salaryRange: '6000-10000',
      seniority: 'Sênior',
    },
  };

  technicalSkills: Skill[] = [
    { name: 'Angular', level: 9 },
    { name: 'TypeScript', level: 8 },
    { name: 'JavaScript', level: 9 },
    { name: 'HTML/CSS', level: 8 },
    { name: 'React', level: 7 },
    { name: 'Vue.js', level: 6 },
  ];

  softSkills: string[] = [
    'Comunicação',
    'Trabalho em equipe',
    'Resolução de problemas',
    'Gestão de tempo',
    'Liderança',
  ];

  employmentTypes: string[] = ['CLT', 'PJ', 'Freelancer', 'Estágio'];
  workModes: string[] = ['Presencial', 'Híbrido', 'Remoto'];
  seniorityLevels: string[] = [
    'Júnior',
    'Pleno',
    'Sênior',
    'Especialista',
    'Liderança',
  ];

  ngOnInit() {
    this.calculateProfileCompletion();
  }

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  calculateProfileCompletion() {
    let completion = 0;
    const totalFields = 10;

    // Foto
    if (this.userProfile.avatar) completion += 10;
    // Nome
    if (this.userProfile.fullName) completion += 10;
    // Cargo
    if (this.userProfile.title) completion += 10;
    // Email
    if (this.userProfile.email) completion += 10;
    // Bio
    if (this.userProfile.bio && this.userProfile.bio.length > 50)
      completion += 10;
    // Experiências
    if (this.userProfile.experiences.length >= 2) completion += 20;
    // Habilidades técnicas
    if (this.technicalSkills.length >= 3) completion += 10;
    // Habilidades comportamentais
    if (this.softSkills.length >= 3) completion += 10;
    // Preferências
    if (this.userProfile.preferences.employmentTypes.length > 0)
      completion += 5;
    if (this.userProfile.preferences.workModes.length > 0) completion += 5;

    this.profileCompletion = completion;
  }

  getCompletionClass(): string {
    if (this.profileCompletion >= 80) return '';
    if (this.profileCompletion >= 60) return 'medium';
    return 'low';
  }

  getCompletionText(): string {
    if (this.profileCompletion >= 80) return 'completo';
    if (this.profileCompletion >= 60) return 'parcialmente completo';
    return 'incompleto';
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.avatar = e.target.result;
        this.calculateProfileCompletion();
      };
      reader.readAsDataURL(file);
    }
  }

  addExperience() {
    const newExperience: Experience = {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      duration: '',
      description: '',
      skills: [],
    };
    this.userProfile.experiences.unshift(newExperience);
    this.calculateProfileCompletion();
  }

  editExperience(index: number) {
    // Em uma implementação real, abriria um modal de edição
    console.log('Editando experiência:', index);
  }

  removeExperience(index: number) {
    this.userProfile.experiences.splice(index, 1);
    this.calculateProfileCompletion();
  }

  increaseSkill(skill: Skill) {
    if (skill.level < 10) {
      skill.level++;
    }
  }

  decreaseSkill(skill: Skill) {
    if (skill.level > 1) {
      skill.level--;
    }
  }

  addTechnicalSkill() {
    this.technicalSkills.push({ name: 'Nova Habilidade', level: 5 });
    this.calculateProfileCompletion();
  }

  addSoftSkill(input: HTMLInputElement) {
    const skill = input.value.trim();
    if (skill && !this.softSkills.includes(skill)) {
      this.softSkills.push(skill);
      input.value = '';
      this.calculateProfileCompletion();
    }
  }

  removeSoftSkill(skill: string) {
    this.softSkills = this.softSkills.filter((s) => s !== skill);
    this.calculateProfileCompletion();
  }

  toggleEmploymentType(type: string) {
    const index = this.userProfile.preferences.employmentTypes.indexOf(type);
    if (index > -1) {
      this.userProfile.preferences.employmentTypes.splice(index, 1);
    } else {
      this.userProfile.preferences.employmentTypes.push(type);
    }
    this.calculateProfileCompletion();
  }

  toggleWorkMode(mode: string) {
    const index = this.userProfile.preferences.workModes.indexOf(mode);
    if (index > -1) {
      this.userProfile.preferences.workModes.splice(index, 1);
    } else {
      this.userProfile.preferences.workModes.push(mode);
    }
    this.calculateProfileCompletion();
  }

  saveProfile() {
    // Simular salvamento
    console.log('Salvando perfil:', this.userProfile);
    // Aqui integraria com serviço de API
    alert('Perfil salvo com sucesso!');
  }

  downloadProfile() {
    // Simular download do perfil
    console.log('Exportando perfil...');
    // Aqui geraria PDF ou arquivo JSON
    alert('Perfil exportado com sucesso!');
  }
}
