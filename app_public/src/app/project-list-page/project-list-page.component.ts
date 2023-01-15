import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.css']
})
export class ProjectListPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Projects',
      strapline: 'Applications I\'ve worked on '
    },
    sideBar: {
      main: 'My forays into coding began out of a need for a tool that I could use in my services business',
      sub: 'In August 2021 I created my first desktop application using Java and MySQL. In April 2022, I moved the application to the web using php and an apache web server. In August 2022, I rewrote the entire web application but this time using a much more formal structure including a rest api and a server-side application coded in Node and Express. In November 2022, I created my first single page application using Angular and Typescript. In December 2022, I started working on a framework that I could use to rapidly create web applications and used the framework to create a personal profile application. I am currently working with C# and the .NET framework with the aim of creating an application that brings together my knowledge of access control systems and software development.'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
