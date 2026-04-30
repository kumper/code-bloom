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
      '<p>Control flow decides which instructions run next. In Java, <code>if</code>, <code>else</code>, and <code>else if</code> let your program choose a path based on a condition.</p>'
      + '<pre><code>int score = 72;\nif (score &gt;= 50) {\n    System.out.println("Pass");\n} else {\n    System.out.println("Fail");\n}</code></pre>'
      + '<p>The condition inside <code>if</code> must be <code>true</code> or <code>false</code>. Java also has <code>switch</code> for checking one value against several exact options, such as a menu choice or day number.</p>',
    bodyPL:
      '<p>Sterowanie przepływem decyduje, które instrukcje wykona program. W Javie <code>if</code>, <code>else</code> i <code>else if</code> pozwalają wybrać ścieżkę działania na podstawie warunku.</p>'
      + '<pre><code>int score = 72;\nif (score &gt;= 50) {\n    System.out.println("Pass");\n} else {\n    System.out.println("Fail");\n}</code></pre>'
      + '<p>Warunek w <code>if</code> musi dawać wynik <code>true</code> albo <code>false</code>. Java ma też <code>switch</code>, które przydaje się do sprawdzania jednej wartości względem kilku konkretnych opcji, na przykład numeru dnia lub wyboru z menu.</p>',
  },
  arithmetic: {
    titleEN: 'Arithmetic',
    titlePL: 'Arytmetyka',
    bodyEN:
      '<p>Arithmetic is how Java works with numbers. The basic operators are <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and <code>%</code>, which mean add, subtract, multiply, divide, and remainder.</p>'
      + '<pre><code>int a = 7;\nint b = 3;\n\nint sum = a + b;\nint quotient = a / b;\nint remainder = a % b;</code></pre>'
      + '<p>With <code>int</code> values, division keeps only the whole-number part, so <code>quotient</code> becomes <code>2</code>. The <code>%</code> operator gives the leftover value, so <code>remainder</code> becomes <code>1</code>.</p>',
    bodyPL:
      '<p>Arytmetyka to sposób, w jaki Java wykonuje działania na liczbach. Podstawowe operatory to <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> i <code>%</code>, czyli dodawanie, odejmowanie, mnożenie, dzielenie i reszta z dzielenia.</p>'
      + '<pre><code>int a = 7;\nint b = 3;\n\nint sum = a + b;\nint quotient = a / b;\nint remainder = a % b;</code></pre>'
      + '<p>Dla wartości typu <code>int</code> dzielenie zostawia tylko część całkowitą, więc <code>quotient</code> ma wartość <code>2</code>. Operator <code>%</code> zwraca resztę, dlatego <code>remainder</code> ma wartość <code>1</code>.</p>',
  },
  strings: {
    titleEN: 'Strings',
    titlePL: 'Napisy',
    bodyEN:
      '<p>A <code>String</code> stores text such as a name, sentence, or password. You create it with double quotes, can join text with <code>+</code>, and can check its size with <code>.length()</code>.</p>'
      + '<pre><code>String firstName = "Ada";\nString lastName = "Lovelace";\nString fullName = firstName + " " + lastName;\nint letters = fullName.length();\nboolean sameName = fullName.equals("Ada Lovelace");</code></pre>'
      + '<p>Use <code>.equals()</code> to compare text values in Java. That is safer than using <code>==</code>, which checks whether two references point to the same object.</p>',
    bodyPL:
      '<p><code>String</code> przechowuje tekst, na przykład imię, zdanie albo hasło. Tworzysz go w cudzysłowie, możesz łączyć napisy operatorem <code>+</code>, a ich długość sprawdzać przez <code>.length()</code>.</p>'
      + '<pre><code>String firstName = "Ada";\nString lastName = "Lovelace";\nString fullName = firstName + " " + lastName;\nint letters = fullName.length();\nboolean sameName = fullName.equals("Ada Lovelace");</code></pre>'
      + '<p>Do porównywania tekstów w Javie używaj <code>.equals()</code>. To bezpieczniejsze niż <code>==</code>, które sprawdza, czy dwie referencje wskazują na ten sam obiekt.</p>',
  },
  operators: {
    titleEN: 'Operators',
    titlePL: 'Operatory',
    bodyEN:
      '<p>Operators are symbols that tell Java to compare or combine values. Comparison operators like <code>==</code>, <code>!=</code>, <code>&lt;</code>, and <code>&gt;</code> check relationships between values.</p>'
      + '<pre><code>int points = 75;\nboolean passed = points &gt; 50;\nboolean perfect = points == 100;\nboolean needsReview = points != 100 &amp;&amp; points &lt; 50;\nboolean showMessage = passed || !perfect;</code></pre>'
      + '<p>Logical operators work with boolean results: <code>&amp;&amp;</code> means "and", <code>||</code> means "or", and <code>!</code> reverses a value. They are often used inside <code>if</code> conditions.</p>',
    bodyPL:
      '<p>Operatory to znaki, które mówią Javie, jak porównywać albo łączyć wartości. Operatory porównania, takie jak <code>==</code>, <code>!=</code>, <code>&lt;</code> i <code>&gt;</code>, sprawdzają relacje między danymi.</p>'
      + '<pre><code>int points = 75;\nboolean passed = points &gt; 50;\nboolean perfect = points == 100;\nboolean needsReview = points != 100 &amp;&amp; points &lt; 50;\nboolean showMessage = passed || !perfect;</code></pre>'
      + '<p>Operatory logiczne działają na wynikach typu boolean: <code>&amp;&amp;</code> oznacza "i", <code>||</code> oznacza "lub", a <code>!</code> odwraca wartość. Bardzo często używa się ich w warunkach <code>if</code>.</p>',
  },
  booleans: {
    titleEN: 'Booleans',
    titlePL: 'Wartości logiczne',
    bodyEN:
      '<p>A <code>boolean</code> stores only one of two values: <code>true</code> or <code>false</code>. It is useful for answers to yes/no questions, such as whether a user is logged in or whether a number is valid.</p>'
      + '<pre><code>boolean isLoggedIn = true;\nboolean isAdmin = false;\n\nif (isLoggedIn) {\n    System.out.println("Welcome");\n}</code></pre>'
      + '<p>Boolean variables are often used directly in <code>if</code>, <code>while</code>, and other conditions. Java checks whether the value is <code>true</code> before running that block of code.</p>',
    bodyPL:
      '<p><code>boolean</code> przechowuje tylko jedną z dwóch wartości: <code>true</code> albo <code>false</code>. Przydaje się do odpowiedzi na pytania tak/nie, na przykład czy użytkownik jest zalogowany albo czy liczba jest poprawna.</p>'
      + '<pre><code>boolean isLoggedIn = true;\nboolean isAdmin = false;\n\nif (isLoggedIn) {\n    System.out.println("Welcome");\n}</code></pre>'
      + '<p>Zmienne boolean często używa się bezpośrednio w <code>if</code>, <code>while</code> i innych warunkach. Java sprawdza, czy wartość jest <code>true</code>, zanim wykona dany blok kodu.</p>',
  },
  loops: {
    titleEN: 'Loops',
    titlePL: 'Pętle',
    bodyEN:
      '<p>Loops repeat a block of code, so you do not have to write the same instructions many times. In Java, a <code>for</code> loop is great for counting, and a <code>while</code> loop runs as long as a condition stays true.</p>'
      + '<pre><code>for (int i = 1; i &lt;= 5; i++) {\n    System.out.println(i);\n}</code></pre>'
      + '<p>A <code>for</code> loop usually puts the start value, condition, and update in one line. A <code>while</code> loop checks its condition before every repetition.</p>',
    bodyPL:
      '<p>Pętle powtarzają fragment kodu, więc nie musisz wiele razy pisać tych samych instrukcji. W Javie pętla <code>for</code> świetnie nadaje się do liczenia, a <code>while</code> działa tak długo, jak długo warunek jest prawdziwy.</p>'
      + '<pre><code>for (int i = 1; i &lt;= 5; i++) {\n    System.out.println(i);\n}</code></pre>'
      + '<p>Pętla <code>for</code> zwykle trzyma wartość startową, warunek i zmianę licznika w jednej linii. Pętla <code>while</code> sprawdza warunek przed każdym kolejnym obrotem.</p>',
  },
  arrays: {
    titleEN: 'Arrays',
    titlePL: 'Tablice',
    bodyEN:
      '<p>An array stores many values of the same type in one variable. You can create an array with brackets, and each element has its own position called an index.</p>'
      + '<pre><code>String[] colors = {"red", "green", "blue"};\nSystem.out.println(colors[0]);\nSystem.out.println(colors.length);</code></pre>'
      + '<p>Java array indexing starts at <code>0</code>, so <code>colors[0]</code> is the first item. The <code>.length</code> property tells you how many elements are inside the array.</p>',
    bodyPL:
      '<p>Tablica przechowuje wiele wartości tego samego typu w jednej zmiennej. Możesz utworzyć tablicę przy pomocy nawiasów, a każdy element ma swoją pozycję zwaną indeksem.</p>'
      + '<pre><code>String[] colors = {"red", "green", "blue"};\nSystem.out.println(colors[0]);\nSystem.out.println(colors.length);</code></pre>'
      + '<p>Indeksy w tablicy w Javie zaczynają się od <code>0</code>, więc <code>colors[0]</code> to pierwszy element. Właściwość <code>.length</code> mówi, ile elementów znajduje się w tablicy.</p>',
  },
  types: {
    titleEN: 'Types',
    titlePL: 'Typy danych',
    bodyEN:
      '<p>Every value in Java has a type. Primitive types such as <code>int</code>, <code>double</code>, <code>char</code>, and <code>boolean</code> store simple values, while <code>String</code> is used for text.</p>'
      + '<pre><code>int age = 25;\ndouble price = 9.99;\nchar grade = \'A\';\nboolean ready = true;\nString name = "Mila";</code></pre>'
      + '<p>Choosing the right type helps Java know what operations are allowed. For example, <code>int</code> is for whole numbers, <code>double</code> is for decimals, and <code>boolean</code> stores <code>true</code> or <code>false</code>.</p>',
    bodyPL:
      '<p>Każda wartość w Javie ma swój typ. Typy prymitywne, takie jak <code>int</code>, <code>double</code>, <code>char</code> i <code>boolean</code>, przechowują proste wartości, a <code>String</code> służy do tekstu.</p>'
      + '<pre><code>int age = 25;\ndouble price = 9.99;\nchar grade = \'A\';\nboolean ready = true;\nString name = "Mila";</code></pre>'
      + '<p>Dobranie właściwego typu pomaga Javie zrozumieć, jakie operacje są dozwolone. Na przykład <code>int</code> przechowuje liczby całkowite, <code>double</code> liczby z częścią dziesiętną, a <code>boolean</code> wartość <code>true</code> albo <code>false</code>.</p>',
  },
  methods: {
    titleEN: 'Methods',
    titlePL: 'Metody',
    bodyEN:
      '<p>A method is a named block of code that does one job. Its signature tells you the return type, the method name, and the parameters it needs.</p>'
      + '<pre><code>static int add(int a, int b) {\n    return a + b;\n}\n\nint result = add(2, 3);</code></pre>'
      + '<p>Here, <code>int</code> is the return type, <code>add</code> is the name, and <code>a</code> and <code>b</code> are parameters. You call the method by using its name and passing values in parentheses.</p>',
    bodyPL:
      '<p>Metoda to nazwany fragment kodu, który wykonuje jedno zadanie. Jej sygnatura mówi, jaki jest typ zwracany, jak nazywa się metoda i jakie parametry przyjmuje.</p>'
      + '<pre><code>static int add(int a, int b) {\n    return a + b;\n}\n\nint result = add(2, 3);</code></pre>'
      + '<p>Tutaj <code>int</code> to typ zwracany, <code>add</code> to nazwa, a <code>a</code> i <code>b</code> to parametry. Metodę wywołujesz przez użycie jej nazwy i przekazanie wartości w nawiasach.</p>',
  },
  oop: {
    titleEN: 'Object-Oriented Programming',
    titlePL: 'Programowanie obiektowe',
    bodyEN:
      '<p>Object-oriented programming in Java is based on classes and objects. A class is a blueprint, and an object is a real instance created from that blueprint.</p>'
      + '<pre><code>class Dog {\n    String name;\n\n    void bark() {\n        System.out.println(name + " says woof!");\n    }\n}\n\nDog dog = new Dog();\ndog.name = "Burek";\ndog.bark();</code></pre>'
      + '<p>In this example, <code>name</code> is a field that stores data, and <code>bark()</code> is a method that defines behavior. Java uses <code>new</code> to create an object from a class.</p>',
    bodyPL:
      '<p>Programowanie obiektowe w Javie opiera się na klasach i obiektach. Klasa jest wzorem, a obiekt to prawdziwa instancja utworzona na podstawie tego wzoru.</p>'
      + '<pre><code>class Dog {\n    String name;\n\n    void bark() {\n        System.out.println(name + " says woof!");\n    }\n}\n\nDog dog = new Dog();\ndog.name = "Burek";\ndog.bark();</code></pre>'
      + '<p>W tym przykładzie <code>name</code> jest polem przechowującym dane, a <code>bark()</code> jest metodą opisującą zachowanie. Java używa <code>new</code>, aby utworzyć obiekt na podstawie klasy.</p>',
  },
  inheritance: {
    titleEN: 'Inheritance',
    titlePL: 'Dziedziczenie',
    bodyEN:
      '<p>Inheritance lets a child class reuse code from a parent class. In Java, you connect them with the <code>extends</code> keyword, so the child gets fields and methods from the parent.</p>'
      + '<p>This is useful when classes share common behavior but also need their own extra features. A child class can use inherited methods and also add new ones.</p>'
      + '<pre><code>class Animal {\n  void makeSound() {\n    System.out.println("Some sound");\n  }\n}\n\nclass Dog extends Animal {\n  void wagTail() {\n    System.out.println("Tail wagging");\n  }\n}</code></pre>'
      + '<p>Here <code>Dog</code> is the child class and <code>Animal</code> is the parent class. <code>Dog</code> can use <code>makeSound()</code> without writing it again.</p>',
    bodyPL:
      '<p>Dziedziczenie pozwala klasie potomnej używać kodu z klasy nadrzędnej. W Javie łączy się je słowem kluczowym <code>extends</code>, dzięki czemu klasa potomna dostaje pola i metody rodzica.</p>'
      + '<p>To przydaje się wtedy, gdy kilka klas ma wspólne zachowanie, ale każda potrzebuje też czegoś własnego. Klasa potomna może korzystać z odziedziczonych metod i dodawać nowe.</p>'
      + '<pre><code>class Animal {\n  void makeSound() {\n    System.out.println("Some sound");\n  }\n}\n\nclass Dog extends Animal {\n  void wagTail() {\n    System.out.println("Tail wagging");\n  }\n}</code></pre>'
      + '<p>Tutaj <code>Dog</code> to klasa potomna, a <code>Animal</code> to klasa nadrzędna. <code>Dog</code> może używać <code>makeSound()</code> bez ponownego pisania tej metody.</p>',
  },
  interfaces: {
    titleEN: 'Interfaces',
    titlePL: 'Interfejsy',
    bodyEN:
      '<p>An interface is a contract that says what a class must do, but not how it does it. In Java, a class uses the <code>implements</code> keyword to follow that contract.</p>'
      + '<p>This helps different classes work in a common way. Each class can write its own version of the required methods while keeping the same method names.</p>'
      + '<pre><code>interface Drawable {\n  void draw();\n}\n\nclass Circle implements Drawable {\n  public void draw() {\n    System.out.println("Drawing a circle");\n  }\n}</code></pre>'
      + '<p>Here the <code>Drawable</code> interface requires a <code>draw()</code> method. The <code>Circle</code> class implements that method, so it matches the interface contract.</p>',
    bodyPL:
      '<p>Interfejs to kontrakt, który mówi, co klasa ma robić, ale nie opisuje, jak ma to robić. W Javie klasa używa słowa kluczowego <code>implements</code>, aby spełnić taki kontrakt.</p>'
      + '<p>Dzięki temu różne klasy mogą działać według wspólnych zasad. Każda klasa może napisać własną wersję wymaganych metod, ale zachowuje te same nazwy metod.</p>'
      + '<pre><code>interface Drawable {\n  void draw();\n}\n\nclass Circle implements Drawable {\n  public void draw() {\n    System.out.println("Drawing a circle");\n  }\n}</code></pre>'
      + '<p>Tutaj interfejs <code>Drawable</code> wymaga metody <code>draw()</code>. Klasa <code>Circle</code> implementuje tę metodę, więc spełnia kontrakt interfejsu.</p>',
  },
  exceptions: {
    titleEN: 'Exceptions',
    titlePL: 'Wyjątki',
    bodyEN:
      '<p>Exceptions are objects that describe errors during program execution. Java lets you handle them with <code>try</code>, <code>catch</code>, and <code>finally</code>, and you can also create problems on purpose with <code>throw</code>.</p>'
      + '<p>Checked exceptions usually must be handled or declared, while unchecked exceptions happen at runtime. Beginners often meet unchecked exceptions such as invalid number parsing.</p>'
      + '<pre><code>try {\n  int number = Integer.parseInt("abc");\n  System.out.println(number);\n} catch (NumberFormatException e) {\n  System.out.println("Invalid number");\n} finally {\n  System.out.println("Done");\n}</code></pre>'
      + '<p>In this example, <code>Integer.parseInt()</code> throws a <code>NumberFormatException</code>. The <code>catch</code> block handles the error, and <code>finally</code> runs at the end.</p>',
    bodyPL:
      '<p>Wyjątki to obiekty opisujące błędy pojawiające się podczas działania programu. Java pozwala obsługiwać je za pomocą <code>try</code>, <code>catch</code> i <code>finally</code>, a własny problem można też zgłosić słowem <code>throw</code>.</p>'
      + '<p>Wyjątki checked zwykle trzeba obsłużyć albo zadeklarować, a unchecked pojawiają się w czasie działania programu. Początkujący często spotykają wyjątki unchecked, na przykład przy niepoprawnym parsowaniu liczby.</p>'
      + '<pre><code>try {\n  int number = Integer.parseInt("abc");\n  System.out.println(number);\n} catch (NumberFormatException e) {\n  System.out.println("Invalid number");\n} finally {\n  System.out.println("Done");\n}</code></pre>'
      + '<p>W tym przykładzie <code>Integer.parseInt()</code> rzuca <code>NumberFormatException</code>. Blok <code>catch</code> obsługuje błąd, a <code>finally</code> wykonuje się na końcu.</p>',
  },
  collections: {
    titleEN: 'Collections',
    titlePL: 'Kolekcje',
    bodyEN:
      '<p>Collections are flexible alternatives to arrays when you want to store many values. Instead of a fixed size, many collection types can grow or change while the program runs.</p>'
      + '<p><code>ArrayList</code> is a dynamic list, and <code>HashMap</code> stores key-value pairs. These classes are part of the Java Collections Framework and are used very often in real programs.</p>'
      + '<pre><code>ArrayList&lt;String&gt; names = new ArrayList&lt;&gt;();\nnames.add("Ada");\nnames.add("Tom");\n\nHashMap&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();\nscores.put("Ada", 10);\nscores.put("Tom", 8);</code></pre>'
      + '<p>Use <code>ArrayList</code> when order matters and you want easy access by index. Use <code>HashMap</code> when you want to look up a value by a key, like a name and score.</p>',
    bodyPL:
      '<p>Kolekcje to elastyczna alternatywa dla tablic, gdy chcesz przechowywać wiele wartości. Zamiast stałego rozmiaru wiele typów kolekcji może rosnąć i zmieniać się podczas działania programu.</p>'
      + '<p><code>ArrayList</code> to dynamiczna lista, a <code>HashMap</code> przechowuje pary klucz-wartość. Te klasy należą do Java Collections Framework i są bardzo często używane w prawdziwych programach.</p>'
      + '<pre><code>ArrayList&lt;String&gt; names = new ArrayList&lt;&gt;();\nnames.add("Ada");\nnames.add("Tom");\n\nHashMap&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();\nscores.put("Ada", 10);\nscores.put("Tom", 8);</code></pre>'
      + '<p>Użyj <code>ArrayList</code>, gdy liczy się kolejność i wygodny dostęp po indeksie. Użyj <code>HashMap</code>, gdy chcesz znaleźć wartość po kluczu, na przykład imieniu i wyniku.</p>',
  },
};
