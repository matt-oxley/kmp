// creates an 'auxiliary array' telling you the largest word index we can return to for a mismatch at position i

function createCache(word) {
  const cache = Array(word.length).fill(0);
  var i = 1;
  var m = 0;

  while (i < word.length) {
    if (word[i] === word[m]) {
      // assign cache with m, increment m and i
      cache[i] = ++m;
      i++;
    }
    if (word[i] !== word[m]) {
      if (m === 0) {
        // assign cache with 0, increment i
        cache[i] = 0;
        i++;
      } else {
        // try with cache[m-1]
        m = cache[m - 1];
      }
    }
  }
  return cache;
}

export default function kmp(text, word) {
  let textIndex = 0;
  let wordIndex = 0;

  const cache = createCache(word);

  while (textIndex <= text.length) {
    if (word[wordIndex] === text[textIndex]) {
      textIndex++;
      wordIndex++;
      if (wordIndex === word.length) {
        console.log("found an instance at: ", textIndex - wordIndex);
        return true;
      }
    } else {
      if (wordIndex === 0) {
        textIndex++;
      } else {
        wordIndex = cache[wordIndex - 1];
      }
    }
  }
  return false;
}
