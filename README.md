# Projeto de Microserviços

Este repositório contém uma aplicação composta por **três microserviços independentes**, cada um com responsabilidades distintas e organizados em pastas separadas.

## 📁 Estrutura do Projeto

- `establishmentservice/`
- `productservice/`
- `couponservice/`

Cada microserviço possui:

- Código-fonte isolado.
- Arquivo `README.md` com instruções específicas para rodar individualmente.
- Arquivo `.env` com variáveis de ambiente já configuradas.
- Documentação Swagger no endpoint `/v1/docs`.

---

## 🚀 Executando todos os serviços

Para iniciar todos os microserviços de uma vez usando Docker:

1. Dê permissão de execução ao script:

   ```bash
   chmod +x start-all.sh
   ```

2. Execute o script a partir da raiz do projeto:

   ```bash
   ./start-all.sh
   ```

Isso irá levantar todos os containers utilizando `docker-compose` e conectar os serviços via rede Docker compartilhada (`shared-network`).

---

## 🧪 Banco de Dados

- Existe um arquivo `seed.sql` na raiz do projeto que pode ser utilizado para popular os bancos com dados iniciais.
- Caso esteja rodando localmente ou precise resetar os dados, utilize esse script conforme necessário.

---

## 🔐 Variáveis de Ambiente

- Todas as variáveis de ambiente já estão devidamente configuradas nos arquivos `.env` de cada microserviço.
- É possível ajustá-las conforme o ambiente ou necessidade específica.

---

## 📬 APIs e Documentação

Cada microserviço possui uma documentação interativa acessível via Swagger:

```
http://localhost:<porta-do-serviço>/v1/docs
```

Substitua `<porta-do-serviço>` pela porta de cada microserviço conforme definido no `docker-compose.yml`.

---

## 🧪 Coleção Insomnia

- Uma **coleção Insomnia** está disponível no repositório.
- Ela contém exemplos de requisições para testar todos os endpoints dos microserviços.
- Basta importar o arquivo `.json` no Insomnia.

---

## 🛠️ Executando um serviço individualmente

Cada microserviço pode ser iniciado separadamente:

1. Acesse a pasta do serviço (ex: `cd microservice-1`).
2. Siga as instruções no `README.md` daquela pasta para rodar com Docker ou localmente.

---

## ✅ Requisitos

- Docker + Docker Compose
- Node.js (caso execute algum serviço localmente)
- pnpm (caso utilize fora do Docker)

---

Para qualquer dúvida ou problema, consulte os READMEs individuais ou a documentação inline de cada serviço.
