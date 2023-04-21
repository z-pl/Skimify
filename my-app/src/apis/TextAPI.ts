import axios from "axios";

const url = "https://dummyjson.com/products";

const getSummary = async (inputText) => {
  const res = await axios.get(url);

  console.log(res);

  return res.data;
}

const getDotPoints = async (summaryText) => {
  const res = await axios.get(url)

  console.log(res);
}

const getExtendedDotPoint = async (dotPointText) => {
  const res = await axios.get(url)

  console.log(res);
}

export { getSummary }
