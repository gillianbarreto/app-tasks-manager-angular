# APP - Task Manager

## Description

Application to update a list of tasks. Once logged in, the user can add, modify or delete tasks and can also mark them as Completed.

## Configuration

### Prerequisites

node >= 14.19.0

### Install dependencies

```bash
npm install
```

### Usage

```bash
npm start
```

## Tech stacks

This project was initially:

- Generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.
- Styling with [Bootstrap](https://getbootstrap.com/) and [Bootstrap Icons](https://icons.getbootstrap.com/)
- Simulated RESTful server to update task list [Json Server](https://github.com/devXter/mock-server)

Later,

- [Angular 15.0.3 was migrated to 16.2.16](https://angular.dev/update-guide?v=15.0-16.0&l=1)
- [Components was migrated to standalone](https://www.youtube.com/watch?v=9zPzWswjk9I&list=PLn64dwBe2-T31bYSsUSbZ8LshaMgVcE9p) and modules were removed of application.
- [Angular 16.2.16 was migrated to 17.3.12](https://angular.dev/update-guide?v=16.0-17.0&l=1) and new template syntax was applied.
- [Angular 17.3.12 was migrated to 18.2.13](https://angular.dev/update-guide?v=17.0-18.0&l=1)

## Building

Testing of application builds (@angular-devkit/build-angular)

### ng serve:

- browser: 1.624 sec / 3.57MB
- browser-esbuild: 1.563 sec / 562.86kB
- application: 1.592 sec / 562.86kB

### ng build:

- browser: 6.530 sec / 725.46kB
- browser-esbuild: 3.026 sec / 702.60kB
- application: 2.907 sec / 702.60kB
