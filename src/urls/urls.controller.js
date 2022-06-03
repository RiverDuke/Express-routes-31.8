const urlsData = require("../data/urls-data");
const usesData = require("../data/uses-data");

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urlsData.find((url) => url.id === urlId);
  if (foundUrl) {
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}

function hasHref(req, res, next) {
  const { data: { href } = {} } = req.body;

  if (href) {
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

const list = (req, res) => {
  res.json({ data: urlsData });
};

const create = (req, res) => {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urlsData.length + 1,
    href,
  };
  urlsData.push(newUrl);
  res.status(201).json({ data: newUrl });
};

const read = (req, res) => {
  const { urlId } = req.params;
  const foundUrl = urlsData.find((url) => url.id === Number(urlId));
  const used = {
    id: usesData.length + 1,
    urlId: Number(urlId),
    time: Date.now(),
  };
  usesData.push(used);
  res.json({ data: foundUrl });
};

const update = (req, res) => {
  const urlId = Number(req.params.urlId);
  const foundUrl = urlsData.find((url) => url.id === urlId);

  const { data: { href } = {} } = req.body;

  foundUrl.href = href;

  res.json({ data: foundUrl });
};

module.exports = {
  list,
  create: [hasHref, create],
  read: [urlExists, read],
  update: [urlExists, update],
  urlExists,
};
