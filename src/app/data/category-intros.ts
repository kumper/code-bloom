export interface CategoryIntro {
  titleEN: string;
  titlePL: string;
  bodyEN: string;
  bodyPL: string;
}

export const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  'control-flow': {
    titleEN: 'Control Flow',
    titlePL: 'Sterowanie przepływem',
    bodyEN:
      'Control flow decides which part of your program runs next. In Java, tools like if, else, and switch help your code react to different situations step by step.',
    bodyPL:
      'Sterowanie przepływem decyduje o tym, która część programu wykona się jako następna. W Javie służą do tego między innymi if, else i switch, dzięki którym kod może reagować na różne sytuacje krok po kroku.',
  },
  arithmetic: {
    titleEN: 'Arithmetic',
    titlePL: 'Arytmetyka',
    bodyEN:
      'Arithmetic is how Java works with numbers. You can add, subtract, multiply, and divide values to solve simple problems and build more useful programs.',
    bodyPL:
      'Arytmetyka to po prostu działania na liczbach w Javie. Możesz dodawać, odejmować, mnożyć i dzielić wartości, żeby rozwiązywać proste zadania i tworzyć coraz praktyczniejsze programy.',
  },
  strings: {
    titleEN: 'Strings',
    titlePL: 'Napisy',
    bodyEN:
      'A string is a piece of text, like a name or a message shown on the screen. In Java, strings let you store, compare, and join text so your program can work with words and sentences.',
    bodyPL:
      'String, czyli napis, to fragment tekstu, na przykład imię albo komunikat wyświetlany na ekranie. W Javie napisy pozwalają przechowywać, porównywać i łączyć tekst, więc program może pracować ze słowami i zdaniami.',
  },
  operators: {
    titleEN: 'Operators',
    titlePL: 'Operatory',
    bodyEN:
      'Operators are special symbols that tell Java to do something with values. For example, they can compare two numbers, combine results, or change a value in a short and clear way.',
    bodyPL:
      'Operatory to specjalne znaki, które mówią Javie, co ma zrobić z wartościami. Dzięki nim można na przykład porównać dwie liczby, połączyć wyniki albo krótko i czytelnie zmienić wartość.',
  },
  booleans: {
    titleEN: 'Booleans',
    titlePL: 'Wartości logiczne',
    bodyEN:
      'A boolean can only be true or false. This simple idea is very important because it helps Java make decisions, check conditions, and control what should happen next.',
    bodyPL:
      'Wartość logiczna może być tylko true albo false, czyli prawda albo fałsz. To bardzo ważna część programowania, bo dzięki niej Java potrafi sprawdzać warunki, podejmować decyzje i sterować dalszym działaniem programu.',
  },
  loops: {
    titleEN: 'Loops',
    titlePL: 'Pętle',
    bodyEN:
      'Loops repeat the same block of code without making you write it many times. In Java, for and while are useful when you want to count, go through data, or repeat an action until something changes.',
    bodyPL:
      'Pętle powtarzają ten sam fragment kodu, więc nie musisz pisać go wiele razy. W Javie for i while przydają się wtedy, gdy chcesz liczyć, przechodzić po danych albo wykonywać coś aż do spełnienia warunku.',
  },
  arrays: {
    titleEN: 'Arrays',
    titlePL: 'Tablice',
    bodyEN:
      'An array stores many values of the same kind in one place. It is helpful when you want to keep a list of numbers, names, or other data and access each item by its position.',
    bodyPL:
      'Tablica przechowuje wiele wartości tego samego typu w jednym miejscu. To wygodne rozwiązanie, gdy chcesz trzymać listę liczb, imion albo innych danych i odwoływać się do każdego elementu po jego pozycji.',
  },
  types: {
    titleEN: 'Types',
    titlePL: 'Typy danych',
    bodyEN:
      'A type tells Java what kind of data a value is, such as a number, text, or true and false. Types help the language catch mistakes early and make your code easier to understand.',
    bodyPL:
      'Typ danych mówi Javie, z jakim rodzajem informacji ma do czynienia, na przykład z liczbą, tekstem albo wartością true lub false. Dzięki typom język może szybciej wykrywać błędy, a kod staje się bardziej zrozumiały.',
  },
  methods: {
    titleEN: 'Methods',
    titlePL: 'Metody',
    bodyEN:
      'A method is a named block of code that does one task. Methods help you reuse code, keep programs organized, and break big problems into smaller steps that are easier to manage.',
    bodyPL:
      'Metoda to nazwany fragment kodu, który wykonuje jedno zadanie. Metody pomagają używać tego samego kodu wiele razy, porządkować program i dzielić większy problem na mniejsze, prostsze kroki.',
  },
  oop: {
    titleEN: 'Object-Oriented Programming',
    titlePL: 'Programowanie obiektowe',
    bodyEN:
      'Object-oriented programming is a way of organizing code around objects that represent things or ideas. In Java, this makes it easier to group data with the actions that belong to it and build larger programs in a clean way.',
    bodyPL:
      'Programowanie obiektowe to sposób tworzenia kodu wokół obiektów, które reprezentują rzeczy albo pojęcia. W Javie dzięki temu łatwiej połączyć dane z działaniami, które ich dotyczą, i budować większe programy w uporządkowany sposób.',
  },
  inheritance: {
    titleEN: 'Inheritance',
    titlePL: 'Dziedziczenie',
    bodyEN:
      'Inheritance lets one class build on another class instead of starting from zero. This helps you reuse shared features and create more specific versions without repeating the same code everywhere.',
    bodyPL:
      'Dziedziczenie pozwala jednej klasie oprzeć się na innej zamiast zaczynać wszystko od zera. Dzięki temu można używać wspólnych cech ponownie i tworzyć bardziej szczegółowe wersje bez ciągłego powtarzania tego samego kodu.',
  },
  interfaces: {
    titleEN: 'Interfaces',
    titlePL: 'Interfejsy',
    bodyEN:
      'An interface is a simple agreement about what a class should be able to do. It helps different classes follow the same rules, even when they work in different ways inside.',
    bodyPL:
      'Interfejs to prosta umowa określająca, co dana klasa powinna umieć zrobić. Dzięki temu różne klasy mogą działać według tych samych zasad, nawet jeśli wewnątrz są napisane inaczej.',
  },
  exceptions: {
    titleEN: 'Exceptions',
    titlePL: 'Wyjątki',
    bodyEN:
      'Exceptions are Java\'s way of handling problems that happen while a program is running. They let you notice errors, respond safely, and stop small issues from crashing everything without explanation.',
    bodyPL:
      'Wyjątki to sposób Javy na radzenie sobie z problemami, które pojawiają się podczas działania programu. Pozwalają zauważyć błąd, zareagować bezpiecznie i nie dopuścić do tego, by drobny problem zakończył wszystko bez żadnego wyjaśnienia.',
  },
  collections: {
    titleEN: 'Collections',
    titlePL: 'Kolekcje',
    bodyEN:
      'Collections are ready-made tools for storing groups of data, such as lists or sets. They are more flexible than basic arrays and make it easier to add, remove, and search for items.',
    bodyPL:
      'Kolekcje to gotowe narzędzia do przechowywania grup danych, na przykład list albo zbiorów. Są bardziej elastyczne niż zwykłe tablice i ułatwiają dodawanie, usuwanie oraz wyszukiwanie elementów.',
  },
};
