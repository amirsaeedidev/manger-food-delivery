/**
 * menuService — menu API (items, categories, offers).
 *
 * The functions are asynchronous like real HTTP calls, so the pages do not change when the
 * backend arrives. For now they read the mock data in ./mock/menu.mock.js.
 *
 * TODO: replace the bodies with requests that use the shared Axios instance, e.g.
 *   import api from './api';
 *   listItems: (params) => api.get('/menu/items', { params }).then((res) => res.data.data)
 */
import { normalizeFa } from '../utils/helpers';

import { categories, foods, offers } from './mock/menu.mock';

const menuService = {
  async listCategories() {
    return categories;
  },

  // filters: { category, query, weekly }
  async listItems({ category, query, weekly } = {}) {
    const needle = normalizeFa(query || '');

    return foods.filter(
      (food) =>
        (!category || food.category === category) &&
        (!weekly || food.weekly) &&
        (!needle || normalizeFa(food.name).includes(needle))
    );
  },

  async getItem(id) {
    return foods.find((food) => food.id === id) || null;
  },

  // Several foods at once (cart), in the order of `ids`; unknown ids are skipped.
  async getItems(ids) {
    return ids.map((id) => foods.find((food) => food.id === id)).filter(Boolean);
  },

  async listOffers() {
    return offers;
  },
};

export default menuService;
