// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { friendlyFetch } from './friendly-fetch.js';
import { AudioPlayer } from './music.js';
import { romano10 } from './roman.js';

const API_ENDPOINT = 'https://swapi.dev/api';

const audioUrl = 'audio/tema-sw.mp3';
const coverImageUrl = 'imgs/logo.svg';
const title = 'Intro';
const artist = 'John Williams';
const parentEl = document.body;

const listaFilmeEl = document.querySelector('#filmes ul');
const introducaoEl = document.querySelector('pre.introducao');

new AudioPlayer().start({ audioUrl, coverImageUrl, title, artist }, parentEl);

friendlyFetch(API_ENDPOINT + '/films').then(paginaFilme => {
    if (paginaFilme.next) {
        console.error('Não foram retornados todos os resultados, e a paginação não foi implementada');
    }
    preencheListaFilme(paginaFilme.results);
}).catch(erro => {
    console.error(erro);
});

function preencheListaFilme(listaFilme) {
    listaFilmeEl.innerHTML = '';
    listaFilme.sort((f1, f2) => f1.episode_id > f2.episode_id ? 1 : -1)
    listaFilme.forEach(filme => {
        const li = document.createElement('li');
        insereFilme(filme, li);
        registraEventoClique(filme, li);
    });
}

function registraEventoClique(filme, li) {
    const romano = romano10(filme.episode_id).padEnd(4);
    li.addEventListener('click', () => {
        introducaoEl.innerHTML = `Episode ${romano}
            ${filme.title}
            
            ${filme.opening_crawl}`;
    });
}

function insereFilme(filme, li) {
    const romano = romano10(filme.episode_id).padEnd(4);
    li.innerHTML = `Episode ${romano} - ${filme.title}`;
    listaFilmeEl.appendChild(li);
}