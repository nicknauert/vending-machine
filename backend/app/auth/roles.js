const ConnectRoles = require('connect-roles')

const user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    const accept = req.headers.accept || ''
    res
      .status(403)
      .send("Access Denied - You don't have permission to: " + action)
  }
})

user.use('access customer resources', function (req, res) {
  if (
    req.user.roles.indexOf('customer') > -1 ||
      req.user.roles.indexOf('vendor') > -1
  ) {
    return true
  }
})

user.use('access vendor resources', function (req, res) {
  if (req.user.roles.indexOf('vendor') > -1) {
    return true
  }
})

module.exports = user
