import { Injectable, inject } from '@angular/core';
import { Question } from '../models/question.model';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class ExplainService {
  private readonly langService = inject(LanguageService);

  buildUrl(q: Question): string {
    const lang = this.langService.lang();
    const isPl = lang === 'pl';

    const topics = (q.tags ?? [])
      .map(t => t.replace('#', ''))
      .join(', ');

    const answerLines = q.answers
      .map(a => `  ${a.label}) ${isPl ? a.textPL : a.textEN}`)
      .join('\n');

    const correctOption = q.answers.find(a => a.label === q.correctAnswer);
    const correctOptionText = correctOption
      ? (isPl ? correctOption.textPL : correctOption.textEN)
      : q.correctAnswer;
    const correctText = correctOption ? `${q.correctAnswer}) ${correctOptionText}` : q.correctAnswer;

    const snippet = isPl ? q.codeSnippetPL : q.codeSnippetEN;

    const prompt = isPl
      ? this.buildPolishPrompt(topics, snippet, answerLines, correctText)
      : this.buildEnglishPrompt(topics, snippet, answerLines, correctText);

    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  }

  private buildPolishPrompt(
    topics: string,
    snippet: string,
    answerLines: string,
    correctText: string,
  ): string {
    return [
      `Jesteś przyjaznym nauczycielem Javy dla absolutnych początkujących. Odpowiedz bardzo krótko — maksymalnie 1–2 minuty czytania.`,
      ``,
      `Temat(y): ${topics}`,
      ``,
      `Uczniowi pokazano poniższy fragment kodu Java:`,
      `\`\`\`java`,
      snippet,
      `\`\`\``,
      ``,
      `Musiał wybrać spośród następujących odpowiedzi:`,
      answerLines,
      ``,
      `Poprawna odpowiedź to: ${correctText}`,
      ``,
      `Wyjaśnij krótko:`,
      `1. Dlaczego poprawna odpowiedź jest prawidłowa.`,
      `2. Dlaczego najbardziej kuszące błędne odpowiedzi są nieprawidłowe.`,
      `3. Jeden kluczowy koncept, który uczeń powinien zapamiętać.`,
      ``,
      `Używaj prostego języka, bez żargonu. Maksymalnie 150 słów.`,
    ].join('\n');
  }

  private buildEnglishPrompt(
    topics: string,
    snippet: string,
    answerLines: string,
    correctText: string,
  ): string {
    return [
      `You are a friendly Java tutor for absolute beginners. Keep your answer very short — maximum 1–2 minutes to read.`,
      ``,
      `Topic(s): ${topics}`,
      ``,
      `A student was shown this Java code snippet:`,
      `\`\`\`java`,
      snippet,
      `\`\`\``,
      ``,
      `They had to choose from these answers:`,
      answerLines,
      ``,
      `The correct answer is: ${correctText}`,
      ``,
      `Please explain briefly:`,
      `1. Why the correct answer is right.`,
      `2. Why the most tempting wrong answers are incorrect.`,
      `3. One key concept the student should remember.`,
      ``,
      `Use simple language, no jargon, and keep it under 150 words.`,
    ].join('\n');
  }
}



