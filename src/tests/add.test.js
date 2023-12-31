const add = (a, b) => a + b;
const generateGreeting = (name = "Anonymous") => `Hello ${name}`;

test("should add two numbers", () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

test("should generate greeting from name", () => {
  const greeting = generateGreeting("Shana");
  expect(greeting).toBe("Hello Shana");
});

test("should generate greeting for no name", () => {
  const greeting = generateGreeting();
  expect(greeting).toBe("Hello Anonymous");
});
