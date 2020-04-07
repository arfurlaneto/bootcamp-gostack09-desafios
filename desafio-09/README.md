## 🚀 Sobre o desafio

Durante esse desafio vamos construir o front-end da aplicação Gympoint que criamos o back-end durante os desafios dos módulos 02 e 03 de Node.js.

A versão web do projeto Gympoint representa a visão da academia, ou seja, todas funcionalidades presentes na versão web são para administradores. As funcionalidades para o aluno serão dispostas no aplicativo mobile.

### Novas funcionalidades

Antes de iniciar a parte web, **adicione as seguintes funcionalidades no back-end** da aplicação:

1. Adicione um campo boolean `true/false` na listagem de matrículas indicando se a matrícula está ativa ou não, ou seja, se a data de término é posterior à atual e a data de início inferior (utilize um campo `VIRTUAL`).

Por exemplo, no model de Matrícula, adicione um novo campo:
```js
active: {
  type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
    'start_date',
    'end_date',
  ]),
  get() {
    return (
      isBefore(this.get('start_date'), new Date()) &&
      isAfter(this.get('end_date'), new Date())
    );
  },
},
```

E na query:

```js
const registrations = await Registration.findAll({
  attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
});
```

2. Permita que a listagem de alunos (`/users`) seja filtrada por nome recebendo um Query Parameter `?q=Diego` e buscando no banco usuários com esse filtro (utilize o operador `like`). Caso o parâmetro não seja passado, retorne todos usuários;

### Informações importantes

1. Antes de deletar qualquer registro do banco crie uma verificação adicinal usando a função `confirm` do JavaScript;
2. Para formatação de datas utilize sempre a biblioteca `date-fns`;
3. Não realize formatações de valores dentro do `return ()` nos componentes React, opte por formatar os dados assim que recebidos da API;
4. No cadastro/edição de planos e matrículas os inputs com fundo cinza são calculados automaticamente com base na seleção dos outros valores;
5. No cadastro/edição de matrícula deve ser possível buscar o aluno pelo nome, utilize o método `async` da biblioteca [React Select](https://react-select.com/home#async). Os planos devem ser buscados da API assim que a página carregar e não devem possuir filtro.

### Opcionais

1. Adicione paginação no front-end e back-end para todas listagens;
2. Utilize máscaras para inputs numéricos de valores, peso e altura;

## 🎨 Layout

O layout do desafio está em anexo como um arquivo `.sketch`.

Caso esteja usando OS X / Windows você pode abrir esse arquivo com um software chamado [Zeplin](https://zeplin.io).

Caso esteja no Linux ou não vá usar o Zeplin existe uma pasta chamada `Gympoint WEB` junto com esse repositório, baixe-a e acesse o arquivo `index.html` para visualizar as telas da aplicação.
