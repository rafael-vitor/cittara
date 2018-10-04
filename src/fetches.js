const handleHttpStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  throw res;
};

const createErrorHandler = defaultValue => res => {
  console.error('request failed', res);
  return defaultValue;
};

export const getPredictions = (locationId) => {
  return fetch(`https://api.cittamobi.com.br/m3p/js/prediction/stop/${locationId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }).then(handleHttpStatus).catch(createErrorHandler({}));
}
