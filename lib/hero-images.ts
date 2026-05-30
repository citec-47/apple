// Hero/banner images per category, used on category landing pages
// and the homepage. All from the Unsplash CDN — commercial-use licensed
// under the Unsplash License. Wide landscape crops (1600x720) so they
// work as full-width banners.

const U = "https://images.unsplash.com";
const W = "?w=1600&h=720&fit=crop&auto=format&q=80";

export const CATEGORY_HEROES: Record<string, string> = {
  phones: `${U}/photo-1556656793-08538906a9f8${W}`,
  laptops: `${U}/photo-1593642634315-48f5414c3ad9${W}`,
  tablets: `${U}/photo-1623126908029-58cb08a2b272${W}`,
  watches: `${U}/photo-1622434641406-a158123450f9${W}`,
  audio: `${U}/photo-1545127398-14699f92334b${W}`,
  home: `${U}/photo-1593784991095-a205069470b6${W}`,
  accessories: `${U}/photo-1531986362435-16b427eb9c26${W}`,
};

export const HOMEPAGE_HERO = `${U}/photo-1531297484001-80022131f5a1?w=2400&h=1200&fit=crop&auto=format&q=80`;
