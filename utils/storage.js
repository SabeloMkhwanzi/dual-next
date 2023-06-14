import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
// const apiToken = process.env.REACT_APP_WEB3STORAGE_API_TOKEN;f

const toks =
  //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzRDdFRUI5NjQ3NWUwYjcxMjYxYTJhMjJGQWM1OTRGRTY2RjRkNzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU0MzYyOTkyNjMsIm5hbWUiOiJGaWwifQ.v-qakgvEQmXWVgsG_wY8Xta0EHgWWcGWTSg_7QelDdg";
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdDQWE2OGMxMmZCODY4RUE1ODM0OGQ2MjhkMUY4QkM0ZGRDQ0FmQkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODYzMTgzMzg5NjksIm5hbWUiOiJEdWFsLkdhbWVGaSJ9._8hmEWI_NyF3bzCs0HKnw08KYhbJAKhhih2lb5QpwzQ";
const client = new Web3Storage({ token: toks });

export const getJSONFromFileinCID = async (_cid) => {
  const res = await client.get(_cid);
  const filesArr = await res.files(); // Web3File[]
  let abc = filesArr[0].cid;
  const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
    dets.json()
  );
  return data;
};

export const getJSONFromCID = async (_cid) => {
  const json = await client.get(_cid);
  const filesArr = await json.files(); // Web3File[]
  let abc = filesArr[0].cid;
  console.log("abc", abc);
  const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
    dets.json()
  );
  return data;
};

export const putFileandGetHash = async (file) => {
  const content = new Blob([file], { type: "application/json" });
  const fileObj = new File([content], "file.json", {
    type: "application/json",
  });
  const res = await client.put([fileObj]);
  return res;
};

export const putJSONandGetHash = async (json) => {
  const content = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  const fileObj = new File([content], "file.json", {
    type: "application/json",
  });
  const res = await client.put([fileObj]);
  return res;
};

export const pushImgToStorage = async (file) => {
  const res = await client.put([file], { wrapWithDirectory: false });
  return res;
};
