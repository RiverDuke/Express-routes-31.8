const usesData = require("../data/uses-data");

function useIdExists(req, res, next) {
  const useId = Number(req.params.useId);
  const foundUseId = usesData.find((use) => use.id === useId);
  if (foundUseId) {
    return next();
  }
  next({
    status: 404,
    message: `Use id not found: ${req.params.useId}`,
  });
}

const read = (req, res) => {
  const { urlId } = req.params;
  if (urlId) {
    const log = usesData.reduce((acc, use) => {
      if (use.urlId === Number(urlId)) {
        acc.push(use);
      }
      return acc;
    }, []);
    res.json({ data: log });
  } else {
    res.json({ data: usesData });
  }
};

const event = (req, res) => {
  const { urlId, useId } = req.params;
  const foundEvent = usesData.reduce((acc, use) => {
    if (urlId) {
      if (use.id === Number(useId) && use.urlId === Number(urlId)) {
        acc = use;
      }
      return acc;
    } else {
      if (use.id === Number(useId)) {
        acc = use;
      }
      return acc;
    }
  }, {});
  res.json({ data: foundEvent });
};

const destroy = (req, res) => {
  const { useId } = req.params;
  const index = usesData.findIndex((note) => note.id === Number(useId));
  if (index > -1) {
    usesData.splice(index, 1);
  }
  res.sendStatus(204);
};

module.exports = {
  read,
  event: [useIdExists, event],
  destroy: [useIdExists, destroy],
};
