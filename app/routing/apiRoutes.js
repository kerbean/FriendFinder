var friendList = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendList);
    });

    app.post('/api/friends', function (req, res) {
        var scoresArray = [];
        var bestMatch = 0;
        var newFlirtGrade = req.body.ratings;

        for (var i = 0; i < friendList.length; i++) {
            var scoresDiff = 0;
            for (var j = 0; j < newFlirtGrade.length; j++) {
                scoresDiff += (Math.abs(parseInt(friendList[i].ratings[j]) - parseInt(newFlirtGrade[j])));
            }

            scoresArray.push(scoresDiff);
        }

        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        var bff = friendList[bestMatch];
        res.json(bff);

        friendList.push(req.body);
    });
};