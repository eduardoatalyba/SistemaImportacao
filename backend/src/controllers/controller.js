class Controller{
    async validate(req, res) {
        res.send("okay")
    }
}
module.exports = new Controller();