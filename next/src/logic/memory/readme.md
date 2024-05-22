# 记忆算法调用解释

1. 第一次背诵

```js
const memoryHistory = [
  [3, 2, 1]
];
const prevIntervalDays = [];
```

2. 调用getNextIntervalFromData，获得nextInterval=1

```js
const memoryHistory = [
  [3, 2, 1],
];
const prevIntervalDays = [1];
```

3. 过了`nextInterval[-1]`即1天以后，第二次背诵

```js
const memoryHistory = [
  [3, 2, 1],
  [4, 1, 2],
];
const prevIntervalDays = [1];
```

4. 调用getNextIntervalFromData，获得nextInterval=2

```js
const memoryHistory = [
  [3, 2, 1],
  [4, 1, 2],
];
const prevIntervalDays = [1, 2];
```

5. 过了`nextInterval[-1]`即2天以后，第二次背诵

```js
const memoryHistory = [
  [3, 2, 1],
  [4, 1, 2],
  [3, 1, 0]
];
const prevIntervalDays = [1, 2];
```