import {app} from "~/app";
import {Environment} from "~/constants";

const {PORT} = Environment;

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));