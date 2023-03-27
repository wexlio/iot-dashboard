import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function MostrarDatos() {

  const urlFly = "https://iotcontrollerv3.fly.dev"
    //const urlLocal = "http://localhost:8080"

  const [ledState, setLedState] = useState(false);

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      //GET DE LED
      const response = await fetch(`${urlFly}/led`);
      const data = await response.json();
      setLedState(data.led);
      console.log("--------Get de led-----------");
      console.log(data);
      console.log(ledState);
      console.log("Hello");
      // .then(response => response.json())
      // .then(data => {
      //   setLedState(data.led);
      //   console.log(data)
      // })
      // .catch(error => console.error(error));

      // get de datos boton esp32
      const response2 = await fetch(`${urlFly}/api`);
      const data2 = await response2.json();
      setTasks({
        title: data2.title,
        description: data2.description,
      });
      console.log("--------Get de datos-----------");
      console.log(data2);
      console.log(tasks);
      console.log("Hello2");
    }, 4500);

    return () => {
      clearInterval(intervalId);
    };
  });

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     // //GET DE LED
  //     // const response = await fetch("http://localhost:8080/led");
  //     // const data = await response.json();
  //     // setLedState(data.led);
  //     // console.log("--------Get de led-----------");
  //     // console.log(data);
  //     // console.log(ledState);
  //     // console.log("Hello");
  //     // // .then(response => response.json())
  //     // // .then(data => {
  //     // //   setLedState(data.led);
  //     // //   console.log(data)
  //     // // })
  //     // // .catch(error => console.error(error));

  //     // get de datos boton esp32
  //     const response2 = await fetch("http://localhost:8080/api");
  //     const data2 = await response2.json();
  //     setTasks({
  //       title: data2.title,
  //       description: data2.description,
  //     });
  //     console.log("--------Get de datos-----------");
  //     console.log(data2);
  //     console.log(tasks);
  //     console.log("Hello2");
  //   }, 3000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const handleSubmitLed = async (e) => {
    e.preventDefault();
    const newLedState = !ledState;

    try {
      const response = await fetch(`${urlFly}/led`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ led: newLedState }),
      });
      const data = await response.json();
      // .then(response => response.json())
      // .then(data => {
      //   console.log(data);
      // })
      // .catch(error => console.error(error));
      console.log(data);
      setLedState(newLedState);
    } catch (error) {
      console.error("El error pendejo es: ", error);
    }
  };

  return (
    <>
      <h2>Temperature Control with esp32</h2>

      <Card
        style={{
          marginBottom: ".7rem",
          background: "#1e272e",
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
              color: "#ddd",
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
            <form onSubmit={handleSubmitLed}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  textAlign: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                
                <Button type="submit"  color="primary">
                <img
                  // type="submit"
                  alt="ImagenFoco"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    paddingLeft: "5px",
                  }}
                  src={
                    ledState
                      ? "https://m.media-amazon.com/images/I/71vyKbDPH0L.png"
                      : "https://m.media-amazon.com/images/I/71vyKbDPH0L.png"
                  }
                />                
                </Button>
                <img
                  // type="submit"
                  alt="ImagenFoco"
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                    paddingLeft: "5px",
                    marginLeft: "44%"
                  }}
                  src="https://cliply.co/wp-content/uploads/2021/07/392107080_HAND_CLICKING_400px.gif"
                />
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}