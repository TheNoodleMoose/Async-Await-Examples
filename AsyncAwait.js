// What Is Async Await?
// The Async function declaration defines an asynchronus function, which retuns an AsyncFunction
// An asynchronous function is a function which operates asynchronously via the event loop,
// using an implicit Promise to return the results. But the syntax and structure of your code using
// async functions is much more like using standard synchronous functions.

// Regular Asynchronous functions with a call back
resolveAfter2Seconds = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
};

// Async Await Function
asyncCall = async () => {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
};

asyncCall();

// Async Overview
// 1. The async keyword is part of ES2017
// 2. You can declare any function in JavaScript as async
// 3. Async functions always return promises
// 4. Inside of an async fucntion, you can write code that looks synchronous, even if it isn't

// Showing How Async Keyword returns a promise
// This looks like it should return the console log
// Instead it will return a promise
friendlyFn = async () => {
  return `Hello! This is my message!`;
};

// When we call FriendlyFn() by itself, it doesn't return our message but instead a promise
friendlyFn();

// We can then encapsulate that promise in a variable and use that to console log the message
friendlyFn().then(msg => console.log(msg));

// What About Rejections?

// Inside of async functions, the return value is wrapped in a resolved promise
// If you want to reject instead of resolve, simply throw an error inside of the async function

// oops = async () => {
//   throw `You shouldn't have invoked me!`;
// };

// When we run this, we can actually catch the message inside of a promise using .catch
// oops();

// oops().catch(err => console.log(err));

// The Await Overview

// Inside of an async function, we can use the await keyword
// Await pauses the execution of the async function
// Can await any async operation returning a promise(Ex. other async function!)
// The await keyword waits for promise to resolve & Extracts its resolved value
// It then resumes the async function's execution
// Think of the await keyword like a pause button

// You Cannot Use Await in a non-async function
// Ex. hi = async () => {
// await "Hello";
// }

// Here is an example of using a proper async await function

getStarWarsData = async () => {
  console.log(`Getting Star Wars Data`);
  let movieData = await $.getJSON("https://swapi.co/api/films/");
  // These lines do NOT run until
  //   the promise is resolved!
  console.log("All Done!");
  console.log(movieData);
};

getStarWarsData();

// Another Example

let starWars = {
  genre: "sci-fi",
  async logMovieData() {
    let url = "https://swapi.co/api/films/";
    let movieData = await $.getJSON(url);
    console.log("Finished Getting Movie Data!");
    console.log(movieData.results);
  }
};

starWars.logMovieData();

// Another Example

class Pokemon {
  constructor(id) {
    this.id = id;
  }

  async logName() {
    let url = `https://pokeapi.co/api/v2/pokemon/${this.id}/`;
    let response = await $.getJSON(url);
    console.log(`Our Pokemon is ${response.name}!`);
  }
}

// Declare a new Pokemon with the ID 658
let pokemon = new Pokemon(658);

// Log that pokemons name
pokemon.logName();
