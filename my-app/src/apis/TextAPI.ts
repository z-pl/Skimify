import axios from "axios";

const apiUrls = {
  summaryUrl: "http://127.0.0.1:5000/skimify/text/summary",
  dotpointExtendUrl: "http://127.0.0.1:5000/skimify/text/dotpoint",
  test: "http://127.0.0.1:5000/users"
}

const getSummary = async (inputText) => {
  const res = await axios.post(apiUrls.summaryUrl,{
    text: inputText
  });

  return res;
}

const getDotPoints = async (summaryText) => {
  const res = await axios.post(apiUrls.dotpointExtendUrl, {
    text: summaryText,
  });
  return res;
}

const getExtendedDotPoint = async (dotPointText) => {
  const res = await axios.get(apiUrls.summaryUrl)
  return res;
}

export { getSummary, getDotPoints }
