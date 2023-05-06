const urlHelper = {
  t: (url: string, isUseMockData?: boolean) => {
    // const isUseMockData = false;
    isUseMockData = isUseMockData ? isUseMockData : false;
    const apiServerUrl = process.env.REACT_APP_API_SERVER_URL || window.location.origin;
    const localDev =
      window.location.href.indexOf('//localhost') > -1 ||
      window.location.href.indexOf('//192') > -1 ||
      window.location.href.indexOf('//172') > -1 ||
      window.location.href.indexOf('//10') > -1 ||
      window.location.href.indexOf('//0') > -1;

    console.log('localDev', localDev);
    console.log('apiServerUrl', apiServerUrl);

    if (localDev) {
      return isUseMockData
        ? '../mock_data/' + url.split('?')[0].split('/').join('_') + '.json'
        : apiServerUrl + '/' + url;
    } else {
      return apiServerUrl + '/' + url;
    }
  },
};

export default urlHelper;
