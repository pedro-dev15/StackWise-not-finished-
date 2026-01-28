# 🧠 StackWise  
### API Back-end orientada a arquitetura, regras de domínio e semântica HTTP

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-success)]()
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)]()
[![Architecture](https://img.shields.io/badge/Focus-Arquitetura%20de%20Software-important)]()

---

## Índice

- [Descrição](#descrição)
- [Objetivo do Projeto](#objetivo-do-projeto)
- [Conceitos Aplicados](#conceitos-aplicados)
- [Arquitetura](#arquitetura)
- [Regras do Domínio](#regras-do-domínio)
- [Contratos HTTP](#contratos-http)
- [Como Executar](#como-executar)
- [Colaboradores](#colaboradores)

---

## Descrição

**StackWise** é um projeto educacional de **back-end** desenvolvido em **TypeScript**, com foco em **arquitetura de software**, **organização de código**, **regras de domínio explícitas** e **uso correto do protocolo HTTP**.

O projeto simula uma **API real**, indo além de CRUDs simples, priorizando **decisões arquiteturais**, **separação de responsabilidades** e **previsibilidade do sistema**.

> ⚠️ Este projeto **não foca em front-end** e **não busca apenas funcionar**.  
O objetivo principal é **design correto, clareza e evolução sustentável**.

---

## Objetivo do Projeto

Treinar fundamentos reais de engenharia de software aplicada a back-end:

- Arquitetura em camadas
- Separação entre domínio, aplicação e infraestrutura
- Uso correto de métodos e status HTTP
- Centralização de regras de negócio
- Tratamento consistente de erros
- Código legível e escalável

StackWise **não busca atalhos** — busca **clareza e responsabilidade técnica**.

---

## Conceitos Aplicados

- Controllers finos e orientados a HTTP
- Use Cases como núcleo da lógica de negócio
- Validação explícita de entrada e regras
- Erros de domínio vs erros de infraestrutura
- Prisma como camada de persistência isolada
- Tipagem forte com TypeScript
- Código previsível e testável
- Separação clara de responsabilidades

---

## Arquitetura

A arquitetura segue um modelo em camadas bem definidas:

### 🌐 Controllers
Responsáveis por:
- Receber requisições HTTP
- Validar entrada básica
- Traduzir erros para status HTTP
- Orquestrar chamadas aos Use Cases

Não contêm regras de negócio.

---

### 🧠 Use Cases
Responsáveis por:
- Implementar regras de domínio
- Validar estados e transições
- Garantir consistência do sistema
- Decidir **o que pode ou não acontecer**

São o **coração do projeto**.

---

### 🗄️ Data Layer (Prisma)
Responsável por:
- Persistência de dados
- Comunicação com o banco
- Isolamento da infraestrutura

Não decide regras de negócio.

---

## Regras do Domínio

O sistema **NUNCA permite**:

- Operações sem autenticação válida
- Mudanças de estado inválidas
- Dados inconsistentes no banco
- Dependência direta entre controller e banco
- Regras de negócio espalhadas pela aplicação
- Respostas HTTP ambíguas

Qualquer violação de regra resulta em **erro explícito e previsível**.

---

## Contratos HTTP

A API segue princípios claros:

- Uso correto de métodos (`GET`, `POST`, `PATCH`, `DELETE`)
- Status HTTP coerentes (`200`, `201`, `204`, `400`, `401`, `403`, `404`)
- Mensagens de erro claras e padronizadas
- Nenhuma regra de domínio é decidida no controller

> HTTP é tratado como **contrato**, não detalhe de implementação.

---

## Como Executar

1. **Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd stackwise
```
2. **Instale as dependências:**
```bash
npm install
```
3. **Configure o ambiente**
```bash
cp .env.example .env
```

3. **Execute o projeto**
```bash
npm run dev
```
## Colaboradores
- **Pedro Da Cunha** – Desenvolvedor principal <br></br> [![Pedro Da Cunha](https://github.com/pedro-dev15.png?size=100)](https://github.com/pedro-dev15)
