const FKEY = "d6q52fhr01qhcrmitc80d6q52fhr01qhcrmitc8g";
const FH   = "https://finnhub.io/api/v1";

exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const path   = event.queryStringParameters.path || "/quote";
  const params = Object.assign({}, event.queryStringParameters);
  delete params.path;

  // Build Finnhub URL
  const qs = Object.keys(params).map(k => k + "=" + encodeURIComponent(params[k])).join("&");
  const url = FH + path + "?" + qs + "&token=" + FKEY;

  try {
    const res  = await fetch(url);
    const data = await res.text();
    return { statusCode: res.status, headers, body: data };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
