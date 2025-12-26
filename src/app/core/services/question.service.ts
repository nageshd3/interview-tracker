import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    private questions: Question[] = [
        {
            id: 1,
            category: 'Angular',
            question: 'What is Angular?',
            answer: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.'
        },
        {
            id: 2,
            category: 'TypeScript',
            question: 'What are TypeScript decorators?',
            answer: 'Decorators are a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.'
        },
        {
            id: 3,
            category: 'JavaScript',
            question: 'What is a closure in JavaScript?',
            answer: 'A closure is a feature where an inner function has access to the outer (enclosing) function’s variables.'
        },
        {
            id: 4,
            category: 'HTML',
            question: 'What is the DOM?',
            answer: 'The Document Object Model (DOM) is a programming interface for web documents that represents the page so that programs can change the document structure, style, and content.'
        },
        {
            id: 5,
            category: 'CSS',
            question: 'What is the box model in CSS?',
            answer: 'The CSS box model describes the rectangular boxes generated for elements in the document tree and consists of margins, borders, padding, and the actual content.'
        },
        {
            id: 6,
            category: 'HTML',
            question: 'What are semantic HTML elements?',
            answer: 'Semantic HTML elements clearly describe their meaning in a human- and machine-readable way, such as <article>, <section>, and <header>.'
        },
        {
            id: 7,
            category: 'HTTP',
            question: 'What is the difference between HTTP and HTTPS?',
            answer: 'HTTP is the protocol used for transmitting data over the web, while HTTPS is the secure version of HTTP that uses encryption (SSL/TLS) to protect data during transmission.'
        },
        {
            id: 8,
            category: 'APIs',
            question: 'What is a RESTful API?',
            answer: 'A RESTful API is an application programming interface that adheres to the principles of Representational State Transfer (REST) and allows for interaction with RESTful web services.'
        },
        {
            id: 9,
            category: 'Version Control',
            question: 'What is Git?',
            answer: 'Git is a distributed version control system that allows multiple developers to work on a project simultaneously, tracking changes and managing code history.'
        },
        {
            id: 10,
            category: 'Testing',
            question: 'What is unit testing?',
            answer: 'Unit testing is a software testing technique where individual units or components of a software are tested in isolation to ensure they work as intended.'
        },
        {
            id: 11,
            category: 'Angular',
            question: 'What is lazy loading?',
            answer: 'Lazy loading is a design pattern that defers the loading of non-essential resources at page load time, instead loading them only when they are needed.'
        },
        {
            id: 12,
            category: 'Security',
            question: 'What is Cross-Site Scripting (XSS)?',
            answer: 'Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.'
        },
        {
            id: 13,
            category: 'Angular',
            question: 'What is change detection?',
            answer: 'Change detection updates the view when the model changes.'
        },
        {
            id: 14,
            category: 'DevOps',
            question: 'What is Continuous Integration (CI)?',
            answer: 'Continuous Integration (CI) is a development practice where developers frequently integrate code into a shared repository, followed by automated builds and tests.'
        },
        {
            id: 15,
            category: 'Angular',
            question: 'Why use standalone components?',
            answer: 'Standalone components reduce NgModule boilerplate, improve tree-shaking, and align with Angular’s future direction.'
        },
        {
            id: 16,
            category: 'Angular',
            question: 'How do you manage state in Angular applications?',
            answer: 'State can be managed using services, RxJS, or state management libraries like NgRx or Akita.'
        },
        {
            id: 17,
            category: 'Angular',
            question: 'What are Angular lifecycle hooks?',
            answer: 'Lifecycle hooks are methods that allow you to tap into key events in a component’s lifecycle, such as ngOnInit, ngOnChanges, and ngOnDestroy.'
        },
        {
            id: 18,
            category: 'Angular',
            question: 'What is Dependency Injection in Angular?',
            answer: 'Dependency Injection (DI) is a design pattern used to implement IoC, allowing a class to receive its dependencies from external sources rather than creating them itself.'
        },
        {
            id: 19,
            category: 'Angular',
            question: 'How is routing handled in Angular 19?',
            answer: 'Routing is configured in app.routes.ts and provided via provideRouter() during bootstrap.'
        },
        {
            id: 20,
            category: 'Angular',
            question: 'What are Angular directives?',
            answer: 'Directives are classes that add additional behavior to elements in your Angular applications, such as structural directives (e.g., *ngIf, *ngFor) and attribute directives (e.g., ngClass, ngStyle).'
        },
        {
            id: 21,
            category: 'DevOps',
            question: 'What is Continuous Deployment (CD)?',
            answer: 'Continuous Deployment (CD) is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate autonomous deployment to a production environment.'
        },
        {
            id: 22,
            category: 'Angular',
            question: 'Difference between template-driven and reactive forms?',
            answer: 'Template-driven forms are easier for simple forms, while reactive forms provide more control and scalability for complex forms.'
        },
        {
            id: 23,
            category: 'Angular',
            question: 'What is Angular Material?',
            answer: 'Angular Material is a UI component library for Angular applications that implements Google’s Material Design specifications.'
        },
        {
            id: 24,
            category: 'Angular',
            question: 'Why use Angular Material?',
            answer: 'It provides accessible, consistent UI components and follows Material Design best practices, reducing custom CSS.'
        },
        {
            id: 25,
            category: 'RxJS',
            question: 'What is an Observable?',
            answer: 'An Observable represents a stream of values over time.'
            
        },
        {
            id: 26,
            category: 'RxJS',
            question: 'What is a Subject?',
            answer: 'A Subject is a special type of Observable that allows multicasting to multiple observers.'
        },
        {
            id: 27,
            category: 'RxJS',
            question: 'What is a BehaviorSubject?',
            answer: 'A BehaviorSubject is a type of Subject that holds the current value and emits it to new subscribers.'
        },
        {
            id: 28,
            category: 'RxJS',
            question: 'What are operators in RxJS?',
            answer: 'Operators are functions that enable functional programming with Observables by allowing you to transform, filter, and combine streams.'
        },
        {
            id: 29,
            category: 'RxJS',
            question: 'What is the difference between Promise and Observable?',
            answer: 'A Promise handles a single asynchronous event, while an Observable can handle multiple events over time.'
        },
        {
            id: 30,
            category: 'RxJS',
            question: 'What is the purpose of the pipe() method in RxJS?',
            answer: 'The pipe() method is used to combine multiple operators into a single function that can be applied to an Observable.'
        }
    ];

    getAll() {
        return [...this.questions];
    }

    getById(id: number) {
        return this.questions.find(q => q.id === id);
    }

    getCategories(): string[] {
        return [...new Set(this.questions.map(q => q.category))];
    }
}