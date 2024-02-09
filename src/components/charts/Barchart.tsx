import Plot from "react-plotly.js";
import { GraphPlot } from "../home/home.utils";

type props={data:GraphPlot[]}
const Barchart=(props:props)=>{
    return (
      <div style={{width:"100%",height:"20%", textAlign:"center"}}>
             <Plot
                data={props.data}
              layout={{ width: "100%", height: "100%", title: "Nutrition Dynamic Barchart", barmode:"group"}}
              />
      </div>
    );
  }
  
  export default Barchart;