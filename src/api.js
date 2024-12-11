const fetch = require("node-fetch");

const baseUrl =
  "http://apis.data.go.kr/B554287/DisabledPersonConvenientFacility";

const ServiceKey =
  "1l64t6Bdj%2FETCziwk1dAKNoPCXX%2BU77BE9UDSsFYQmEfO7%2Be79daO3HTK5T6dFPGIB9PNzP7%2BJlqq1j3YbcBiA%3D%3D";

export const wheelData = () => {
  fetch(`${baseUrl}?servicekey=${ServiceKey}`);
};
