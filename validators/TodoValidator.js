module.exports = {
    isValid: function (req, res) {
        if (!req.body.text) {
            res.status(400).json({message: 'Empty text.'});
            return false;
        }

        return true;
    },
    exists: function (req, res, result) {
        if (!result || (result.result && result.result.n !== 1)) {
            res.status(404).json({message: 'Requested todo item not found.'});
            return false;
        }

        return true;
    }
};