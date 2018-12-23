import keyBy from 'lodash.keyby';
import sum from 'lodash.sum';
import uniq from 'lodash.uniq';

const BASE_URL = 'https://dome.now.sh/api';

function callApi(path) {
  return fetch(`${BASE_URL}${path}`).then((res) => res.json());
}

let HouseCollection = null;
let ReviewCollection = null;
let HouseDetailCollection = {};
let OwnerCollection = {};

async function getHouseListByKeyword(keyword) {
  const houseList = await getHouseList();

  const filteredHouses = houseList.filter((h) =>
    h.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  const uniqueOwners = uniq(filteredHouses.map((h) => h.ownerId));

  const work = [];
  work.push(getOwnerDetailBatch(uniqueOwners));
  work.push(getReviewCollection());

  await Promise.all(work);

  return filteredHouses.map((h) => {
    return {
      ...h,
      rating: average(h.reviews.map((r) => ReviewCollection[r].star)),
      address: OwnerCollection[h.ownerId].address,
    };
  });
}

async function getHouseList() {
  return Object.values(await getHouseCollection());
}

async function getHouseCollection() {
  if (HouseCollection === null) {
    HouseCollection = keyBy(await callApi('/houses'), 'id');
  }
  return HouseCollection;
}

async function getReviewList() {
  return Object.values(await getReviewCollection());
}

async function getReviewCollection() {
  if (ReviewCollection === null) {
    ReviewCollection = keyBy(await callApi('/reviews'), 'id');
  }
  return ReviewCollection;
}

async function getHouseDetail(id) {
  if (!HouseDetailCollection[id]) {
    HouseDetailCollection[id] = await callApi(`/houses/${id}`);
  }
  return HouseDetailCollection[id];
}

async function getOwnerDetail(id) {
  if (!OwnerCollection[id]) {
    OwnerCollection[id] = await callApi(`/users/${id}`);
  }
  return OwnerCollection[id];
}

async function getOwnerDetailBatch(ids) {
  return Promise.all(ids.map(getOwnerDetail));
}

function average(coll) {
  return sum(coll) / coll.length;
}

export { getHouseListByKeyword, getReviewList, getHouseDetail };
