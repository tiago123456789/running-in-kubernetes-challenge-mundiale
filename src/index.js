import app from "./config/Server";

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log(`Server is running address: ${process.env.APP_URL}`); 
});