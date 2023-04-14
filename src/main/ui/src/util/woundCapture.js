const getHelloWorld = async () => {
  try {
    const response = await fetch("https://localhost:8080/api/wound");
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};
