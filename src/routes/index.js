const { Router } = require("express");
const leadsRoute = require("./leads.routes")

const router = Router();

const defaultRoutes = [
  {
    path: '/leads',
    route: leadsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;