import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navegacion } from '../Navegacion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';
export const VistaGraficas = () =>{

    const baseUrl="http://localhost/apiAplicacion/"
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [datosGrafica, setDatosGrafica] = useState({});
    const [datosCargados, setDatosCargados] = useState(false)
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        width: 400,
        height: 400,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      
      useEffect(() => {
        const fetchData = async () => {
          await axios.get(baseUrl+"?graficaLenguajes=true")
	    	.then(response=>{
		 	console.log(response.data)
             const data = {
                labels: response.data.map(v => v.lenguaje),
                datasets: [
                  {
                    label: 'Numero de usuarios',
                    data: response.data.map(v => v.nProgramadores),
                    backgroundColor: randomColor({ count: response.data.length }),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                  }
                ]
              };
              setDatosGrafica(data);
              setDatosCargados(true)
		})
        };
        fetchData();
      }, []);
      if(!datosCargados){
        return <><Navegacion /><div>Cargando...</div></>
      } else{
    return(
       <><Navegacion />
       <div className="container">
  <div className="row">
    <div className="col-lg-6 col-sm-12">
      <Pie data={datosGrafica} options={options} />
    </div>
  </div>
</div>

       </>
           
    )
      }
}