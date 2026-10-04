---
layout: $layouts/Blog.astro
title: Dynamically typed React components
createdAt: 2022-02-18
updatedAt: 2022-02-18
published: true
tags: ["react", "coding", "typescript"]
---

<a class="video-link" href="https://www.youtube.com/watch?v=Dw3qYGAcpZA">Dynamically typed React components</a>

Did you know that you can dynamically type React components, and it works in JSX?

Let's say you have an input component, and you want to pass it either a number or a string and get back the result in the `onChange` callback:

```tsx
export interface InputProps {
  value: string | number;
  onChange: (value: string | number) => void;
}
```

This works, but you have to do some dynamic type checking, because TypeScript doesn't know what will come out of the component: either a string or a number. Using a `setState` like this will not work:

```tsx
const [value, setValue] = useState(0);

return <Input value={value} onChange={setValue} />;
```

```
Type 'Dispatch<SetStateAction<number>>' is not assignable to type '(value: string | number) => void'.
  Type 'string | number' is not assignable to type 'SetStateAction<number>'.
```

## Making the props generic

To fix this, we can make the component props generic with just some minimal changes.

First, add a type parameter to the input props and make it extend all possible types the value can have. Next, specify that the `value` prop will have this generic type, and the `onChange` callback will return type `T`:

```tsx
export interface InputProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
}
```

Now, repeat this for the component itself. It looks like this for functional components:

```tsx
export default function Input<T extends string | number>({
  value,
  onChange,
}: InputProps<T>) {
  // ...
}
```

## A little bit of runtime magic

Now, we have to do just a little bit of runtime magic for this specific example, because we want to return the right value of the input event. But again, this is only for this specific `Input` example:

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const returnValue =
    typeof value === "number" ? e.target.valueAsNumber : e.target.value;

  onChange(returnValue as T);
};
```

The value inside the component is now of type `T`, and the value passed into the component will always have the same type as the one coming out.

If we now look at the same code in the App, it suddenly works. The value of the `onChange` callback is now always a known type, in this example, a `number`:

```tsx
const [value, setValue] = useState(0);

// T is inferred as `number`, so `setValue` fits.
return <Input value={value} onChange={setValue} />;
```

## Bonus: forwardRef

As a small bonus, this also works if you want to use React's `forwardRef`. `forwardRef` drops the generic, but a type assertion brings it back:

```tsx
const Input = forwardRef(InputInner) as <T extends string | number>(
  props: InputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof InputInner>;
```

I hope you enjoyed this and it helped you a bit. Have a great day!
