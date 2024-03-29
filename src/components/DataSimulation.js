import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DataSimulation() {

    //urlLed = "https://iotserverdies.fly.dev/led"
    //urlLed = "http://localhost:8080/led"

    //urlMuestra = "https://iotserverdies.fly.dev/api"
    const urlApi = "http://localhost:8080/api"

    const [led, setLed] = useState(false)

  const [task, setTask] = useState({
    title: "",
    description: "",
    led: led
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setLed(!led)
    const response = await fetch(urlApi, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    });

    const data = await response.json();
    console.log(data);

    setLoading(false);

    navigate("/esp32");
  };

  const handleChange = (e) => {
    setLed(!led)
    setTask({ ...task, [e.target.name]: e.target.value, led: !led });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            background: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Create task
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                value={task.title}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "#777" } }}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                value={task.description}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "#777" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
