# Desafio Pokédex - Paulo Éder Medeiros Cardoso

![Pokédex Demo](GifTeste.gif)

*Última atualização: 18 de Junho de 2025*

## 📝 Descrição do Projeto

Aplicativo Pokédex desenvolvido com Ionic e Angular como parte de um desafio técnico. O app consome a [PokeAPI](https://pokeapi.co/) para listar Pokémons, exibir seus detalhes completos e permitir que sejam marcados como favoritos, com os dados salvos localmente no dispositivo.

## 🧰 Tecnologias Utilizadas

![Ionic](https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![PokeAPI](https://img.shields.io/badge/API-PokeAPI-FFCB05?style=for-the-badge&logo=pokemon&logoColor=black)

## 🚀 Abordagem Técnica

Adotei uma arquitetura moderna com **Componentes Standalone** do Angular para melhor performance e organização. A lógica de negócio foi abstraída em **Serviços** (`PokemonService`, `FavoriteService`) e disponibilizada via **Injeção de Dependência**, mantendo os componentes limpos e focados na UI. 

Para a persistência de dados no dispositivo, utilizei o **Ionic Storage**, garantindo que os favoritos sejam salvos localmente. A reatividade e as chamadas assíncronas à API são gerenciadas com **RxJS Observables**. A interface foi construída com componentes Ionic para garantir a responsividade e a paginação da lista é feita com `ion-infinite-scroll` para uma melhor experiência de usuário.

## ⚙️ Como Executar

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/paulo-cardoso71/pokeapp-ionic-angular.git](https://github.com/paulo-cardoso71/pokeapp-ionic-angular.git)
    ```
2.  Navegue até a pasta do projeto e instale as dependências:
    ```bash
    cd meu-pokedex
    npm install
    ```
3.  Execute o projeto em modo de desenvolvimento:
    ```bash
    ionic serve
    ```

---
## 💡 Problemas Conhecidos

* **Propagação de Evento:** Ao clicar no ícone de favoritar na lista principal, a ação de favoritar funciona corretamente, mas a navegação para a página de detalhes também é acionada. Este é um problemade propagação de evento que, apesar das tentativas de solução via `event.stopPropagation()`, persiste devido a algum comportamento específico do ambiente de desenvolvimento. A funcionalidade principal de favoritar na tela de detalhes funciona perfeitamente.

## 👨‍💻 Autor

**Paulo Éder Medeiros Cardoso**  
📧 pauloeder7@hotmail.com  
🌐 [linkedin.com/in/paulo-cardoso71](https://linkedin.com/in/paulo-cardoso71)  
🐱 [github.com/paulo-cardoso71](https://github.com/paulo-cardoso71)

---