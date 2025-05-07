<h1 align="center"> Full Stack Movie App 🎬 | FRONTEND </h1> <br>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="50" height="50"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" width="50" height="50"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="50" height="50"/>
</p>

<h2 align="center">
 ⚠️ <strong>Important:</strong> This is a Frontend for a Full Stack project. To install and run this project properly, please check <a href="https://github.com/Egemendokkodo/movie_app_backend_spring_postgresql">this project's backend repository</a> first.
  <br></br></h2>
</h2>





<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
- [Important Note](#important-note) 
- [Features](#features)
- [Screenshots](#screenshots)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction 


This project is  a Frontend of a fullstack project. 

<p>
  This project is a <strong>React-based UI clone</strong> for a movie streaming website. It was built solely for <strong>educational and personal learning purposes</strong>, with no intention of distributing or linking to copyrighted content.
</p>

<p>
  Through this project, I aimed to:
</p>

<ul>
  <li>Improve my skills in React, HTML, CSS and JavaScript.</li>
  <li>Understand the structure and layout of media-focused platforms</li>
  <li>Create a reusable UI template for future frontend projects</li>
</ul>

<p>
  This clone focuses purely on the <strong>frontend experience</strong>, simulating the look and feel of a real movie streaming site — without streaming functionality.
</p>

<blockquote>
  ⚠️ <strong>Disclaimer:</strong> This is a UI-only project. It does not host, stream, or promote any pirated or copyrighted content.
</blockquote>

## Important Note
In one part of my code, I used the TMDB API. I will share it with you directly without changing the API key, but in case the API key becomes invalid later, I will explain here how you can get your own TMDB API key so that you don't encounter errors in my code.
<h2>📌 Get Your Own TMDB API Key</h2>

<p>
  To display IMDb ratings in the Movie Details page, this project uses 
  <strong>The Movie Database (TMDB)</strong> API. You need to obtain your own API key for it to work.
</p>

<p><strong>🛠️ File to modify:</strong><br>
<code>src/pages/MovieDetails/MovieDetails.js</code></p>

<p><strong>🔍 Search for the function:</strong></p>
<pre><code>const fetchImdbRating = async (movieName) => {</code></pre>

<p>Replace the existing <code>Authorization</code> header token with your own TMDB Bearer Token by following the steps below:</p>

<h3>🔑 How to Get Your TMDB API Key</h3>
<ol>
  <li>Go to the <a href="https://developer.themoviedb.org/docs/authentication" target="_blank">TMDB Developer Site</a>.</li>
  <li>Log in or create a free account.</li>
  <li>Click your profile picture → <strong>Settings</strong> → <strong>API</strong>.</li>
  <li>Scroll to <strong>API Key (v4 auth)</strong> and generate a Bearer Token.</li>
  <li>Copy the Bearer Token.</li>
</ol>

<p><strong>✍️ Example usage in your code:</strong></p>
<pre>
<code>
headers: {
  accept: 'application/json',
  Authorization: 'Bearer YOUR_API_KEY_HERE'
}
</code>
</pre>

<blockquote>
  ⚠️ <strong>Important:</strong> Never share your API key publicly or commit it to version control (like GitHub). 
  Use environment variables or secrets when deploying to production.
</blockquote>

## Features

* Reusable template
* Satisfying and Modern UI
* A collection of very nice UX features like hover inspection on movie, featured movies, sliders etc..
* Detailed movie search. With this option, you can cherry-pick the movie you desire.
* <strong>Admin Dashboard!</strong>

## Screenshots
![8](https://github.com/user-attachments/assets/c01e14df-0e29-4a76-9005-41e6ab679bee)
![1](https://github.com/user-attachments/assets/569c4d61-6570-400d-a84b-352a40fc3664)
![2](https://github.com/user-attachments/assets/7a2a948a-ba6f-4222-b967-a6e675059627)
![3](https://github.com/user-attachments/assets/5533980d-3a91-4599-9723-3c944bb1fb4b)
![4](https://github.com/user-attachments/assets/539cf4dc-664f-4777-a8b3-b62d8cd65410)
![5](https://github.com/user-attachments/assets/ad96919a-9514-439b-8f37-06f2f251ae38)
![6](https://github.com/user-attachments/assets/6c4f9084-18e5-481c-9bcb-32502c6f73bf)
![7](https://github.com/user-attachments/assets/3a6433af-26ec-498e-a7cc-c266bea93506)

