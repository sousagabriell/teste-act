# teste-act-frontend

Sistema de gerenciamento de produtos construído com **Angular 20**, utilizando **Server-Side Rendering (SSR)** e **arquitetura em camadas** para garantir escalabilidade e manutenibilidade.

---

## 🏗️ Arquitetura do Projeto

Este projeto adota uma **arquitetura em camadas (Layered Architecture)** inspirada em **Domain-Driven Design (DDD)** e **Clean Architecture**, garantindo:

- **Separação de responsabilidades**
- **Baixo acoplamento**
- **Testabilidade**
- **Escalabilidade**

---

## 📁 Estrutura de Pastas

```text
src/app/
├── shared/
│   ├── client-service/
│   ├── language/
│   └── ui/
│       ├── navbar/
│       ├── footer/
│       ├── form-add/
│       └── modal/
│
└── teste-act/
    ├── abstraction/
    ├── domain/
    ├── infra/
    └── presentation/
```

---

## 🔄 Fluxo de Comunicação

```text
Presentation
↓
Facade
↓
API Service
↓
HTTP Client
↓
Backend / Mock
```

---

## 🚀 Como Executar

### Desenvolvimento

```bash
npm install
ng serve
```

Acesse: http://localhost:4200

### Mock Server

```bash
npx json-server --watch db.json
```

API: http://localhost:3000

---

## 🌐 Produção (SSR)

```bash
npm run build
npm run serve:ssr
```

SSR: http://localhost:4000

---

## 🧪 Testes

```bash
ng test
```

---

## 🛠️ Tecnologias

- Angular 20
- RxJS
- ngx-bootstrap
- json-server
- TypeScript + SCSS
- SSR com Express
