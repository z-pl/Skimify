import axios from "axios";

const apiUrls = {
  summaryUrl: "https://api.skimify.ai/skimify/text/summary",
  dotpointExtendUrl: "https://api.skimify.ai/skimify/text/dotpoint",
  test: "https://api.skimify.ai/users"
}

const getSummary = async (inputText) => {
  const res = await axios.post(apiUrls.summaryUrl, {
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
