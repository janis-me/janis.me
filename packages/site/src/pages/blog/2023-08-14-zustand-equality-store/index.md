---
layout: $layouts/Blog.astro
title: Making Zustand even better - shallow equality by default
createdAt: 2023-08-14
updatedAt: 2023-08-14
published: true
tags: ["react", "coding", "typescript", "zustand"]
---

<a class="video-link" href="https://www.youtube.com/watch?v=DKkQWuPlwMo">Making Zustand even better</a>

Zustand is one of the best state management solutions for React, but it can be even better if you know how to use it. So, listen up.

> Heads up: this was written for Zustand 4. APIs around equality functions have moved since, so check the docs for your version.

## The setup

I created a new React app that uses Zustand for state management, and I created an animal state which has both bears and owls, and two increase functions that increment the population of both of them:

```tsx
interface AnimalState {
  bears: number;
  owls: number;
  increaseBears: () => void;
  increaseOwls: () => void;
}

const useAnimalState = create<AnimalState>()((set) => ({
  bears: 0,
  owls: 0,
  increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
  increaseOwls: () => set((state) => ({ owls: state.owls + 1 })),
}));
```

Then I created a `Bears` and an `Owls` component to render a label and the number of bears and owls, and also to render a button to increment the population:

```tsx
function Bears() {
  const [bears, increaseBears] = useAnimalState((s) => [s.bears, s.increaseBears]);

  return (
    <div>
      <p>Bears: {bears}</p>
      <button onClick={increaseBears}>Increment</button>
    </div>
  );
}
```

`Owls` looks the same, just with owls. I used both of them in the app component:

```tsx
function App() {
  return (
    <div className="App">
      <Bears />
      <Owls />
    </div>
  );
}
```

The reason I did this is that you don't want the `Bears` component to update when the owls change, and the other way around. This is a very common pattern in React. You only want to re-render the things that actually change.

## Everything re-renders

Open the React DevTools and check "Highlight updates when components render". Now click the owls button, and wow, the `Bears` component unexpectedly updates as well. And this is also true the other way around.

Why is that? The code is clearly separated. The only thing that's shared is that we use the same `useAnimalState` hook in both components. And here lies the issue: the selector returns a new array on every call, so Zustand thinks the selected value changed, even though only one of these values was updated. Both components re-render.

## Equality functions

The most logical solution would be to separate both of them into their own individual store, but this might not always be possible. There might be a very good reason for both of them to be interconnected, and some functions might need to consume both.

But there's another way. Every Zustand selector function, so for example our `useAnimalState` hook, accepts a second argument, which is a comparison function. You can write your own, but most of the time the `shallow` function provided by Zustand should work just fine:

```tsx {1,6}
import { shallow } from 'zustand/shallow';

function Bears() {
  const [bears, increaseBears] = useAnimalState(
    (s) => [s.bears, s.increaseBears],
    shallow,
  );
  // ...
}
```

If we now click on the buttons again, only the stuff that's actually required to change, changes. And this is a massive improvement if you have big stores and heavy components.

I should note that there is discussion to deprecate this feature, and you may have to use `createWithEqualityFn` from `zustand/traditional` instead.

## A store function with defaults

In any case, imagine you want to do this for all of your stores in the entire app. Believe me, I've been through the pain. I went through hundreds of files and added this equality function. It sucks, but there's a better way.

We can create our own store creation function that extends the default `create` with all the middleware and equality functions we want to use by default. I, for example, often use the `subscribeWithSelector` middleware and also use `immer` all the time.

The function receives the config we would normally pass to `create`, typed as a `StateCreator`. That's generic, so our function is generic as well:

```tsx
export function store<T>(config: StateCreator<T>) {
  return createWithEqualityFn<T>()(subscribeWithSelector(immer(config)), shallow);
}
```

This unfortunately shows an error, because the typing Zustand uses internally is a bit more complex, and we need to tell the `StateCreator` which middlewares the store uses. No need to go into the nasty typing internals: pass the middlewares as the second type argument:

```tsx
type MiddlewareStoreCreator<T> = StateCreator<
  T,
  [['zustand/subscribeWithSelector', never], ['zustand/immer', never]],
  [],
  T
>;

export function store<T>(config: MiddlewareStoreCreator<T>) {
  return createWithEqualityFn<T>()(subscribeWithSelector(immer(config)), shallow);
}
```

Now just replace the `create` call with `store`:

```tsx
const useAnimalState = store<AnimalState>((set) => ({
  // ...
}));
```

And everything updates correctly, without passing `shallow` anywhere.

And now I have to admit something, because yes, I did trick you into using immer. What it does and why it's beneficial in combination with Zustand is a topic for another post.
