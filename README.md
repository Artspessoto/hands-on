# HandsOn <img src="https://github.com/user-attachments/assets/80c730ba-f010-4cbf-b5e5-ef130e13a084" width="50" />
HandsOn é uma API que conecta voluntários, doadores e líderes comunitários em iniciativas sociais, facilitando a arrecadação de alimentos, roupas e apoio educacional para pessoas em situação de necessidade.

### Requisitos funcionais

#### Doações

- [ ]  O doador deve poder criar uma conta para participar da plataforma.
- [ ]  O doador deve poder listar campanhas de arrecadação em andamento.
- [ ]  O doador deve poder filtrar campanhas por:
    - Localidade (cidade ou bairro).
    - Tipo de campanha (ex.: alimentos, roupas, livros).
- [ ]  O doador deve poder doar itens físicos, especificando:
    - Tipo do item (ex.: cesta básica, roupas).
    - Quantidade ou descrição detalhada.
- [ ]  O doador deve poder doar dinheiro via integração com APIs de pagamento (ex.: Stripe, PayPal).

#### Campanhas e eventos

- [ ]  Um líder comunitário deve poder criar uma conta para gerenciar campanhas.
- [ ]  Um líder comunitário deve poder criar campanhas de arrecadação, especificando:
    - Tipo de campanha (alimentos, roupas, livros).
    - Data de início e término.
    - Meta da campanha (ex.: 100 cestas básicas).
    - Local de entrega dos itens arrecadados.
- [ ]  Um líder comunitário deve poder criar eventos de voluntariado vinculados a campanhas.
- [ ]  O líder comunitário deve poder visualizar o progresso das doações recebidas.

#### Voluntariado

- [ ]  O voluntário deve poder criar uma conta para participar de eventos.
- [ ]  O voluntário deve poder listar eventos de voluntariado disponíveis.
- [ ]  O voluntário deve poder filtrar eventos por localidade e tipo de atividade.
- [ ]  O voluntário deve poder se inscrever em eventos de voluntariado.

#### Notificações e relatórios

- [ ]  O sistema deve enviar notificações para:
    - Lembretes de eventos de voluntariado.
    - Confirmações de doações realizadas.
    - Campanhas com mais de 70% da meta atingida.
- [ ]  O sistema deve permitir que líderes exportem relatórios de doações e eventos em formato CSV ou PDF.

---

### Regras de negócio

#### Doações

- [ ]  Todas as campanhas devem estar associadas a um líder comunitário.
- [ ]  Apenas líderes comunitários cadastrados podem criar campanhas e eventos.
- [ ]  Itens doados só devem ser contabilizados após confirmação do líder.

#### Voluntariado

- [ ]  Um evento de voluntariado deve estar obrigatoriamente vinculado a uma campanha.
- [ ]  Voluntários só podem se inscrever em eventos que ainda não atingiram o limite de participantes.

#### Segurança e autenticação

- [ ]  Apenas usuários logados podem acessar funcionalidades específicas (criar campanhas, doar, ou se inscrever em eventos).
- [ ]  O sistema deve usar autenticação JWT com suporte a 2FA para líderes comunitários.
- [ ]  Dados sensíveis (ex.: endereços e números de telefone) devem ser criptografados no banco de dados.
- [ ]  Caso uma campanha seja criada de um IP desconhecido, o sistema deve notificar o líder comunitário associado.
