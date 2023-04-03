<img src='blob:https://vercel.com/1b925117-d791-4c61-b764-0582d76cd321' alt='Banner'/>





### Tópicos
- [Rick And Morty](#rd95-RaM)
      - [Status:](#status)
    - [Descrição do Projeto:](#descrição-do-projeto)
    - [Funcionalidades:](#funcionalidades)
    - [Acesso ao Projeto:](#acesso-ao-projeto)
    - [Tecnologias utilizadas:](#tecnologias-utilizadas)

# Rick And Morty - Layout


#### Status:
![Badge](https://img.shields.io/static/v1?label=Desafio&message=Conclu%C3%ADdo&color=%3CCOLOR%3E)

![Badge](https://img.shields.io/static/v1?label=Projeto&message=Desenvolvimento&color=yellow)

### Descrição do Projeto:

**Basicamente um cátalogo com algumas cartas apresentando os personagens.**



### Funcionalidades:

* Apresentação dos personagens com todas informações disponíveis;
* Paginação funcionando com os filtros também;
* Busca personalizada com todos os filtros disponíveis;
* Uso do [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) do NextJs evitando consultas repetidas e "desnecessárias" no banco de dados. 

### Estrutura: 
  
  ** Pastas: 
  *** Src/layout: São partes essênciais para o projeto e que estarão presentes em todas as páginas. O arquivo layout é um componente         que contém o Header e Footer. Além de receber um children que é para receber qualquer componente e dessa forma definir o layout         de todas as páginas. O mesmo é usado no ```_app.tsx``` que é o arquivo principal para renderização do Next de forma geral;
  
  *** Src/components: Componentes que são e podem ser reutilizados em diversas partes do projeto.
  *** Src/utils: Qualquer coisa que eu não saiba onde colocar.
  *** Src/types: Types e Interfaces do Typescript.
  *** Src/reduxState ou redux: Tudo relacionado ao Redux.
  *** Src/styles: Css.
  *** Src/api: Tudo relacionado a requisições.
  
### Páginas: 
  ** O layout consiste em três páginas: Home, Favoritos e do Personagem específico selecinonado.
  ** Há um "Layout Component" chamado ***HeroContent que é utilizado na Home e Favoritos. 
  ** Esse ***HeroContent possui os personagens que serão mostrados e com isso ele renderiza os Cards passando essas informações.
  ** O funcionamento é mesmo para as 2 páginas onde ele é utilizado.
  ** No momento, optei por salva as informações completa do personagem favoritado. Poderia pegar somente o ID e fazer uma requisição        com ele, mas eu priorizo a menor quantidade de requisições. Sempre que possíve, claro.


### Acesso ao Projeto:

[🔗 Rick And Morty](rd95-rick-morty-api.vercel.app)


### Como executar

* Clone o projeto: ``` git clone https://github.com/RafaDev95/rickyAndMortyApi-nextjs-layout.git ```

* Após clonado ```yarn``` ou ```npm install``` para baixar as dependências necessárias;
* E por fim, use o comando ```yarn dev``` para iniciar o projeto. 

### Tecnologias utilizadas:

* [NextJS](https://nextjs.org/)
* [Material Ui](https://mui.com/)
* [Redux ToolKit](https://redux-toolkit.js.org/usage/usage-with-typescript)
* [React Hot Toast](https://react-hot-toast.com/)
* [React Query](https://tanstack.com/query/v3/)
* [MUI Icons](https://mui.com/material-ui/material-icons/)
* [TypeScript](https://www.typescriptlang.org/)


### Considerações
* Sempre busco deixar o código mais "claro" possível para evitar comentários. Exceto em alguns casos onde a lógica é meia complexa ou algo do tipo.
* Decidir usar o Material UI com ```sx props``` dessa vez, mas em outros projetos já usei com ```makeStyles``` onde basicamente é um styled components. Dessa forma com ```sx props``` o componente em si fica um pouco mais "sujo" devido ao css escrito diretamente nele mas de maneira geral, o projeto em fica mais compacto e limpo. Bem mais agradável. 
* Nunca tinha usado React Query. Gostei bastante e confesso que não aproveitei tudo que ele oferece, mas o farei em outros projetos.
* Optei por usar ReduxToolkit porque pretendo adicionar mais coisas nesse layout. A escalabilidade do RTK é muito boa.
