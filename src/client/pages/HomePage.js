import React from "react";

const Home = () => (
    <div>
      <div>I'm a stateless Home Component</div>
      <button onClick={() => console.log("Hi there!")}>Click me!</button>
    </div>
);

export default {
  component: Home
};
