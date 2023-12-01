function fibonacciGenerator(n) {
    let arr = [0];
    let i = 2;

    if (n == 0) {
      return "There's nothing to show!";
    } else if (n == 1) {
      return arr;
    } else if (n > 1) {
      arr.push(1);
      while (i < n) {
        arr.push(arr[i - 2] + arr[i - 1]);
        i++;
      }
      return arr;
    } else {
      return "Invalid input.";
    }
}


const myElement = document.getElementById("my-element");
myElement.innerHTML = fibonacciGenerator(20);