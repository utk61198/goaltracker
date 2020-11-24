import { Paper } from '@material-ui/core';
import React, { PureComponent } from 'react';
import Typist from 'react-typist';

import {
  PieChart, Pie, Sector, Cell,Tooltip,Legend
} from 'recharts';

const data = [
  { name: 'Finished Goals', value: 1 },
  { name: 'Unfinished goals', value: 2 },
  
];
const COLORS = ['red', 'green', 'blue', 'yellow'];


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
        <Paper elevation={10} style={{backgroundColor:"white",marginBottom:"5%"}}> 
            <PieChart width={300} height={300} onMouseEnter={this.onPieEnter}>
       {(this.props.fin>0 || this.props.unfin>0) &&  <Pie
          data={ [
            { name: 'Unfinished Goals', value:this.props.fin },
            { name: 'Finished goals', value:this.props.unfin },
            
          ]}
          cx={150}
          cy={150}
          innerRadius={55}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>}
        {(this.props.fin==0 && this.props.unfin==0) &&  <Pie
          data={ [
            { name: 'No Goals Added', value:1 },
            
            
          ]}
          cx={150}
          cy={150}
          innerRadius={55}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={"#adbce6"} />)
          }
        </Pie>}
        <Tooltip />
        <Legend/>

        
      </PieChart>
        </Paper>
    
    );
  }
}
