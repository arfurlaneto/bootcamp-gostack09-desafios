import React, { Component } from 'react';

import Post from './Post';

class PostList extends Component {
    state = {
      posts: [
        {
          id: 1,
          author: {
            name: 'Júlio Alcantara',
            avatar: 'https://i.pravatar.cc/300?img=7',
          },
          date: '04 Jun 2019',
          content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
          comments: [
            {
              id: 1,
              author: {
                name: 'Diego Fernandes',
                avatar: 'https://i.pravatar.cc/300?img=8',
              },
              content: 'A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% o nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar do Discord! (Sério, me chamem mesmo, esse comentário é real).',
            },
          ],
        },
        {
          id: 2,
          author: {
            name: 'Gabriel Lisboa',
            avatar: 'https://i.pravatar.cc/300?img=11',
          },
          date: '04 Jun 2019',
          content: 'Fala galera, beleza?\n\nEstou fazendo o Bootcamp GoStack da Rocketseat e está sendo muito massa! Algúem mais aí fazendo, comenta na publicação para trocarmos uma ideia.',
          comments: [
            {
              id: 2,
              author: {
                name: 'Clara Lisboa',
                avatar: 'https://i.pravatar.cc/300?img=10',
              },
              content: 'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!',
            },
            {
              id: 3,
              author: {
                name: 'Cézar Toledo',
                avatar: 'https://i.pravatar.cc/300?img=15',
              },
              content: 'Que maaaaaasa! Estou pensando em me inscrever na próxima turma para ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!',
            },
          ],
        },
        {
          id: 3,
          author: {
            name: 'Renan Multiternos',
            avatar: 'https://i.pravatar.cc/300?img=17',
          },
          date: '04 Jun 2019',
          content: 'Galera, consegui minha primeira vaga! Tô saindo do estágio!',
          comments: [
            {
              id: 4,
              author: {
                name: 'Ana Arcoverde',
                avatar: 'https://i.pravatar.cc/300?img=23',
              },
              content: 'Termine as issues do portal antes de sair daqui!',
            },
            {
              id: 5,
              author: {
                name: 'Victor Bastos',
                avatar: 'https://i.pravatar.cc/300?img=33',
              },
              content: 'Estou aguardando o bolo de despedida!',
            },
          ],
        },
        {
          id: 6,
          author: {
            name: 'Júlio Alcantara',
            avatar: 'https://i.pravatar.cc/300?img=7',
          },
          date: '04 Jun 2019',
          content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
          comments: [
            {
              id: 6,
              author: {
                name: 'Diego Fernandes',
                avatar: 'https://i.pravatar.cc/300?img=8',
              },
              content: 'A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% o nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar do Discord! (Sério, me chamem mesmo, esse comentário é real).',
            },
          ],
        },
        {
          id: 7,
          author: {
            name: 'Gabriel Lisboa',
            avatar: 'https://i.pravatar.cc/300?img=11',
          },
          date: '04 Jun 2019',
          content: 'Fala galera, beleza?\n\nEstou fazendo o Bootcamp GoStack da Rocketseat e está sendo muito massa! Algúem mais aí fazendo, comenta na publicação para trocarmos uma ideia.',
          comments: [
            {
              id: 7,
              author: {
                name: 'Clara Lisboa',
                avatar: 'https://i.pravatar.cc/300?img=10',
              },
              content: 'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!',
            },
            {
              id: 8,
              author: {
                name: 'Cézar Toledo',
                avatar: 'https://i.pravatar.cc/300?img=15',
              },
              content: 'Que maaaaaasa! Estou pensando em me inscrever na próxima turma para ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!',
            },
          ],
        },
        {
          id: 8,
          author: {
            name: 'Renan Multiternos',
            avatar: 'https://i.pravatar.cc/300?img=17',
          },
          date: '04 Jun 2019',
          content: 'Galera, consegui minha primeira vaga! Tô saindo do estágio!',
          comments: [
            {
              id: 9,
              author: {
                name: 'Ana Arcoverde',
                avatar: 'https://i.pravatar.cc/300?img=23',
              },
              content: 'Termine as issues do portal antes de sair daqui!',
            },
            {
              id: 10,
              author: {
                name: 'Victor Bastos',
                avatar: 'https://i.pravatar.cc/300?img=33',
              },
              content: 'Estou aguardando o bolo de despedida!',
            },
          ],
        },
      ],
    }

    render() {
      return (
        <div className="postList">
          {this.state.posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
      );
    }
}

export default PostList;
