const { ObjectId } = require("mongodb");

function taskRoutes(app, mongo) {
    const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

    app.get("/tasks", function (req, res, next) {
        client.connect(err => {
            if (err) {
                console.log("blad w polaczeniu");
            } else {
                console.log("Polaczenie z baza ustanowione");

                const db = client.db("ToDoApp");

                const tasks = db.collection('Tasks');

                tasks.find({}).toArray((err, task) => {
                    if (err) {
                        console.log(err, "Blad podczas pobierania");
                    } else {
                        res.json(task);
                    }
                })
            }
        });
    });

    app.post("/add/:text/:date/:important", (req, res) => {
        const { text, date, important } = req.params;

        convertImportant = important === "true" ? true : false;

        const newTask = {
            text,
            date: date * 1,
            important: convertImportant,
            active: true,
            finishDate: 0,
        }

        client.connect(err => {
            if (err) {
                console.log("blad w polaczeniu");
            } else {
                const db = client.db("ToDoApp");

                const tasks = db.collection('Tasks');

                try {
                    tasks.insertOne(newTask);
                } catch (err) {
                    console.log(err);
                }
            }
        });

        res.json(newTask);
    });

    app.delete("/delete/:id", (req, res) => {
        const { id } = req.params;

        client.connect(err => {
            if (err) {
                console.log("blad w polaczeniu");
            } else {
                console.log("Polaczenie z baza ustanowione");

                const db = client.db("ToDoApp");

                const tasks = db.collection('Tasks');

                try {
                    tasks.deleteOne({ _id: ObjectId(id) })
                    res.json({ deleted: true });
                } catch (err) {
                    console.log(err);
                }
            }
        });
    });


}



module.exports = taskRoutes;