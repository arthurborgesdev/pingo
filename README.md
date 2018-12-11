# Pingo!

## Pra que serve?

É um serviço para geolocalizar coisas.


## Como funciona?

Após se registrar e fazer o login, o usuário marcará pinos (pingos!) no mapa, indicando onde quer armazenar o registro de seus itens. Assim, os itens ficarão salvos nas localidades marcadas e poderão ser visualizados toda vez que o usuário entrar no sistema.


## Arquivos principais e suas funções

**/app.js**

Contém os requires das bibliotecas, inicialização do banco de dados, das sessions, inicialização de middlewares, das engines de renderização, do middleware de autenticação e chamada das rotas utilizadas. Contém também a inicialização do servidor.

**/api/routes/route.js**

Contém as rotas do programa, indicando os caminhos que a aplicação vai tomar de acordo com a requisição HTTP e seus métodos.

**/api/middlewares/**

Contém os middlewares de recaptcha, passport e loggedIn. Verificam se o captcha foi marcado corretamente, se a autenticação foi executada e se o usuário está logado, respectivamente.

**/api/models/**

Folder para armazenar os modelos em mongoose, a serem usados pela aplicação.

**/api/controllers/**

Folder para armazenar os controladores, responsável por chamar o middleware de captcha, tratar as entradas, e delegar o restante da ação para os services.

**/api/services/**

Folder para armazenar os serviços, que são arquivos responsáveis por chamar os validadores e fazer as consultas/gravações no banco de dados. Ao fim dessa interação, o controle é passado de volta aos controllers que por sua vez interagem com as views.

**/views/**

Folder para armazenar as views, que são renderizadas pelos controladores (transformadas em páginas html com dados) e passadas ao usuário para visualização/interação.


## Coisas a fazer

~~ * Arrumar o sessions, que funciona em localhost mas não funciona no heroku. Esperado: ao logar, o usuário deve ser redirecionado para /map ~~
* Salvar as sessions no Redis, que não está funcionando.
* Arrumar o map, dando a possibilidade do usuário inserir pinos (pingos!) no mapa, e poder inserir o nome de cada pingo. Os nomes deverão ser gravados no banco.

