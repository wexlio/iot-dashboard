import {
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  
  export default function MostrarDatos() {
    const [tasks, setTasks] = useState({
      title:"",
      description:""
    });
    
    
    const mostrarData = async () => {
      try {
        const res = await fetch(`https://iotserverdies.fly.dev/muestra`);
        const data = await res.json();
  
        setTasks(data);
        console.log(data)
      } catch (error) {
        console.log({message: "Servidor caido"})
        console.error("Ocurrio algo malo en el servidor");
      }
    };
    
    useEffect(() => {
      setInterval(() => {
        mostrarData()
        console.log("done")
      }, 5000);
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
                <Typography>Temp: {tasks.title !== ""? tasks.title : "Sin datos"}</Typography>
  
                <Typography>Message: {tasks.description !== ""? tasks.description : "Ocurrio algo en el servidor"}</Typography>

              </div>
  
            </CardContent>
          </Card>
        
      </>
    );
  }
  