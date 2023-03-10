import { Card, CardContent, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function MostrarDatos() {
  
  const [led, setLed] = useState(false)
  
  const [tasks, setTasks] = useState({
    title: "",
    description: ""
  });

  const [tasksy, setTasksy] = useState({
    led: !led
  });

  const handleLed = async (e) => {
    e.preventDefault();
    console.log(led, 999)
    setLed(!led)
    setTasksy({
      led: led
    })
    try {
      const response = await fetch("https://iotserverdies.fly.dev/led", {
        method: "POST",
        body: JSON.stringify(tasksy),
        headers: { "Content-type": "application/json" },
      });
  
      const data = await response.json();
      console.log(JSON.stringify(tasksy), 8888888);
      console.log(data);
      console.log(led, 66666);
    } catch (error) {
      console.error("el error es algo muy pendejo: ", error)
    }

  }

  const mostrarData = async () => {
    try {
      const res = await fetch(`https://iotserverdies.fly.dev/muestra`);
      const data = await res.json();
      
      setTasks(data);
      console.log(data);
      console.log(led,77777)
    } catch (error) {
      console.log({ message: "Servidor caido" });
      console.error("Ocurrio algo malo en el servidor");
    }
  };

  useEffect(() => {
    // mostrarData();
    setInterval(() => {
      mostrarData();
      console.log("done");
    }, 2000);
    // return () => {
    //   clearInterval(muestras)
    // }
  }, []);

  return (
    <>
      <h2>Temperature Control with esp32</h2>

      <Card
        style={{
          marginBottom: ".7rem",
          background: "#2E86C1",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#fff",
            }}
          >
            <Typography>
              Temp: {tasks.title !== "" ? tasks.title : "Sin datos"}
            </Typography>

            <Typography>
              Message:{" "}
              {tasks.description !== ""
                ? tasks.description
                : "Ocurrio algo en el servidor"}
            </Typography>
          </div>

          <div>
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={handleLed} color="warning" />}
                label="Apagado/Prendido"
                style={{color: "white"}}
                type="submit"
              />
            </FormGroup>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
