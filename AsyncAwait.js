// This is based off Colt Steele's Async Await video which can be watched here
// https://www.youtube.com/watch?v=krAYA4rvbdA

// What Is Async Await?
// The Async function declaration defines an asynchronus function, which retuns an AsyncFunction object
// An asynchronous function is a function which operates asynchronously via the event loop,
// using an implicit Promise to return the results. But the syntax and structure of your code using
// async functions is much more like using standard synchronous functions.

// Async Await Function

// resolveAfter2Seconds = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve("resolved");
//     }, 2000);
//   });
// };

// Here is the async call

// asyncCall = async () => {
//   console.log("calling");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
// };

// asyncCall();

// Async Overview
// 1. The async keyword is part of ES2017
// 2. You can declare any function in JavaScript as async
// 3. Async functions always return promises
// 4. Inside of an async fucntion, you can write code that looks synchronous, even if it isn't

// Showing How Async Keyword returns a promise
// This looks like it should return the console log
// Instead it will return a promise

// friendlyFn = async () => {
//   return `Hello! This is my message!`;
// };

// When we call FriendlyFn() by itself, it doesn't return our message but instead a promise

// friendlyFn();

// We can then encapsulate that promise in a variable and use that to console log the message

// friendlyFn().then(msg => console.log(msg));

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
// Ex. hi = () => {
// await "Hello";
// }

// Here is an example of using a proper async await function

// getStarWarsData = async () => {
//   console.log(`Getting Star Wars Data`);
//   let movieData = await $.getJSON("https://swapi.co/api/films/");
//   // These lines do NOT run until
//   //   the promise is resolved!
//   console.log("All Done!");
//   console.log(movieData);
// };

// getStarWarsData();

// Another Example

// let starWars = {
//   genre: "sci-fi",
//   async logMovieData() {
//     let url = "https://swapi.co/api/films/";
//     let movieData = await $.getJSON(url);
//     console.log("Finished Getting Movie Data!");
//     console.log(movieData.results);
//   }
// };

// starWars.logMovieData();

// Another Example using classes and constructors

// class Pokemon {
//   constructor(id) {
//     this.id = id;
//   }

//   async logName() {
//     let url = `https://pokeapi.co/api/v2/pokemon/${this.id}/`;
//     let response = await $.getJSON(url);
//     console.log(`Our Pokemon is ${response.name}!`);
//   }
// }

// Declare a new Pokemon with the ID 658
// let pokemon = new Pokemon(658);

// Log that pokemons name
// pokemon.logName();

// Another Example Using github API and how to handle promise rejection

// getUser = async user => {
//   try {
//     let url = `https://api.github.com/users/${user}`;
//     let response = await $.getJSON(url);
//     console.log(`${response.name}: ${response.bio}`);
//   } catch (e) {
//     console.log("User does not exist!");
//   }
// };

// getUser("TheNoodleMoose"); Will console log my profile
// getUser("rfioasfoa"); Will catch the error and console log that the user doesn't exist

// Why Using Callbacks Can Become a Mess

// Here we will create three api calls, in three different ways to show the differences

// First Using callbacks

let baseURL = "https://pokeapi.co/api/v2/pokemon";
// // As you can see, this works but is nested and not very pretty.

// $.getJSON(`${baseURL}/1/`, p1 => {
//   console.log(`The First Pokemon is ${p1.name}`);
//   $.getJSON(`${baseURL}/2/`, p2 => {
//     console.log(`The Second Pokemon is ${p2.name}`);
//     $.getJSON(`${baseURL}/3/`, p3 => {
//       console.log(`The Third Pokemon is ${p3.name}`);
//     });
//   });
// });

// Second Using .then()
// This is a little bit cleaner but still not as great as it could be

// $.getJSON(`${baseURL}/1/`)
//   .then(p1 => {
//     console.log(`The first pokemon is ${p1.name}`);
//     return $.getJSON(`${baseURL}/2/`);
//   })
//   .then(p2 => {
//     console.log(`The Second pokemon is ${p2.name}`);
//     return $.getJSON(`${baseURL}/3/`);
//   })
//   .then(p3 => {
//     console.log(`The Third pokemon is ${p3.name}`);
//     return $.getJSON(`${baseURL}/3/`);
//   });

//   Now finally the async await version
// As you can see, this is a way cleaner and concise version of what we are trying to do
// catchSomeOfEm = async () => {
//   let baseURL = "https://pokeapi.co/api/v2/pokemon";
//   let p1 = await $.getJSON(`${baseURL}/1/`);
//   let p2 = await $.getJSON(`${baseURL}/2/`);
//   let p3 = await $.getJSON(`${baseURL}/3/`);

//   console.log(`The First pokemon ios ${p1.name}`);
//   console.log(`The Second pokemon ios ${p2.name}`);
//   console.log(`The Third pokemon ios ${p3.name}`);
// };

// catchSomeOfEm();

// This is great because the request still fire sequentially
// They are make each request completely independent!

// But guess what, there is an even better way to do this!
// This version is great, but we are making three different request which can be slow

// Here is the better version

// This version allows the request to all be made in parallel at the the same time
// Instead of one after another, this can make a difference on larger apps
// catchSomeOfEmParallel = async () => {
//   let baseURL = "https://pokeapi.co/api/v2/pokemon";
//   let p1Promise = $.getJSON(`${baseURL}/1/`);
//   let p2Promise = $.getJSON(`${baseURL}/2/`);
//   let p3Promise = $.getJSON(`${baseURL}/3/`);

//   let p1 = await p1Promise;
//   let p2 = await p2Promise;
//   let p3 = await p3Promise;

//   console.log(`The First pokemon ios ${p1.name}`);
//   console.log(`The Second pokemon ios ${p2.name}`);
//   console.log(`The Third pokemon ios ${p3.name}`);
// };

// It's hard to tell the difference but I will show another example so you can see the difference
// catchSomeOfEmParallel();

// Here you will be able to visibilly be able to see the difference in timing

pause = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

doSomething = async () => {
  console.log("Starting");
  let p1 = await pause(1000);
  let p2 = await pause(1000);
  let p3 = await pause(1000);
  console.log(`All Done!`);
};

// When running this, it takes a total of 3 seconds for All Done to fire!
// This is because it has to await the first one to finish, and then the next, one and finally the third one before it can be All Done!

doSomething();

// Here is the better version to show the difference

doSomethingBetter = async () => {
  console.log("Better Version Starting");
  let promise1 = pause(1000);
  let promise2 = pause(1000);
  let promise3 = pause(1000);

  await promise1;
  await promise2;
  await promise3;
  console.log("All Done Faster!!");
};

// When running this you can see it only takes one second to finish
// This is because they all run sequentially instead of awaiting

doSomethingBetter();

// Overall, Async Await is a much simpler and cleaner way of returning promises in our code!
// Hope You enjoyed and be sure to give this repo a star if you liked it!
