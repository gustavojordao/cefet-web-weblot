# cefet-web-weblot

Um conjunto de códigos ilustrativos de APIs do HTML5

## #comofaz?

Conforme o [enunciado][enunciado] diz, o trabalho é composto por uma (a) apresentação de seminário, mais a criação e entrega de um (b) projeto de código simples ilustrando cada API escolhida pelo grupo.

O projeto (b) deve ser entregue como um _Pull Request_ (veja [[1]][using-pull-requests] e [[2]][creating-pull-requests]) neste repositório. Ou seja, você deve fazer um _fork_ e, no **_branch_ cujo nome equivale ao ano e semestre atual**, você deve criar dentro de `/api` uma pasta com o nome da sua API de escolha (nome em minúsculo, notação de hífens - _e.g._, `/api/drag-and-drop/`) e colocar seu código lá.

Veja o projeto de exemplo que já está lá, sobre a API de _drag and drop_: [código fonte][drag-and-drop-code] e o [exemplo publicado][drag-and-drop-live]. Procure seguir a mesma ideia e formato.

### O que deve conter

Seu código deve conter uma ilustração simples, porém interessante, de uso da API escolhida. Opte por separar os arquivos do código fonte em pastas (_e.g._, `styles`, `scripts`, `images` etc.).

No diretório raiz do seu exemplo (_e.g._, `/api/drag-and-drop/`) deve haver um arquivo `index.html` com a página inicial (e talvez única), que será a porta de entrada do exemplo.

Além disso, crie um arquivo `REAMDE.md` (formato Markdown - veja [[3]][markdown] e [[4]][markdown-tutorial]) contendo pelo menos três seções:

1. API xyz
  - Breve descrição da API (uma linha)
  - **Uma _screenshot_ do seu exemplo rodando**
1. Links do Exemplo
  - **Link para seus _slides_ do seminário**
  - **Link para exemplo vivo** (formato: https://fegemo.github.io/cefet-web-weblot/apis/PASTA_DO_SEU_PROJETO/)
1. Créditos
  - **Indicação de quem são os autores**
  - Texto dando a devida atribuição aos eventuais recursos de terceiros usados

[enunciado]: https://github.com/fegemo/cefet-web/blob/master/assignments/seminar-html5/README.md#seminário---apis-do-html5
[using-pull-requests]: https://help.github.com/articles/using-pull-requests/
[creating-pull-requests]: https://help.github.com/articles/creating-a-pull-request/
[markdown]: https://daringfireball.net/projects/markdown/
[markdown-tutorial]: https://guides.github.com/features/mastering-markdown/
[drag-and-drop-code]: https://github.com/fegemo/cefet-web-weblot/tree/master/api/drag-and-drop/
[drag-and-drop-live]: https://fegemo.github.io/cefet-web-weblot/apis/drag-and-drop/
