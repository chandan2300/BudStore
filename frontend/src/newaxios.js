import axiosConfig from "./axiosConfig";

const getData = () => {
  const dat = await axiosConfig.get("product/620dee3bcba5a1229c8e9c87");
  console.log(dat);
};
getData();
