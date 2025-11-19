import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface AnalysisResult {
  overallScore: number;
  categories: AnalysisCategory[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  skills: SkillCategory[];
  atsMetrics: ATSMetric[];
}

interface AnalysisCategory {
  name: string;
  score: number;
  feedback: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface ATSMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'poor';
}

@Component({
  selector: 'app-cv-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cv-analyzer.component.html',
  styleUrls: ['./cv-analyzer.component.scss'],
})
export class CvAnalyzerComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Estados do componente
  selectedFile: File | null = null;
  isDragOver = false;
  isAnalyzing = false;
  analysisProgress = 0;
  targetJob = '';
  analysisResult: AnalysisResult | null = null;

  // Estatísticas
  analysisStats = {
    analysesDone: 1247,
    avgScore: 76,
  };

  // Métodos de Upload de Arquivo
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  handleFileSelection(file: File) {
    // Validar tipo de arquivo
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Por favor, selecione um arquivo PDF, DOC, DOCX ou TXT.');
      return;
    }

    // Validar tamanho do arquivo (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert(
        'O arquivo é muito grande. Por favor, selecione um arquivo menor que 10MB.'
      );
      return;
    }

    this.selectedFile = file;
  }

  removeFile() {
    this.selectedFile = null;
    this.targetJob = '';
    this.analysisResult = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Análise do CV
  analyzeCV() {
    if (!this.selectedFile) return;

    this.isAnalyzing = true;
    this.analysisProgress = 0;

    // Simular progresso da análise
    const progressInterval = setInterval(() => {
      this.analysisProgress += Math.random() * 15;
      if (this.analysisProgress >= 100) {
        this.analysisProgress = 100;
        clearInterval(progressInterval);

        // Simular tempo de processamento da IA
        setTimeout(() => {
          this.completeAnalysis();
        }, 1000);
      }
    }, 300);
  }

  completeAnalysis() {
    this.isAnalyzing = false;

    // Gerar resultado de análise simulado
    this.analysisResult = this.generateMockAnalysis();

    // Atualizar estatísticas
    this.analysisStats.analysesDone++;
    this.analysisStats.avgScore = Math.round(
      (this.analysisStats.avgScore * (this.analysisStats.analysesDone - 1) +
        this.analysisResult.overallScore) /
        this.analysisStats.analysesDone
    );
  }

  generateMockAnalysis(): AnalysisResult {
    const jobKeywords = this.targetJob.toLowerCase();

    return {
      overallScore: Math.floor(Math.random() * 30) + 65, // 65-95%

      categories: [
        {
          name: 'Formatação e Layout',
          score: Math.floor(Math.random() * 30) + 65,
          feedback:
            'Layout limpo e profissional. Considere adicionar mais whitespace para melhor legibilidade.',
        },
        {
          name: 'Conteúdo e Experiência',
          score: Math.floor(Math.random() * 30) + 65,
          feedback:
            'Experiências bem descritas. Tente quantificar mais seus resultados e conquistas.',
        },
        {
          name: 'Habilidades Técnicas',
          score: Math.floor(Math.random() * 30) + 70,
          feedback:
            'Boa variedade de habilidades. Considere organizar por nível de proficiência.',
        },
        {
          name: 'Palavras-chave ATS',
          score: Math.floor(Math.random() * 30) + 60,
          feedback:
            'Poderia incluir mais palavras-chave específicas da sua área.',
        },
        {
          name: 'Personalização para Vaga',
          score: this.targetJob ? Math.floor(Math.random() * 20) + 70 : 50,
          feedback: this.targetJob
            ? 'Boa adaptação para a vaga mencionada.'
            : 'Recomendamos personalizar o CV para cada vaga específica.',
        },
      ],

      strengths: [
        'Formatação profissional e limpa',
        'Experiências relevantes bem descritas',
        'Boa progressão de carreira visível',
        'Habilidades técnicas atualizadas',
        'Informações de contato completas',
      ],

      improvements: [
        'Adicionar mais métricas e números para quantificar resultados',
        'Incluir resumo profissional no topo do currículo',
        'Otimizar palavras-chave para sistemas ATS',
        'Considerar adicionar seção de certificações',
        'Revisar tempo verbal (use passado para experiências antigas)',
      ],

      recommendations: [
        'Personalize o objetivo para a vaga específica',
        'Adicione projetos pessoais ou de portfólio',
        'Inclua habilidades de soft skills relevantes',
        'Considere um design mais moderno',
        'Revise a seção de educação para incluir cursos recentes',
      ],

      skills: [
        {
          category: 'Tecnologias Frontend',
          skills: [
            { name: 'Angular', level: 'Advanced' },
            { name: 'TypeScript', level: 'Advanced' },
            { name: 'JavaScript', level: 'Expert' },
            { name: 'HTML/CSS', level: 'Expert' },
            { name: 'RxJS', level: 'Intermediate' },
          ],
        },
        {
          category: 'Ferramentas & DevOps',
          skills: [
            { name: 'Git', level: 'Advanced' },
            { name: 'Docker', level: 'Intermediate' },
            { name: 'AWS', level: 'Beginner' },
            { name: 'Jenkins', level: 'Intermediate' },
          ],
        },
        {
          category: 'Soft Skills',
          skills: [
            { name: 'Comunicação', level: 'Advanced' },
            { name: 'Trabalho em Equipe', level: 'Expert' },
            { name: 'Resolução de Problemas', level: 'Advanced' },
            { name: 'Liderança', level: 'Intermediate' },
          ],
        },
      ],

      atsMetrics: [
        { name: 'Palavras-chave Relevantes', value: '78%', status: 'good' },
        { name: 'Formatação ATS-Friendly', value: '85%', status: 'good' },
        {
          name: 'Densidade de Palavras-chave',
          value: '62%',
          status: 'warning',
        },
        { name: 'Seções Estruturadas', value: '90%', status: 'good' },
        { name: 'Compatibilidade com Scanner', value: '88%', status: 'good' },
      ],
    };
  }

  // Métodos auxiliares para classes CSS
  getScoreClass(score: number): string {
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
  }

  getSkillLevelClass(level: string): string {
    const levelMap: { [key: string]: string } = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Advanced: 'advanced',
      Expert: 'expert',
    };
    return levelMap[level] || 'beginner';
  }
}
